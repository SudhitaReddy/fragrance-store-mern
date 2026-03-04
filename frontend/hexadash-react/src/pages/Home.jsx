import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Table, List } from "antd";
import {
  ExperimentOutlined,
  PlusOutlined,
  DatabaseOutlined
} from "@ant-design/icons";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Home() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    chemicals: 0,
    formulas: 0,
    categories: 0,
    lowStock: [],
    recentFormulas: []
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = user?.name?.split(" ")[0] || "User";

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const res = await API.get("/dashboard");
      setStats(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  const chartData = [
    { name: "Floral", value: 5 },
    { name: "Citrus", value: 3 },
    { name: "Woody", value: 4 },
    { name: "Oriental", value: 2 }
  ];

  const columns = [
    { title: "Chemical", dataIndex: "name" },
    { title: "Stock", dataIndex: "stock" }
  ];

  return (
    <div style={{ padding: 24 }}>

      {/* HERO SECTION */}
      <Card
        style={{
          marginBottom: 30,
          background: "linear-gradient(120deg,#4facfe,#00f2fe)",
          color: "white"
        }}
      >
        <h1>Welcome back, {firstName} 👋</h1>
        <p>Create beautiful fragrances with AI powered tools.</p>

        <Button
          type="primary"
          icon={<ExperimentOutlined />}
          style={{ marginRight: 10 }}
          onClick={() => navigate("/admin/ai-formula")}
        >
          Generate AI Formula
        </Button>

        <Button
          icon={<PlusOutlined />}
          style={{ marginRight: 10 }}
          onClick={() => navigate("/admin/formula")}
        >
          Create Formula
        </Button>

        <Button
          icon={<DatabaseOutlined />}
          onClick={() => navigate("/admin/inventory")}
        >
          Add Chemical
        </Button>

      </Card>

      {/* STATISTICS */}
      <Row gutter={16} style={{ marginBottom: 30 }}>

        <Col span={6}>
          <Card>
            <h3>Total Chemicals</h3>
            <h1>{stats.chemicals}</h1>
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <h3>Total Formulas</h3>
            <h1>{stats.formulas}</h1>
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <h3>Categories</h3>
            <h1>{stats.categories}</h1>
          </Card>
        </Col>

        

      </Row>

      <Row gutter={16}>

        {/* CHART */}
        <Col span={8}>
          <Card title="Formula Distribution">

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={80}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

          </Card>
        </Col>

        {/* LOW STOCK */}
        

        {/* RECENT FORMULAS */}
        <Col span={8}>
          <Card title="Recent Formulas">

            <List
              dataSource={stats.recentFormulas}
              renderItem={(item) => (
                <List.Item>
                  {item.name}
                </List.Item>
              )}
            />

          </Card>
        </Col>

      </Row>

    </div>
  );
}

export default Home;