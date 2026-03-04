import React from 'react';
import { Row, Col } from 'antd';
import Chart from 'react-apexcharts';

function ApexChartsCandlestick() {
  const basicCandlestickOptions = {
    chart: {
      height: 350,
      type: 'candlestick',
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const basicCandlestickSeries = [
    {
      data: [
        {
          x: new Date('2016-01-01').getTime(),
          y: [51.98, 56.29, 51.59, 53.85],
        },
        {
          x: new Date('2016-01-02').getTime(),
          y: [53.66, 54.99, 51.35, 52.95],
        },
        {
          x: new Date('2016-01-03').getTime(),
          y: [52.96, 53.78, 51.54, 53.37],
        },
        {
          x: new Date('2016-01-04').getTime(),
          y: [53.79, 53.98, 51.88, 52.38],
        },
        {
          x: new Date('2016-01-05').getTime(),
          y: [52.38, 52.63, 51.29, 52.22],
        },
        {
          x: new Date('2016-01-06').getTime(),
          y: [52.22, 54.99, 52.17, 54.04],
        },
        {
          x: new Date('2016-01-07').getTime(),
          y: [54.04, 54.5, 53.34, 54.17],
        },
        {
          x: new Date('2016-01-08').getTime(),
          y: [54.17, 54.58, 53.46, 53.78],
        },
        {
          x: new Date('2016-01-09').getTime(),
          y: [53.78, 54.31, 53.35, 54.07],
        },
        {
          x: new Date('2016-01-10').getTime(),
          y: [54.07, 54.17, 52.4, 52.64],
        },
      ],
    },
  ];

  const volumeCandlestickOptions = {
    chart: {
      height: 350,
      type: 'candlestick',
    },
    title: {
      text: 'CandleStick Chart - Category X-axis',
      align: 'left',
    },
    annotations: {
      xaxis: [
        {
          x: 'Oct 06 14:00',
          borderColor: '#00E396',
          label: {
            borderColor: '#00E396',
            style: {
              fontSize: '12px',
              color: '#fff',
              background: '#00E396',
            },
            text: 'Annotation Test',
          },
        },
      ],
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#00E396',
          downward: '#FF4560',
        },
      },
    },
    xaxis: {
      type: 'category',
      labels: {
        formatter(val) {
          return val;
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const volumeCandlestickSeries = [
    {
      data: [
        {
          x: 'Oct 01',
          y: [6629.81, 6650.5, 6623.04, 6633.33],
        },
        {
          x: 'Oct 02',
          y: [6632.01, 6643.59, 6620.26, 6630.11],
        },
        {
          x: 'Oct 03',
          y: [6630.71, 6648.95, 6623.34, 6635.65],
        },
        {
          x: 'Oct 04',
          y: [6635.65, 6651, 6629.67, 6638.24],
        },
        {
          x: 'Oct 05',
          y: [6638.24, 6640, 6620, 6624.47],
        },
        {
          x: 'Oct 06',
          y: [6624.53, 6636.03, 6621.68, 6624.31],
        },
        {
          x: 'Oct 07',
          y: [6624.61, 6632.2, 6617, 6626.02],
        },
        {
          x: 'Oct 08',
          y: [6627, 6627.62, 6614.22, 6623.02],
        },
        {
          x: 'Oct 09',
          y: [6623.02, 6627.33, 6619.03, 6625.84],
        },
        {
          x: 'Oct 10',
          y: [6625.84, 6626.97, 6611.84, 6622.92],
        },
      ],
    },
  ];

  return (
    <Row gutter={25}>
      <Col xs={24} lg={12}>
        <div className="ninjadash-chart-container">
          <h4>Basic Candlestick Chart</h4>
          <Chart options={basicCandlestickOptions} series={basicCandlestickSeries} type="candlestick" height={350} />
        </div>
      </Col>
      <Col xs={24} lg={12}>
        <div className="ninjadash-chart-container">
          <h4>Volume Candlestick Chart</h4>
          <Chart options={volumeCandlestickOptions} series={volumeCandlestickSeries} type="candlestick" height={350} />
        </div>
      </Col>
    </Row>
  );
}

export default ApexChartsCandlestick;
