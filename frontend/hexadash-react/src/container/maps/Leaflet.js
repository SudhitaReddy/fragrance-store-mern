import React from 'react';
import { Row, Col } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import {
  LeafletMapBasic,
  LeafletMapMultipleIcon,
  LeafletMapCustomIcon,
  LeafletMarkerCluster,
} from '../../components/maps/leaflet';
import {
  LeafletNativeBasic,
  LeafletNativeMultiple,
  LeafletNativeCluster,
} from '../../components/maps/LeafletNative';
import SimpleMapTest from '../../components/maps/SimpleMapTest';

const place = [
  {
    id: 1,
    position: [50.797897, -1.077641],
  },
  {
    id: 2,
    position: [50.798897, -1.013641],
  },
  {
    id: 3,
    position: [50.7997799, -1.100641],
  },
];

function OsMap() {
  return (
    <>
      <PageHeader title="Openstreet Maps (Leaflet)" />
      <Main>
        <Row gutter={25}>
          <Col xs={24}>
            <Cards title="Simple Map Test (React-Leaflet)" size="large">
              <SimpleMapTest />
            </Cards>
          </Col>
          
          <Col xs={24}>
            <Cards title="Native Leaflet Basic Map" size="large">
              <LeafletNativeBasic latitude={50.797897} longitude={-1.077641} width="100%" height="600px" zoom={15} />
            </Cards>
          </Col>
          
          <Col md={12} xs={24}>
            <Cards title="Leaflet Basic Map (React-Leaflet)" size="large">
              <LeafletMapBasic latitude={50.797897} longitude={-1.077641} width="100%" height="600px" zoom={15} />
            </Cards>
          </Col>

          <Col md={12} xs={24}>
            <Cards title="Leaflet Multiple Icon" size="large">
              <LeafletMapMultipleIcon
                data={place}
                latitude={50.797897}
                longitude={-1.077641}
                width="100%"
                height="600px"
                zoom={12}
              />
            </Cards>
          </Col>

          <Col md={12} xs={24}>
            <Cards title="Leaflet Custom Icon" size="large">
              <LeafletMapCustomIcon
                faIcon="fa fa-thumb-tack fa-3x"
                data={place}
                latitude={50.797897}
                longitude={-1.077641}
                width="100%"
                height="600px"
                zoom={12}
              />
            </Cards>
          </Col>

          <Col md={12} xs={24}>
            <Cards title="Leaflet Cluster Map" size="large">
              <LeafletMarkerCluster
                faIcon="fa fa-thumb-tack fa-3x"
                data={place}
                latitude={50.797897}
                longitude={-1.077641}
                width="100%"
                height="600px"
                zoom={12}
              />
            </Cards>
          </Col>

          <Col md={12} xs={24}>
            <Cards title="Native Leaflet Multiple" size="large">
              <LeafletNativeMultiple
                data={place}
                latitude={50.797897}
                longitude={-1.077641}
                width="100%"
                height="600px"
                zoom={12}
              />
            </Cards>
          </Col>

          <Col md={12} xs={24}>
            <Cards title="Native Leaflet Cluster" size="large">
              <LeafletNativeCluster
                data={place}
                latitude={50.797897}
                longitude={-1.077641}
                width="100%"
                height="600px"
                zoom={12}
              />
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default OsMap;
