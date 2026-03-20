import React, { useEffect, useState } from "react";
import { Card, Table, Tag, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/api";

function ViewFormula() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formula, setFormula] = useState(null);
  const [versions, setVersions] = useState([]);

  // ✅ LOAD BOTH DATA USING SAME ID
  useEffect(() => {
    fetchFormula();
    fetchVersions();
  }, [id]);

  // ✅ Fetch current formula
  const fetchFormula = async () => {
    try {
      const { data } = await API.get(`/formulas/${id}`);
      setFormula(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Fetch all versions (FIXED)
  const fetchVersions = async () => {
    try {
      const { data } = await API.get(`/formulas/versions/${id}`);
      console.log("VERSIONS:", data);
      setVersions(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 CHEMICAL TABLE
  const chemicalColumns = [
    {
      title: "Chemical",
      render: (_, record) =>
        record?.chemicalId?.name || (record?.name?.trim() || "Unknown")
    },
    {
      title: "Percent",
      dataIndex: "percent",
      render: (p) => `${p}%`,
    },
  ];

  // 🔥 VERSION TABLE
  const versionColumns = [
    {
      title: "Version",
      render: (_, record) => <Tag color="blue">v{record.version}</Tag>,
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      render: (date) =>
        date ? new Date(date).toLocaleString() : "-",
    },
    {
      title: "Status",
      render: (_, record) =>
        record._id === formula?._id ? (
          <Tag color="green">Current</Tag>
        ) : (
          <Tag>Old</Tag>
        ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            size="small"
            onClick={() => navigate(`/admin/formula/view/${record._id}`)}
          >
            View
          </Button>

          <Button
            size="small"
            type="primary"
            onClick={() =>
              navigate(`/admin/formula/edit/${record._id}`)
            }
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  // ✅ Prevent crash
  if (!formula) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return (
    <div className="container mt-3">

      {/* 🔥 CURRENT VERSION */}
      <Card
        title={`${formula?.name || "Formula"} (v${formula?.version || "-"})`}
        extra={
          <Button
            type="primary"
            onClick={() =>
              navigate(`/admin/formula/edit/${formula?._id}`)
            }
          >
            Edit Current
          </Button>
        }
      >
        <Table
          dataSource={formula?.chemicals || []}
          columns={chemicalColumns}
          rowKey="_id"
          pagination={false}
        />
      </Card>

      {/* 🔥 VERSION HISTORY */}
      <Card title="Version History" className="mt-3">
        <Table
          dataSource={versions}
          columns={versionColumns}
          rowKey="_id"
          pagination={false}
          expandable={{
            expandedRowRender: (record) => (
              <Table
                dataSource={record?.chemicals || []}
                columns={chemicalColumns}
                pagination={false}
                rowKey={(r, i) => i}
              />
            ),
          }}
        />
      </Card>

    </div>
  );
}

export default ViewFormula;