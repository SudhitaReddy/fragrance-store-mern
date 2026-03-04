import React from 'react';
import { Row, Col } from 'antd';
import Chart from 'react-apexcharts';

function ApexChartsPie() {
  const basicPieOptions = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  const basicPieSeries = [44, 55, 13, 43, 22];

  const donutOptions = {
    chart: {
      width: 380,
      type: 'donut',
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  const donutSeries = [44, 55, 13, 43];

  const polarAreaOptions = {
    chart: {
      width: 380,
      type: 'polarArea',
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    fill: {
      opacity: 0.8,
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: 'bottom',
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
  };

  const polarAreaSeries = [14, 23, 21, 17, 15];

  return (
    <Row gutter={25}>
      <Col xs={24} lg={8}>
        <div className="ninjadash-chart-container">
          <h4>Basic Pie Chart</h4>
          <Chart options={basicPieOptions} series={basicPieSeries} type="pie" width={380} />
        </div>
      </Col>
      <Col xs={24} lg={8}>
        <div className="ninjadash-chart-container">
          <h4>Donut Chart</h4>
          <Chart options={donutOptions} series={donutSeries} type="donut" width={380} />
        </div>
      </Col>
      <Col xs={24} lg={8}>
        <div className="ninjadash-chart-container">
          <h4>Polar Area Chart</h4>
          <Chart options={polarAreaOptions} series={polarAreaSeries} type="polarArea" width={380} />
        </div>
      </Col>
    </Row>
  );
}

export default ApexChartsPie;
