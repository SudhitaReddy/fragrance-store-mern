import React from 'react';
import { Row, Col, Card } from 'antd';
import ApexChartsBar from './apexcharts/Bar';
import ApexChartsLine from './apexcharts/Line';
import ApexChartsArea from './apexcharts/Area';
import ApexChartsPie from './apexcharts/Pie';
import ApexChartsRadial from './apexcharts/Radial';
import ApexChartsRadar from './apexcharts/Radar';
import ApexChartsHeatmap from './apexcharts/Heatmap';
import ApexChartsCandlestick from './apexcharts/Candlestick';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';

function ApexCharts() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'ApexCharts',
    },
  ];

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="ApexCharts" routes={PageRoutes} />
      <Main>
        <Row gutter={25}>
          <Col xs={24}>
            <Card title="Bar Charts" className="mb-25">
              <ApexChartsBar />
            </Card>
          </Col>
          <Col xs={24}>
            <Card title="Line Charts" className="mb-25">
              <ApexChartsLine />
            </Card>
          </Col>
          <Col xs={24}>
            <Card title="Area Charts" className="mb-25">
              <ApexChartsArea />
            </Card>
          </Col>
          <Col xs={24}>
            <Card title="Pie Charts" className="mb-25">
              <ApexChartsPie />
            </Card>
          </Col>
          <Col xs={24}>
            <Card title="Radial Charts" className="mb-25">
              <ApexChartsRadial />
            </Card>
          </Col>
          <Col xs={24}>
            <Card title="Radar Charts" className="mb-25">
              <ApexChartsRadar />
            </Card>
          </Col>
          <Col xs={24}>
            <Card title="Heatmap Charts" className="mb-25">
              <ApexChartsHeatmap />
            </Card>
          </Col>
          <Col xs={24}>
            <Card title="Candlestick Charts" className="mb-25">
              <ApexChartsCandlestick />
            </Card>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default ApexCharts;
