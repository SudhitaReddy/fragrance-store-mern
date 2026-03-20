import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  Row,
  Col,
  message,
  Select,
} from "antd";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

const AddChemical = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/categories");
        setCategories(res.data.data || res.data);
      } catch (error) {
        console.error(error);
        message.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  // ✅ Submit
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      console.log("Submitting:", values); // 🔍 debug

      await API.post("/chemicals", values);

      message.success("Chemical added successfully");

      navigate("/admin/inventory");
    } catch (error) {
      console.error("Save chemical error:", error);
      message.error("Failed to add chemical");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" style={{ padding: 30 }}>
      <Col xs={24} sm={20} md={14} lg={10}>
        <Card
          title="Add New Chemical"
          style={{
            borderRadius: 10,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Form layout="vertical" onFinish={handleSubmit}>
            
            {/* NAME */}
            <Form.Item
              label="Chemical Name"
              name="name"
              rules={[
                { required: true, message: "Please enter chemical name" },
              ]}
            >
              <Input placeholder="Example: Lemon Oil" />
            </Form.Item>

            {/* CATEGORY (FIXED) */}
            <Form.Item
              label="Category"
              name="category"
              rules={[
                { required: true, message: "Please select category" },
              ]}
            >
              <Select placeholder="Select Category">
                {categories.map((c) => (
                  <Select.Option key={c._id} value={c._id}>
                    {c.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {/* STOCK */}
            <Form.Item
              label="Stock (ml)"
              name="stock"
              rules={[
                { required: true, message: "Please enter stock quantity" },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                placeholder="Enter stock in ml"
              />
            </Form.Item>

            {/* BUTTONS */}
            <Form.Item>
              <Row gutter={10}>
                <Col span={12}>
                  <Button
                    block
                    onClick={() => navigate("/admin/inventory")}
                  >
                    Cancel
                  </Button>
                </Col>

                <Col span={12}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                  >
                    Save Chemical
                  </Button>
                </Col>
              </Row>
            </Form.Item>

          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default AddChemical;