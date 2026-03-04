import React, { useLayoutEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import reChartData from '../../../demoData/recharts.json';

const { data, nullChart } = reChartData;

function CardArea() {
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
          <h4>Basic Area Chart</h4>
          <AreaChart
            width={responsive - (5 * responsive) / 100}
            height={350}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </div>
      </Col>
      <Col md={12} xs={24}>
        <div className="ninjadash-chart-container">
          <h4>Null Data Area Chart</h4>
          <AreaChart
            width={responsive - (5 * responsive) / 100}
            height={350}
            data={nullChart}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </div>
      </Col>
    </Row>
  );
}

export default CardArea;
