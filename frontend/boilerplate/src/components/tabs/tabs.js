import * as Unicons from '@iconscout/react-unicons';
import React from 'react';
import { TabBasic } from './style';

function Tab(props) {
  const { data, tabPosition, type, color } = props;

  // Convert data to items format for Antd v5
  const items = data.map((item, index) => {
    const { title, content, icon, tabTitle } = item;
    const IconTag = Unicons[icon];
    
    return {
      key: (index + 1).toString(),
      label: icon === undefined ? (
        tabTitle
      ) : (
        <span>
          <IconTag />
          {tabTitle}
        </span>
      ),
      children: (
        <>
          <h2>{title}</h2>
          <p>{content}</p>
        </>
      ),
    };
  });

  return (
    <TabBasic
      className={`ninjadash-tab-${type}`}
      color={color && color}
      defaultActiveKey="1"
      tabPosition={tabPosition !== undefined ? tabPosition : 'top'}
      items={items}
    />
  );
}


export { Tab };
