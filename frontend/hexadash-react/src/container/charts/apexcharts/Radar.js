import React from 'react';
import { Row, Col } from 'antd';
import Chart from 'react-apexcharts';

function ApexChartsRadar() {
  const basicRadarOptions = {
    chart: {
      height: 350,
      type: 'radar',
    },
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June'],
    },
  };

  const basicRadarSeries = [
    {
      name: 'Series 1',
      data: [80, 50, 30, 40, 100, 20],
    },
  ];

  const multiRadarOptions = {
    chart: {
      height: 350,
      type: 'radar',
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1,
      },
    },
    title: {
      text: 'Radar Chart - Multi Series',
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.1,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: ['2011', '2012', '2013', '2014', '2015', '2016'],
    },
  };

  const multiRadarSeries = [
    {
      name: 'Series 1',
      data: [20, 100, 40, 30, 50, 80, 33],
    },
    {
      name: 'Series 2',
      data: [80, 20, 60, 70, 30, 40, 67],
    },
  ];

  const polygonRadarOptions = {
    chart: {
      height: 350,
      type: 'radar',
    },
    plotOptions: {
      radar: {
        size: 140,
        polygons: {
          strokeColors: '#e9e9e9',
          fill: {
            colors: ['#f8f8f8', '#fff'],
          },
        },
      },
    },
    title: {
      text: 'Radar with Polygon Fill',
    },
    colors: ['#FF4560'],
    markers: {
      size: 4,
      colors: ['#fff'],
      strokeColor: '#FF4560',
      strokeWidth: 2,
    },
    tooltip: {
      y: {
        formatter(val) {
          return val;
        },
      },
    },
    xaxis: {
      categories: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'],
    },
    yaxis: {
      tickAmount: 7,
      labels: {
        formatter(val, i) {
          if (i % 2 === 0) {
            return val;
          }
          return '';
        },
      },
    },
  };

  const polygonRadarSeries = [
    {
      name: 'Series 1',
      data: [20, 100, 40, 30, 50, 80, 33],
    },
  ];

  return (
    <Row gutter={25}>
      <Col xs={24} lg={8}>
        <div className="ninjadash-chart-container">
          <h4>Basic Radar Chart</h4>
          <Chart options={basicRadarOptions} series={basicRadarSeries} type="radar" height={350} />
        </div>
      </Col>
      <Col xs={24} lg={8}>
        <div className="ninjadash-chart-container">
          <h4>Multi Radar Chart</h4>
          <Chart options={multiRadarOptions} series={multiRadarSeries} type="radar" height={350} />
        </div>
      </Col>
      <Col xs={24} lg={8}>
        <div className="ninjadash-chart-container">
          <h4>Polygon Radar Chart</h4>
          <Chart options={polygonRadarOptions} series={polygonRadarSeries} type="radar" height={350} />
        </div>
      </Col>
    </Row>
  );
}

export default ApexChartsRadar;
