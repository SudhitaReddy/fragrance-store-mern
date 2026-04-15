import React, { useEffect, useState } from "react";
import { Table, Button, Input, Tag, Space, Popconfirm, message } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function HardwareInventory() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchHardware();
  }, []);

  const fetchHardware = async () => {
    try {
      setLoading(true);
      const res = await API.get("/hardware");
      setItems(res.data.data || []);
    } catch (error) {
      message.error("Failed to load hardware");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      await API.delete(`/hardware/${id}`);
      message.success("Moved to recycle bin");
      fetchHardware();
    } catch (error) {
      message.error("Delete failed");
    }
  };

  // 🔍 FILTER
  const filtered = items.filter((item) =>
    (item.name + item.type)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // 📊 STATUS
  const getStatus = (qty) => {
    if (qty === 0) return { text: "Out of Stock", color: "red" };
    if (qty <= 5) return { text: "Low Stock", color: "orange" };
    return { text: "In Stock", color: "green" };
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text) => text || "-",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (qty) => <strong>{qty}</strong>,
    },
    {
      title: "Status",
      render: (_, record) => {
        const status = getStatus(record.quantity);
        return <Tag color={status.color}>{status.text}</Tag>;
      },
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space wrap>
          <Button
            type="link"
            onClick={() =>
              navigate(`/admin/settings/hardware/adjust/${record._id}`)
            }
          >
            Adjust
          </Button>

          <Button
            type="link"
            onClick={() =>
              navigate(`/admin/settings/hardware/edit/${record._id}`)
            }
          >
            Edit
          </Button>

          <Popconfirm
            title="Move to recycle bin?"
            onConfirm={() => deleteItem(record._id)}
          >
            <Button type="link" danger>
              Move to Bin
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h2>Hardware Inventory</h2>

        <Button
          type="primary"
          onClick={() => navigate("/admin/settings/hardware/add")}
        >
          + Add Hardware
        </Button>
      </div>

      {/* SEARCH */}
      <Input
        placeholder="Search by name or type..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: 300, marginBottom: 20 }}
      />

      {/* TABLE */}
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={filtered}
        loading={loading}
      />
    </div>
  );
}

export default HardwareInventory;