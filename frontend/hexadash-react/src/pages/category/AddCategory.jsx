import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { SketchPicker } from "react-color";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function AddCategory() {
  const [color, setColor] = useState("#1890ff");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await API.post("/categories", {
        ...values,
        color
      });

      message.success("Category created");

      navigate("/admin/category");

    } catch (error) {
      console.error(error);
      message.error("Failed to create category");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 700 }}>

      <h2>Add Category</h2>

      {/* Preview */}
      <Card
        style={{
          background: color,
          color: "#fff",
          marginBottom: 20
        }}
      >
        <h3>{name || "Category Preview"}</h3>
      </Card>

      <Form layout="vertical" onFinish={handleSubmit}>

        <Form.Item
          label="Category Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input
            placeholder="Example: Citrus"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <Input placeholder="Optional description" />
        </Form.Item>

        {/* Color Picker */}
        <Form.Item label="Category Color">
          <SketchPicker
            color={color}
            onChange={(c) => setColor(c.hex)}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          style={{ marginTop: 10 }}
        >
          Save Category
        </Button>

      </Form>
    </div>
  );
}

export default AddCategory;