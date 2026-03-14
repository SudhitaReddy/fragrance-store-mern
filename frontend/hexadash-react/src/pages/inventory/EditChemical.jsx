import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Select } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/api";

const EditChemical = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchChemical();
    fetchCategories();
  }, []);

  // FETCH CHEMICAL
  const fetchChemical = async () => {
    try {
      const res = await API.get(`/chemicals/${id}`);
      const chemical = res.data.data;

      form.setFieldsValue({
        name: chemical.name,
        category: chemical.category?._id || chemical.category,
        stock: chemical.stock
      });

    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // FETCH CATEGORIES
  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data.data || []);
    } catch (error) {
      console.error("Category fetch error:", error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      await API.put(`/chemicals/${id}`, values);
      navigate("/admin/inventory");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">

      <h3 className="mb-4">Edit Chemical</h3>

      <div className="card p-4 shadow-sm">

        <Form form={form} layout="vertical" onFinish={handleSubmit}>

          <div className="row">

            <div className="col-md-6">
              <Form.Item
                label="Chemical Name"
                name="name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </div>

            <div className="col-md-6">
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select Category">

                  {categories.map((cat) => (
                    <Select.Option key={cat._id} value={cat._id}>
                      {cat.name}
                    </Select.Option>
                  ))}

                </Select>
              </Form.Item>
            </div>

          </div>

          <div className="row">

            <div className="col-md-6">
              <Form.Item
                label="Stock (ml)"
                name="stock"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </div>

          </div>

          <Button type="primary" htmlType="submit">
            Update Chemical
          </Button>

        </Form>

      </div>

    </div>
  );
};

export default EditChemical;