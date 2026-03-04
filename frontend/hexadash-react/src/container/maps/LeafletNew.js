import React from 'react';
import { Row, Col } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import {
  LeafletBasicMap,
  LeafletMultipleMap,
  LeafletCustomIconMap,
  LeafletClusterMap,
  LeafletTestMap,
} from '../../components/maps/LeafletMaps';
import {
  SimpleLeafletBasicMap,
  SimpleLeafletMultipleMap,
  SimpleLeafletTestMap,
} from '../../components/maps/LeafletSimple';

const sampleData = [
  {
    id: 1,
    position: [50.797897, -1.077641],
  },
  {
    id: 2,
    position: [50.7997799, -1.100641],
  },
  {
    id: 3,
    position: [50.7997799, -1.100641],
  },
  {
    id: 4,
    position: [50.8017799, -1.102641],
  },
  {
    id: 5,
    position: [50.8037799, -1.104641],
  },
];

function LeafletNewPage() {
  return (
    <>
      <PageHeader title="Fresh Leaflet Maps Implementation" />
      <Main>
        <Row gutter={25}>
          <Col xs={24}>
            <Cards title="Simple Test Map - Guaranteed to Work" size="large">
              <SimpleLeafletTestMap />
            </Cards>
          </Col>
          
          <Col xs={24}>
            <Cards title="Advanced Test Map - Complex Implementation" size="large">
              <LeafletTestMap />
            </Cards>
          </Col>
          
          <Col md={12} xs={24}>
            <Cards title="Simple Basic Map - Guaranteed to Work" size="large">
              <SimpleLeafletBasicMap 
                latitude={50.797897} 
                longitude={-1.077641} 
                width="100%" 
                height="600px" 
                zoom={15} 
              />
            </Cards>
          </Col>

          <Col md={12} xs={24}>
            <Cards title="Simple Multiple Map - Guaranteed to Work" size="large">
              <SimpleLeafletMultipleMap
                data={sampleData}
                latitude={50.797897}
                longitude={-1.077641}
                width="100%"
                height="600px"
                zoom={12}
              />
            </Cards>
          </Col>

          <Col md={12} xs={24}>
            <Cards title="Advanced Basic Map - Complex Implementation" size="large">
              <LeafletBasicMap 
                latitude={50.797897} 
                longitude={-1.077641} 
                width="100%" 
                height="600px" 
                zoom={15} 
              />
            </Cards>
          </Col>

          <Col md={12} xs={24}>
            <Cards title="Advanced Multiple Map - Complex Implementation" size="large">
              <LeafletMultipleMap
                data={sampleData}
                latitude={50.797897}
                longitude={-1.077641}
                width="100%"
                height="600px"
                zoom={12}
              />
            </Cards>
          </Col>

          <Col md={12} xs={24}>
            <Cards title="Custom Icon Map" size="large">
              <LeafletCustomIconMap
                faIcon="fa fa-thumb-tack fa-3x"
                data={sampleData}
                latitude={50.797897}
                longitude={-1.077641}
                width="100%"
                height="600px"
                zoom={12}
              />
            </Cards>
          </Col>

          <Col md={12} xs={24}>
            <Cards title="Cluster Map" size="large">
              <LeafletClusterMap
                data={sampleData}
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

export default LeafletNewPage;
