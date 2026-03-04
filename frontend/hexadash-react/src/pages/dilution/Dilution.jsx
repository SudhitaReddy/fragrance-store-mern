import React, { useState } from "react";
import { Card, Row, Col, InputNumber, Typography, Divider, Select, Slider } from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

function Dilution() {

  const [oil, setOil] = useState(10);
  const [strength, setStrength] = useState(20);

  // Prevent NaN errors
  const alcohol = oil && strength ? oil * ((100 - strength) / strength) : 0;
  const total = oil + alcohol;

  const handleTypeChange = (value) => {
    setStrength(value);
  };

  return (
    <Card
      title="Perfume Dilution Calculator"
      style={{ maxWidth: 700, margin: "auto" }}
    >

      <Row gutter={[16, 16]}>

        {/* Oil Input */}
        <Col span={24}>
          <Text>Fragrance Oil (ml)</Text>
          <InputNumber
            value={oil}
            min={0}
            onChange={(value) => setOil(value || 0)}
            style={{ width: "100%" }}
          />
        </Col>

        {/* Strength Input */}
        <Col span={24}>
          <Text>Strength (%)</Text>
          <InputNumber
            value={strength}
            min={1}
            max={100}
            onChange={(value) => setStrength(value || 1)}
            style={{ width: "100%" }}
          />
        </Col>

        {/* Slider */}
        <Col span={24}>
          <Slider
            min={1}
            max={40}
            value={strength}
            onChange={setStrength}
          />
        </Col>

        {/* Perfume Type */}
        <Col span={24}>
          <Text>Perfume Type</Text>
          <Select
            placeholder="Select Type"
            style={{ width: "100%" }}
            onChange={handleTypeChange}
          >
            <Option value={30}>Parfum (30%)</Option>
            <Option value={20}>EDP (20%)</Option>
            <Option value={10}>EDT (10%)</Option>
            <Option value={5}>Cologne (5%)</Option>
          </Select>
        </Col>

      </Row>

      <Divider />

      {/* Results */}
      <Title level={5}>Results</Title>

      <Row gutter={16}>

        <Col span={12}>
          <Text>Alcohol Needed</Text>
          <Title level={4}>{alcohol.toFixed(2)} ml</Title>
        </Col>

        <Col span={12}>
          <Text>Total Volume</Text>
          <Title level={4}>{total.toFixed(2)} ml</Title>
        </Col>

      </Row>

    </Card>
  );
}

export default Dilution;