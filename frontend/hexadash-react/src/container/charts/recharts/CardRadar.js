import React, { useLayoutEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';
import reChartData from '../../../demoData/recharts.json';

const { data } = reChartData;

function CardRadar() {
  const [state, setState] = useState({
    responsive: 0,
  });
  const { responsive } = state;

  useLayoutEffect(() => {
    function updateSize() {
      const element = document.querySelector('.recharts-wrapper');
      const width =
        element !== null
          ? element.closest('.ant-card-body').clientWidth
          : document.querySelector('.ant-card-body').clientWidth;
      setState({ responsive: width });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <Row gutter={25}>
      <Col md={12} xs={24}>
        <div className="ninjadash-chart-container">
          <h4>Simple Radar Chart</h4>
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="80%"
            width={responsive - (5 * responsive) / 100}
            height={350}
            data={data}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </div>
      </Col>
      <Col md={12} xs={24}>
        <div className="ninjadash-chart-container">
          <h4>Multiple Radar Chart</h4>
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="80%"
            width={responsive - (5 * responsive) / 100}
            height={350}
            data={data}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            <Radar name="John" dataKey="C" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </div>
      </Col>
    </Row>
  );
}

export default CardRadar;
