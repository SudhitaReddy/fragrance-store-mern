import React, { useEffect, useState } from "react";
import { Table, InputNumber, Button, message } from "antd";

import { useNavigate, useParams, useLocation } from "react-router-dom";
import API from "../../api/api";

function EditFormula() {

    const navigate = useNavigate();

  const { id } = useParams();
  const [chemicals, setChemicals] = useState([]);

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
      c._id === id ? { ...c, percent: value } : c
    );
    setChemicals(updated);
  };

  const saveVersion = async () => {
  try {

    await API.put(`/formulas/${id}`, {
      chemicals: chemicals.map((c) => ({
        chemicalId: c._id.startsWith("temp") ? null : c._id,
        name: c.name,
        percent: c.percent,
      })),
    });

    message.success("New version created");

    // ⭐ go back to formula list
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
      title: "Percent",
      render: (_, record) => (
        <InputNumber
          min={0}
          max={100}
          value={record.percent}
          onChange={(v) => handleChange(v, record._id)}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Formula</h2>

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