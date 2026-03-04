import React, { useLayoutEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import rechartdata from '../../../demoData/recharts.json';

const { data, positiveAndNegative } = rechartdata;

function CardBar() {
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
          <h4>Basic Bar Chart</h4>
          <BarChart
            width={responsive - (5 * responsive) / 100}
            height={350}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </div>
      </Col>
      <Col md={12} xs={24}>
        <div className="ninjadash-chart-container">
          <h4>Positive & Negative Bar Chart</h4>
          <BarChart
            width={responsive - (5 * responsive) / 100}
            height={350}
            data={positiveAndNegative}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </div>
      </Col>
    </Row>
  );
}

export default CardBar;
