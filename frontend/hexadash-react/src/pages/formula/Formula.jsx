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
  if (location.state?.formula && chemicals.length > 0) {

    const text = location.state.formula;
    setFormulaText(text);

    const lines = text.split("\n");

    const parsed = lines.map(line => {
      const match = line.match(/(.+)-\s*(\d+)%/);

      if (match) {
        return {
          name: match[1].trim().toLowerCase(),
          percent: Number(match[2])
        };
      }

      return null;
    }).filter(Boolean);

   const updatedChemicals = chemicals.map(c => {

  const found = parsed.find(p =>
    c.name.toLowerCase() === p.name.toLowerCase()
  );

  if (found) {
    return { ...c, percent: found.percent };
  }

  return { ...c, percent: 0 };
});

    setChemicals(updatedChemicals);

  }
}, [location, chemicals]);

useEffect(() => {
  const fetchChemicals = async () => {
    try {
      const res = await API.get("/chemicals");
      const data = res.data.map(c => ({
        ...c,
        percent: 0
      }));
      setChemicals(data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchChemicals();
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
            chemicalId: c._id,
            percent: c.percent,
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

  const columns = [
    { title: "Chemical", dataIndex: "name" },
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
  ];

  return (
    <div style={{ padding: 20 }}>
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