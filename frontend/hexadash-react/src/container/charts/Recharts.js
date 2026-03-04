import React from 'react';
import { Row, Col, Card } from 'antd';
import CardBar from './recharts/CardBar';
import CardArea from './recharts/CardArea';
import CardComposed from './recharts/CardComposed';
import CardLine from './recharts/CardLine';
import CardPie from './recharts/CardPie';
import CardRadar from './recharts/CardRadar';
import CardRadial from './recharts/CardRadial';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import './recharts/style.css';

function Recharts() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Recharts',
    },
  ];

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Recharts" routes={PageRoutes} />
      <Main>
        <Row gutter={25}>
          <Col xs={24}>
            <Card title="Bar Charts">
              <CardBar />
            </Card>
          </Col>
          <Col xs={24}>
            <Card title="Area Charts">
              <CardArea />
            </Card>
          </Col>
          <Col xs={24}>
            <Card title="Composed Charts">
              <CardComposed />
            </Card>
          </Col>
          <Col xs={24}>
            <Card title="Line Charts">
              <CardLine />
            </Card>
          </Col>
          <Col xs={24}>
            <Card title="Pie Charts">
              <CardPie />
            </Card>
          </Col>
          <Col xs={24}>
            <Card title="Radar Charts">
              <CardRadar />
            </Card>
          </Col>
          <Col xs={24}>
            <Card title="Radial Bar Charts">
              <CardRadial />
            </Card>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Recharts;
