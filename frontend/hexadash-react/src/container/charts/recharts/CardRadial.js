import React, { useLayoutEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { RadialBarChart, RadialBar, Legend } from 'recharts';

function CardRadial() {
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

  const data = [
    {
      name: '18-24',
      uv: 31.47,
      pv: 2400,
      fill: '#8884d8',
    },
    {
      name: '25-29',
      uv: 26.69,
      pv: 4567,
      fill: '#83a6ed',
    },
    {
      name: '30-34',
      uv: 15.69,
      pv: 1398,
      fill: '#8dd1e1',
    },
    {
      name: '35-39',
      uv: 8.22,
      pv: 9800,
      fill: '#82ca9d',
    },
    {
      name: '40-49',
      uv: 8.63,
      pv: 3908,
      fill: '#a4de6c',
    },
    {
      name: '50+',
      uv: 2.63,
      pv: 4800,
      fill: '#d0ed57',
    },
  ];

  return (
    <Row gutter={25}>
      <Col md={12} xs={24}>
        <div className="ninjadash-chart-container">
          <h4>Simple Radial Bar Chart</h4>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="10%"
            outerRadius="80%"
            barSize={10}
            data={data}
            width={responsive - (5 * responsive) / 100}
            height={350}
          >
            <RadialBar
              minAngle={15}
              label={{ position: 'insideStart', fill: '#fff' }}
              background
              clockWise
              dataKey="uv"
            />
            <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" align="right" />
          </RadialBarChart>
        </div>
      </Col>
      <Col md={12} xs={24}>
        <div className="ninjadash-chart-container">
          <h4>Multiple Radial Bar Chart</h4>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="10%"
            outerRadius="80%"
            barSize={10}
            data={data}
            width={responsive - (5 * responsive) / 100}
            height={350}
          >
            <RadialBar
              minAngle={15}
              label={{ position: 'insideStart', fill: '#fff' }}
              background
              clockWise
              dataKey="uv"
            />
            <RadialBar
              minAngle={15}
              label={{ position: 'insideStart', fill: '#fff' }}
              background
              clockWise
              dataKey="pv"
            />
            <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" align="right" />
          </RadialBarChart>
        </div>
      </Col>
    </Row>
  );
}

export default CardRadial;
