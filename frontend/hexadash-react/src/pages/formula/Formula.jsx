import React, { useEffect, useState } from "react";
import { Table, InputNumber, Button, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import { useLocation } from "react-router-dom";

function Formula() {
  const navigate = useNavigate();

  const location = useLocation();

  const [chemicals, setChemicals] = useState([]);
  const [allChemicals, setAllChemicals] = useState([]); // ⭐ NEW
  const [showPicker, setShowPicker] = useState(false); // ⭐ NEW
  const [formulaName, setFormulaName] = useState("");
  const [formulaText, setFormulaText] = useState("");

  // 🔥 LOAD AI FORMULA
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
            _id: `temp-${match[1].trim()}`,
            name: match[1].trim(),
            percent: Number(match[2]),
          };
        }

        return null;
      })
      .filter(Boolean);

    setChemicals(parsed);
  }, [location.state]);

  // 🔥 LOAD SAVED CHEMICALS
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("selectedChemicals")) || [];

    if (stored.length > 0) {
      setChemicals(stored);
    }
  }, []);

  // 🔥 FETCH ALL CHEMICALS (NEW)
  useEffect(() => {
    fetchAllChemicals();
  }, []);

  const fetchAllChemicals = async () => {
    try {
      const res = await API.get("/chemicals");
      setAllChemicals(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 ADD CHEMICAL FROM PANEL
  const addChemical = (chem) => {

    const exists = chemicals.find(c => c._id === chem._id);

    if (exists) {
      return message.warning("Already added");
    }

    const newItem = {
      _id: chem._id,
      name: chem.name,
      percent: 0,
      category: chem.category
    };

    const updated = [...chemicals, newItem];

    setChemicals(updated);

    localStorage.setItem(
      "selectedChemicals",
      JSON.stringify(updated)
    );
  };

  // 🔥 REMOVE
  const removeChemical = (id) => {
    const updated = chemicals.filter(c => c._id !== id);
    setChemicals(updated);

    localStorage.setItem(
      "selectedChemicals",
      JSON.stringify(updated)
    );
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

      localStorage.removeItem("selectedChemicals");
      setChemicals([]);
      setFormulaName("");

    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: "Chemical",
      dataIndex: "name",
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
      ),
    },
  ];

  return (
    <div style={{ padding: 30, maxWidth: 900, margin: "auto" }}>

      <h2>Create Formula</h2>

      {/* 🔥 TOGGLE BUTTON */}
      <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>

        <Button onClick={() => setShowPicker(!showPicker)}>
          {showPicker ? "Close Panel" : "+ Choose Chemicals"}
        </Button>

        <Button
          type="primary"
          onClick={() => navigate("/admin/ai-formula")}
        >
          🤖 Generate with AI
        </Button>

      </div>

      <Input
        placeholder="Formula Name"
        style={{ width: 300, marginBottom: 20 }}
        value={formulaName}
        onChange={(e) => setFormulaName(e.target.value)}
      />

      <Table
        dataSource={chemicals}
        columns={columns}
        pagination={false}
        rowKey="_id"
      />

      <h3 style={{ marginTop: 20 }}>Total: {total}%</h3>

      <Button
        type="primary"
        disabled={total !== 100}
        onClick={saveFormula}
      >
        Save Formula
      </Button>

      {/* 🔥 SIDE PANEL */}
      {showPicker && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setShowPicker(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.2)",
              zIndex: 999
            }}
          />

          {/* Panel */}
          <div
            style={{
              position: "fixed",
              right: 0,
              top: 0,
              width: 320,
              height: "100vh",
              background: "#fff",
              padding: 20,
              overflowY: "auto",
              zIndex: 1000
            }}
          >
            <h4>Add Chemicals</h4>

            {allChemicals.map((chem) => (
              <div
                key={chem._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                  border: "1px solid #eee",
                  padding: 8,
                  borderRadius: 6
                }}
              >
                <div
                  style={{
                    background: chem.category?.color || "#f5f5f5",
                    padding: "4px 8px",
                    borderRadius: 6,
                    color: "#fff",
                    fontWeight: 500
                  }}
                >
                  {chem.name}
                </div>

                <Button
                  size="small"
                  type="primary"
                  onClick={() => addChemical(chem)}
                >
                  Add
                </Button>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
}

export default Formula;