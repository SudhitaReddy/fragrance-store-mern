import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  Tag,
  Space,
  message,
  Popconfirm
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { SketchPicker } from "react-color";
import API from "../../api/api";

function Category() {

  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#6f42c1");

  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories
  const fetchCategories = async () => {
    try {

      setLoading(true);

      const { data } = await API.get("/categories");

      setCategories(data.data || data);

    } catch (err) {

      console.log("API error:", err);
      message.error("Failed to load categories");

    } finally {
      setLoading(false);
    }
  };

  // Create category
  const handleCreate = async (values) => {
    try {

      const payload = {
        ...values,
        color
      };

      await API.post("/categories", payload);

      message.success("Category created");

      setVisible(false);
      form.resetFields();
      setColor("#6f42c1");

      fetchCategories();

    } catch (error) {

      console.error(error);
      message.error("Create failed");

    }
  };

  // Delete category
  const handleDelete = async (id) => {
    try {

      await API.delete(`/categories/${id}`);

      message.success("Category deleted");

      fetchCategories();

    } catch (error) {

      console.error(error);
      message.error("Delete failed");

    }
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Chemicals",
      dataIndex: "chemicalsCount",
      render: (v) => v || 0,
    },
    {
      title: "Color",
      dataIndex: "color",
      render: (color) => (
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 4,
            background: color || "#ccc"
          }}
        />
      ),
    },
    {
      title: "Status",
      render: (_, record) =>
        record.isActive ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>

          <Button
            icon={<EditOutlined />}
            onClick={() =>
              navigate(`/admin/category/edit/${record._id}`)
            }
          />

          <Popconfirm
            title="Delete category?"
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

      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <h2>Categories</h2>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setVisible(true)}
        >
          Add Category
        </Button>

      </Space>

      <Table
        dataSource={categories || []}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      {/* Add Category Modal */}

      <Modal
        title="Add Category"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreate}
        >

          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <Input placeholder="Optional description" />
          </Form.Item>

          {/* COLOR PICKER */}

          <div style={{ marginBottom: 20 }}>
            <label>Category Color</label>

            <SketchPicker
              color={color}
              onChangeComplete={(c) => setColor(c.hex)}
            />

            <div
              style={{
                marginTop: 10,
                width: 40,
                height: 40,
                borderRadius: 6,
                background: color
              }}
            />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            block
          >
            Save Category
          </Button>

        </Form>
      </Modal>

    </div>
  );
}

export default Category;