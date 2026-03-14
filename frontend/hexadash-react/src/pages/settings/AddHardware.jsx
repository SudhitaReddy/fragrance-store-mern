import React from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import "bootstrap/dist/css/bootstrap.min.css";

function AddHardware() {

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {

    try {

      await API.post("/hardware", values);

      alert("Hardware added successfully");

      navigate("/admin/settings/hardware");

    } catch (error) {

      console.error(error);
      alert("Failed to add hardware");

    }

  };

  return (

    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h5>Add Hardware</h5>
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
                  <Input placeholder="Example: Glass Funnel" />
                </Form.Item>
              </div>

              <div className="col-md-6">
                <Form.Item
                  label="Type"
                  name="type"
                >
                  <Input placeholder="Example: Funnel / Bottle / Tube" />
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
                Save Hardware
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

export default AddHardware;