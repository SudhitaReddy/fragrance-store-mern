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
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function FormulaList() {

  const [formulas, setFormulas] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false); // ⭐ added

  const navigate = useNavigate();

  useEffect(() => {
    fetchFormulas();
  }, []);

  // Fetch formulas
  const fetchFormulas = async () => {
    try {

      setLoading(true);

      const { data } = await API.get("/formulas");

      // supports both {data:[]} or []
      setFormulas(data.data || data);

    } catch (error) {
      console.error(error);
      message.error("Failed to load formulas");
    } finally {
      setLoading(false);
    }
  };

  // Delete formula
  const handleDelete = async (id) => {
    try {

      await API.delete(`/formulas/${id}`);

      message.success("Formula deleted");

      fetchFormulas();

    } catch (err) {
      console.error(err);
      message.error("Delete failed");
    }
  };

  // Produce formula
  const handleProduce = async (id) => {
    try {

      await API.post(`/formulas/produce/${id}`, {
        quantity: 1000
      });

      message.success("Production successful");

    } catch (error) {
      console.error(error);
      message.error("Production failed");
    }
  };

  // Safe filtering
  const filtered = (formulas || []).filter((f) =>
    f.name?.toLowerCase().includes(searchText.toLowerCase())
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
      render: (_, record) => record.chemicals?.length || 0,
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

          {/* VIEW */}
          <Button
            icon={<EyeOutlined />}
            onClick={() =>
              navigate(`/admin/formula/view/${record._id}`)
            }
          >
            View
          </Button>

          {/* PRODUCE */}
          <Popconfirm
            title="Start production?"
            onConfirm={() => handleProduce(record._id)}
          >
            <Button
              icon={<PlayCircleOutlined />}
              type="primary"
            >
              Produce
            </Button>
          </Popconfirm>

          {/* EDIT */}
          <Button
            icon={<EditOutlined />}
            onClick={() =>
              navigate(`/admin/formula/edit/${record._id}`)
            }
          >
            Edit
          </Button>

          {/* DELETE */}
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
        loading={loading} // ⭐ loading spinner
      />

    </div>
  );
}

export default FormulaList;