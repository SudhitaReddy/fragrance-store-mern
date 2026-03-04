import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Tag,
  Space,
  Input,
  Popconfirm,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import API from "../../api/api";

function FormulaList() {
  const [formulas, setFormulas] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchFormulas();
  }, []);

  const fetchFormulas = async () => {
    try {
      const { data } = await API.get("/formulas");
      setFormulas(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/formulas/${id}`);
      message.success("Formula deleted");
      fetchFormulas();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = formulas.filter((f) =>
    f.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Formula Name",
      dataIndex: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Version",
      render: (_, record) => (
        <Tag color="purple">v{record.version || 1}</Tag>
      ),
    },
    {
      title: "Chemicals",
      render: (_, record) => record.chemicals.length,
    },
    {
      title: "Created",
      render: (_, record) =>
        new Date(record.createdAt).toLocaleDateString(),
    },
    {
      title: "Status",
      render: () => <Tag color="green">Active</Tag>,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<PlayCircleOutlined />}
            type="primary"
          >
            Produce
          </Button>

          <Button
            icon={<EditOutlined />}
          />

          <Popconfirm
            title="Delete formula?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Saved Formulas</h2>

      <Input
        placeholder="Search formula..."
        style={{ width: 300, marginBottom: 20 }}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <Table
        dataSource={filtered}
        columns={columns}
        rowKey="_id"
      />
    </div>
  );
}

export default FormulaList;