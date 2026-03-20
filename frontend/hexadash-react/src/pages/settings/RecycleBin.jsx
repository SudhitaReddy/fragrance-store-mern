import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Tabs } from "antd";
import API from "../../api/api";

function RecycleBin() {

  const [data, setData] = useState({
    chemicals: [],
    categories: [],
    formulas: [],
    dilutions: [],
    hardware: []
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecycleBin();
  }, []);

  const fetchRecycleBin = async () => {
    try {
      setLoading(true);
      const res = await API.get("/recycle");
      setData(res.data.data || {});
    } catch (error) {
      console.error(error);
      message.error("Failed to load recycle bin");
    } finally {
      setLoading(false);
    }
  };

  const restoreItem = async (type, id) => {
    try {
      await API.put(`/recycle/restore/${type}/${id}`);
      message.success("Item restored");
      fetchRecycleBin();
    } catch (error) {
      message.error("Restore failed");
    }
  };

  const deleteForever = async (type, id) => {
    try {
      await API.delete(`/recycle/delete/${type}/${id}`);
      message.success("Item permanently deleted");
      fetchRecycleBin();
    } catch (error) {
      message.error("Delete failed");
    }
  };

  const emptyRecycleBin = async () => {
    try {
      await API.delete("/recycle/empty");
      message.success("Recycle bin emptied");
      fetchRecycleBin();
    } catch (error) {
      message.error("Failed to empty recycle bin");
    }
  };

  const columns = (type) => [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Deleted At",
      dataIndex: "deletedAt",
      render: (date) =>
        date ? new Date(date).toLocaleString() : "-",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 10 }}>
          <Button
            type="link"
            onClick={() => restoreItem(type, record._id)}
          >
            Restore
          </Button>

          <Popconfirm
            title="Delete permanently?"
            onConfirm={() => deleteForever(type, record._id)}
          >
            <Button type="link" danger>
              Delete Forever
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>

      <h2>Recycle Bin</h2>

      <Button
        danger
        style={{ marginBottom: 20 }}
        onClick={emptyRecycleBin}
      >
        Empty Recycle Bin
      </Button>

      <Tabs
        defaultActiveKey="chemicals"
        items={[
          {
            key: "chemicals",
            label: `Chemicals (${data.chemicals?.length || 0})`,
            children: (
              <Table
                rowKey="_id"
                columns={columns("chemical")}
                dataSource={data.chemicals}
                loading={loading}
              />
            ),
          },
          {
            key: "categories",
            label: `Categories (${data.categories?.length || 0})`,
            children: (
              <Table
                rowKey="_id"
                columns={columns("category")}
                dataSource={data.categories}
                loading={loading}
              />
            ),
          },
          {
            key: "formulas",
            label: `Formulas (${data.formulas?.length || 0})`,
            children: (
              <Table
                rowKey="_id"
                columns={columns("formula")}
                dataSource={data.formulas}
                loading={loading}
              />
            ),
          },
          {
            key: "dilutions",
            label: `Dilutions (${data.dilutions?.length || 0})`,
            children: (
              <Table
                rowKey="_id"
                columns={columns("dilution")}
                dataSource={data.dilutions}
                loading={loading}
              />
            ),
          },
          {
            key: "hardware",
            label: `Hardware (${data.hardware?.length || 0})`,
            children: (
              <Table
                rowKey="_id"
                columns={columns("hardware")}
                dataSource={data.hardware}
                loading={loading}
              />
            ),
          },
        ]}
      />

    </div>
  );
}

export default RecycleBin;