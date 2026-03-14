import React, { useEffect, useState } from "react";
import { Table, InputNumber, Button, Input, message } from "antd";
import API from "../../api/api";
import { useLocation } from "react-router-dom";

function Formula() {

  const location = useLocation();
  const [chemicals, setChemicals] = useState([]);
  const [formulaName, setFormulaName] = useState("");
  const [formulaText, setFormulaText] = useState("");

  // ✅ Load only selected chemicals
useEffect(() => {
  if (!location.state?.formula) return;

  const text = location.state.formula;
  setFormulaText(text);

  const lines = text.split("\n");

  const parsed = lines
    .map((line) => {
      const match = line.match(/(.+)-\s*(\d+)%/);

      if (match) {
        return {
          _id: `temp-${match[1].trim()}`, // allow chemicals not in inventory
          name: match[1].trim(),
          percent: Number(match[2]),
        };
      }

      return null;
    })
    .filter(Boolean);

  setChemicals(parsed);
}, [location.state]);

useEffect(() => {
  const stored =
    JSON.parse(localStorage.getItem("selectedChemicals")) || [];

  if (stored.length > 0) {
    setChemicals(stored);
  }
}, []);
  

const autoBalanceTo100 = () => {
  const total = chemicals.reduce(
    (sum, c) => sum + (c.percent || 0),
    0
  );

  if (total >= 100) {
    message.warning("Total already 100% or more");
    return;
  }

  const remaining = 100 - total;

  const adjustable = chemicals.filter(c => c.percent === 0);

  if (adjustable.length === 0) {
    message.error("No chemicals available to balance");
    return;
  }

  const share = Math.floor((remaining / adjustable.length) * 100) / 100;

  let used = 0;

  const updated = chemicals.map(c => {
    if (c.percent === 0) {

      if (used + share >= remaining) {
        const final = Number((remaining - used).toFixed(2));
        used += final;
        return { ...c, percent: final };
      }

      used += share;
      return { ...c, percent: share };
    }

    return c;
  });

  setChemicals(updated);
};


  const handlePercentChange = (value, id) => {
    const updated = chemicals.map((item) =>
      item._id === id ? { ...item, percent: value || 0 } : item
    );
    setChemicals(updated);
  };

  const total = chemicals.reduce(
    (sum, item) => sum + (item.percent || 0),
    0
  );

  const saveFormula = async () => {
    if (!formulaName) {
      return message.error("Enter formula name");
    }

    if (total !== 100) {
      return message.error("Total must be 100%");
    }

    try {
      await API.post("/formulas", {
        name: formulaName,
        chemicals: chemicals
          .filter(c => c.percent > 0)
          .map(c => ({
            chemicalId: c._id.startsWith("temp") ? null : c._id,
            name: c.name,
            percent: c.percent
          })),
      });

      message.success("Formula saved successfully");

      // ✅ Clear selection after save
      localStorage.removeItem("selectedChemicals");
      setChemicals([]);
      setFormulaName("");

    } catch (error) {
      console.error(error);
    }
  };

  const removeChemical = (id) => {

  const updated = chemicals.filter(c => c._id !== id);

  setChemicals(updated);

  localStorage.setItem(
    "selectedChemicals",
    JSON.stringify(updated)
  );
};

  const columns = [
    {
      title: "Chemical",
      dataIndex: "name",
      render: (_, record) => (
        <div
          style={{
            background: record.category?.color || "#f5f5f5",
            padding: "6px 10px",
            borderRadius: 6,
            fontWeight: 500
          }}
        >
          {record.name}
        </div>
      )
    },
    {
      title: "Percentage (%)",
      render: (_, record) => (
        <InputNumber
          min={0}
          max={100}
          value={record.percent}
          onChange={(value) =>
            handlePercentChange(value, record._id)
          }
        />
      ),
    },
    {
    title: "Remove",
    render: (_, record) => (
      <Button
        danger
        size="small"
        onClick={() => removeChemical(record._id)}
      >
        Remove
      </Button>
    )
  },
  ];



  return (
        <div
      style={{
        padding: "30px 40px",
        maxWidth: 900,
        margin: "auto"
      }}
    >
      <h2>Create Formula</h2>

      <Input
        placeholder="Formula Name"
        style={{ width: 300, marginBottom: 20 }}
        value={formulaName}
        onChange={(e) => setFormulaName(e.target.value)}
      />

      {formulaText && (
        <div style={{ marginBottom: 20 }}>
          <h3>AI Generated Formula</h3>
          <pre
            style={{
              background: "#f5f5f5",
              padding: 15,
              borderRadius: 6,
              whiteSpace: "pre-wrap"
            }}
          >
            {formulaText}
          </pre>
        </div>
      )}

      <Table
        dataSource={chemicals}
        columns={columns}
        pagination={false}
        rowKey="_id"
      />

      <h3 style={{ marginTop: 20 }}>
        Total: {total}%
      </h3>

      <Button
        style={{ marginRight: 10 }}
        onClick={autoBalanceTo100}
      >
        Auto Balance to 100%
      </Button>

      <Button
        type="primary"
        disabled={total !== 100}
        onClick={saveFormula}
      >
        Save Formula
      </Button>
    </div>
  );
}

export default Formula;