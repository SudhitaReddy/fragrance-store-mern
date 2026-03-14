import React from "react";
import { Card, Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";

function Settings() {

const navigate = useNavigate();

return (

<div style={{ padding: 20 }}>

<h2>System Settings</h2>

<Row gutter={16}>

<Col span={8}>
<Card title="Hardware Inventory">
<p>Manage funnels, bottles, tubes and other lab tools.</p>

<Button
type="primary"
onClick={() => navigate("/admin/settings/hardware")}
>
Open
</Button>

</Card>
</Col>

<Col span={8}>
<Card title="Recycle Bin">
<p>Restore or permanently delete removed records.</p>

<Button
type="primary"
danger
onClick={() => navigate("/admin/settings/recycle")}
>
Open
</Button>

</Card>
</Col>

</Row>

</div>

);

}

export default Settings;