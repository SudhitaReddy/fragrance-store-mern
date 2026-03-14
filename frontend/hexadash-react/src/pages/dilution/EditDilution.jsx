import React, { useEffect } from "react";
import { Form, InputNumber, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/api";

function EditDilution() {

  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDilution();
  }, []);

  const fetchDilution = async () => {
    const res = await API.get(`/dilutions/${id}`);
    form.setFieldsValue(res.data.data);
  };

  const handleSubmit = async (values) => {

    await API.put(`/dilutions/${id}`, values);

    navigate("/admin/dilution/history");

  };

  return (
    <div style={{ padding: 20 }}>

      <h2>Edit Dilution</h2>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>

        <Form.Item name="oilAmount" label="Oil Amount">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="strength" label="Strength %">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Update
        </Button>

      </Form>

    </div>
  );
}

export default EditDilution;