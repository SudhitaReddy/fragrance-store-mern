import React, { useEffect, useState } from "react";
import { Table, InputNumber, Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/api";

function EditFormula() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [chemicals, setChemicals] = useState([]);
  const [totalQty, setTotalQty] = useState(100); // ⭐ NEW

  useEffect(() => {
    fetchFormula();
  }, []);

  const fetchFormula = async () => {
    try {
      const { data } = await API.get(`/formulas/${id}`);

      const parsed = data.chemicals.map((c) => ({
        _id: c.chemicalId?._id || `temp-${c.name}`,
        name: c.chemicalId?.name || c.name,
        percent: c.percent,
      }));

      setChemicals(parsed);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (value, id) => {
    const updated = chemicals.map((c) =>
      c._id === id ? { ...c, percent: value || 0 } : c
    );
    setChemicals(updated);
  };

  const saveVersion = async () => {
    try {
      // ⭐ VALIDATION
      const totalPercent = chemicals.reduce(
        (sum, c) => sum + Number(c.percent || 0),
        0
      );

      if (totalPercent !== 100) {
        return message.error("Total percentage must be 100%");
      }

      await API.put(`/formulas/${id}`, {
        chemicals: chemicals.map((c) => ({
          chemicalId: c._id.startsWith("temp") ? null : c._id,
          name: c.name,
          percent: c.percent,
        })),
      });

      message.success("New version created");
      navigate("/admin/formula-list");
    } catch (error) {
      console.error(error);
      message.error("Update failed");
    }
  };

  const columns = [
    {
      title: "Chemical",
      dataIndex: "name",
    },
    {
      title: "Percent (%)",
      render: (_, record) => (
        <InputNumber
          min={0}
          max={100}
          value={record.percent}
          onChange={(v) => handleChange(v, record._id)}
        />
      ),
    },
    {
      title: "Quantity", // ⭐ NEW COLUMN
      render: (_, record) => {
        const qty = (record.percent / 100) * totalQty;
        return <span>{qty.toFixed(2)}</span>;
      },
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Formula</h2>

      {/* ⭐ TOTAL QUANTITY INPUT */}
      <div style={{ marginBottom: 20 }}>
        <span style={{ marginRight: 10 }}>Total Quantity:</span>
        <InputNumber
          min={1}
          value={totalQty}
          onChange={(v) => setTotalQty(v || 0)}
        />
      </div>

      <Table
        dataSource={chemicals}
        columns={columns}
        pagination={false}
        rowKey="_id"
      />

      <Button
        type="primary"
        style={{ marginTop: 20 }}
        onClick={saveVersion}
      >
        Save New Version
      </Button>
    </div>
  );
}

export default EditFormula;