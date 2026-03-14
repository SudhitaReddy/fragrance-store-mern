import React, { useEffect, useState } from "react";
import { Card, Table, Tag } from "antd";
import { useParams } from "react-router-dom";
import API from "../../api/api";

function ViewFormula() {
  const { id } = useParams();
  const [formula, setFormula] = useState(null);

  useEffect(() => {
    fetchFormula();
  }, []);

  const fetchFormula = async () => {
    try {
      const { data } = await API.get(`/formulas/${id}`);
      setFormula(data);
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    {
      title: "Chemical",
      render: (_, record) =>
        record.chemicalId?.name || record.name,
    },
    {
      title: "Percent",
      dataIndex: "percent",
      render: (p) => `${p}%`,
    },
  ];

  if (!formula) return null;

  return (
    <Card title={`${formula.name} (v${formula.version})`}>
      <Table
        dataSource={formula.chemicals}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />
    </Card>
  );
}

export default ViewFormula;