import React from 'react';
import { Row, Col } from 'antd';
import Chart from 'react-apexcharts';

// Helper function for generating data
function generateData(count, yrange) {
  let i = 0;
  const series = [];
  while (i < count) {
    const x = (i + 1).toString();
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    series.push({
      x,
      y,
    });
    i += 1;
  }
  return series;
}

function ApexChartsHeatmap() {
  const basicHeatmapOptions = {
    chart: {
      height: 350,
      type: 'heatmap',
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#008FFB'],
    title: {
      text: 'HeatMap Chart (Single color)',
    },
  };

  const basicHeatmapSeries = [
    {
      name: 'Metric1',
      data: generateData(18, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric2',
      data: generateData(18, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric3',
      data: generateData(18, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric4',
      data: generateData(18, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric5',
      data: generateData(18, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric6',
      data: generateData(18, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric7',
      data: generateData(18, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric8',
      data: generateData(18, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric9',
      data: generateData(18, {
        min: 0,
        max: 90,
      }),
    },
  ];

  const colorRangeHeatmapOptions = {
    chart: {
      height: 350,
      type: 'heatmap',
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 0,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            {
              from: -30,
              to: 5,
              color: '#05A',
            },
            {
              from: 6,
              to: 20,
              color: '#09D',
            },
            {
              from: 21,
              to: 45,
              color: '#0A5',
            },
            {
              from: 46,
              to: 55,
              color: '#FF5',
            },
            {
              from: 56,
              to: 60,
              color: '#F55',
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
    },
    title: {
      text: 'HeatMap Chart (Color Range)',
    },
  };

  const colorRangeHeatmapSeries = [
    {
      name: 'Jan',
      data: generateData(20, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: 'Feb',
      data: generateData(20, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: 'Mar',
      data: generateData(20, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: 'Apr',
      data: generateData(20, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: 'May',
      data: generateData(20, {
        min: -30,
        max: 55,
      }),
    },
    {
      name: 'Jun',
      data: generateData(20, {
        min: -30,
        max: 55,
      }),
    },
  ];

  return (
    <Row gutter={25}>
      <Col xs={24} lg={12}>
        <div className="ninjadash-chart-container">
          <h4>Basic Heatmap</h4>
          <Chart options={basicHeatmapOptions} series={basicHeatmapSeries} type="heatmap" height={350} />
        </div>
      </Col>
      <Col xs={24} lg={12}>
        <div className="ninjadash-chart-container">
          <h4>Color Range Heatmap</h4>
          <Chart options={colorRangeHeatmapOptions} series={colorRangeHeatmapSeries} type="heatmap" height={350} />
        </div>
      </Col>
    </Row>
  );
}

export default ApexChartsHeatmap;
