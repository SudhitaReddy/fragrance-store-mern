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
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import API from "../../api/api";

function Category() {
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const [loading, setLoading] = useState(false);

const fetchCategories = async () => {
  try {
    const { data } = await API.get("/categories");
    console.log("Categories API response:", data);
    setCategories(data);
  } catch (err) {
    console.log("API error:", err);
  }
};

  const handleCreate = async (values) => {
    await API.post("/categories", values);
    message.success("Category created");
    setVisible(false);
    form.resetFields();
    fetchCategories();
  };

  const handleDelete = async (id) => {
    await API.delete(`/categories/${id}`);
    message.success("Deleted");
    fetchCategories();
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
      title: "Action",
      render: (_, record) => (
        <Space>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          />
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
        dataSource={categories}
        columns={columns}
        rowKey="_id"
      />

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
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <Input />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
          >
            Save
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default Category;