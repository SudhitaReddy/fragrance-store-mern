import React from 'react';
import { Row, Col } from 'antd';
import OverviewCard from '../../../../components/cards/OverviewCard';
import { OverviewDataStyleWrap } from '../../Style';

import OverviewData from '../../../../demoData/overviewData.json';

const OverviewDataList = React.memo(({ column = '2' }) => {
  const OverviewDataSorted = OverviewData.slice(0, 4);

  return (
    <OverviewDataStyleWrap>
      <Row gutter={25}>
        {OverviewDataSorted.map((item, i) => {
          return (
            <Col xxl={column === '2' ? null : 6} md={12} xs={24} key={`overview-${item.id || i}`}>
              <OverviewCard data={item} contentFirst />
            </Col>
          );
        })}
      </Row>
    </OverviewDataStyleWrap>
  );
});


export default OverviewDataList;
