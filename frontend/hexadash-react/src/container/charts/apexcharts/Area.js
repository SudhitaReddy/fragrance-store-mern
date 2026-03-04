import React from 'react';
import { Row, Col } from 'antd';
import Chart from 'react-apexcharts';

// Helper function for generating time series data
function generateDayWiseTimeSeries(baseval, count, yrange) {
  let i = 0;
  const series = [];
  while (i < count) {
    const x = baseval;
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push([x, y]);
    baseval += 86400000;
    i += 1;
  }
  return series;
}

function ApexChartsArea() {
  const basicAreaOptions = {
    chart: {
      height: 350,
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00.000Z',
        '2018-09-19T01:30:00.000Z',
        '2018-09-19T02:30:00.000Z',
        '2018-09-19T03:30:00.000Z',
        '2018-09-19T04:30:00.000Z',
        '2018-09-19T05:30:00.000Z',
        '2018-09-19T06:30:00.000Z',
      ],
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  };

  const basicAreaSeries = [
    {
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];

  const stackedAreaOptions = {
    chart: {
      height: 350,
      type: 'area',
      stacked: true,
    },
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.8,
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
  };

  const stackedAreaSeries = [
    {
      name: 'South',
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: 'North',
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 20,
      }),
    },
    {
      name: 'Central',
      data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 15,
      }),
    },
  ];

  return (
    <Row gutter={25}>
      <Col xs={24} lg={12}>
        <div className="ninjadash-chart-container">
          <h4>Basic Area Chart</h4>
          <Chart options={basicAreaOptions} series={basicAreaSeries} type="area" height={350} />
        </div>
      </Col>
      <Col xs={24} lg={12}>
        <div className="ninjadash-chart-container">
          <h4>Stacked Area Chart</h4>
          <Chart options={stackedAreaOptions} series={stackedAreaSeries} type="area" height={350} />
        </div>
      </Col>
    </Row>
  );
}

export default ApexChartsArea;
