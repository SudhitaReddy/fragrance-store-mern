import React from 'react';
import { Row, Col } from 'antd';
import Chart from 'react-apexcharts';

function ApexChartsBar() {
  const basicBarOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
    yaxis: {
      title: {
        text: '$ (thousands)',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter(val) {
          return `$ ${val} thousands`;
        },
      },
    },
  };

  const basicBarSeries = [
    {
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60],
    },
    {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114],
    },
    {
      name: 'Free Cash Flow',
      data: [35, 41, 36, 26, 45, 48, 52, 53],
    },
  ];

  const horizontalBarOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        'South Korea',
        'Canada',
        'United Kingdom',
        'Netherlands',
        'Italy',
        'France',
        'Japan',
        'United States',
        'China',
        'India',
      ],
    },
  };

  const horizontalBarSeries = [
    {
      name: 'GDP',
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
    },
  ];

  return (
    <Row gutter={25}>
      <Col xs={24} lg={12}>
        <div className="ninjadash-chart-container">
          <h4>Basic Bar Chart</h4>
          <Chart options={basicBarOptions} series={basicBarSeries} type="bar" height={350} />
        </div>
      </Col>
      <Col xs={24} lg={12}>
        <div className="ninjadash-chart-container">
          <h4>Horizontal Bar Chart</h4>
          <Chart options={horizontalBarOptions} series={horizontalBarSeries} type="bar" height={350} />
        </div>
      </Col>
    </Row>
  );
}

export default ApexChartsBar;
