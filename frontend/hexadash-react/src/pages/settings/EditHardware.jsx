import React, { useEffect } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/api";
import "bootstrap/dist/css/bootstrap.min.css";

function EditHardware() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  useEffect(() => {
    fetchHardware();
  }, []);

  const fetchHardware = async () => {

    try {

      const res = await API.get(`/hardware/${id}`);

      form.setFieldsValue(res.data.data);

    } catch (error) {

      console.error(error);

    }

  };

  const handleSubmit = async (values) => {

    try {

      await API.put(`/hardware/${id}`, values);

      alert("Hardware updated");

      navigate("/admin/settings/hardware");

    } catch (error) {

      console.error(error);
      alert("Update failed");

    }

  };

  return (

    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-warning">
          <h5>Edit Hardware</h5>
        </div>

        <div className="card-body">

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >

            <div className="row">

              <div className="col-md-6">
                <Form.Item
                  label="Hardware Name"
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </div>

              <div className="col-md-6">
                <Form.Item
                  label="Type"
                  name="type"
                >
                  <Input />
                </Form.Item>
              </div>

            </div>

            <div className="row">

              <div className="col-md-6">
                <Form.Item
                  label="Quantity"
                  name="quantity"
                  rules={[{ required: true }]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </div>

            </div>

            <div className="d-flex gap-2">

              <Button
                type="primary"
                htmlType="submit"
              >
                Update Hardware
              </Button>

              <Button
                onClick={() =>
                  navigate("/admin/settings/hardware")
                }
              >
                Cancel
              </Button>

            </div>

          </Form>

        </div>

      </div>

    </div>

  );
}

export default EditHardware;