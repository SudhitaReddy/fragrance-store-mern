import React from 'react';
import { Row, Col } from 'antd';
import Chart from 'react-apexcharts';

function ApexChartsRadial() {
  const basicRadialOptions = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
      },
    },
    labels: ['Cricket'],
  };

  const basicRadialSeries = [70];

  const multiRadialOptions = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            label: 'Total',
            formatter() {
              return 249;
            },
          },
        },
      },
    },
    labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
  };

  const multiRadialSeries = [44, 55, 67, 83];

  const gaugeOptions = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#e0e0e0',
          strokeWidth: '97%',
          margin: 5,
        },
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            offsetY: -50,
            fontSize: '22px',
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#ABE5A1'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    labels: ['Average Results'],
  };

  const gaugeSeries = [76];

  return (
    <Row gutter={25}>
      <Col xs={24} lg={8}>
        <div className="ninjadash-chart-container">
          <h4>Basic Radial Chart</h4>
          <Chart options={basicRadialOptions} series={basicRadialSeries} type="radialBar" height={350} />
        </div>
      </Col>
      <Col xs={24} lg={8}>
        <div className="ninjadash-chart-container">
          <h4>Multi Radial Chart</h4>
          <Chart options={multiRadialOptions} series={multiRadialSeries} type="radialBar" height={350} />
        </div>
      </Col>
      <Col xs={24} lg={8}>
        <div className="ninjadash-chart-container">
          <h4>Gauge Chart</h4>
          <Chart options={gaugeOptions} series={gaugeSeries} type="radialBar" height={350} />
        </div>
      </Col>
    </Row>
  );
}

export default ApexChartsRadial;
