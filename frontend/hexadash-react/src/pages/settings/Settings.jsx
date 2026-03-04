
import React from "react";
import { Form, InputNumber, Button } from "antd";

function Settings() {
  return (
    <Form layout="vertical">
      <Form.Item label="Default Strength (%)">
        <InputNumber defaultValue={20} />
      </Form.Item>

      <Form.Item label="Low Stock Alert (ml)">
        <InputNumber defaultValue={50} />
      </Form.Item>

      <Button type="primary">Save Settings</Button>
    </Form>
  );
}

export default Settings;