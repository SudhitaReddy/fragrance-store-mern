import React from 'react';
import { Breadcrumb } from 'antd';

function PageHeader({ title, subTitle, breadcrumb, extra, children, ...props }) {
  return (
    <div
      style={{
        padding: '16px 24px 25px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #f0f0f0',
      }}
      {...props}
    >
      {breadcrumb && <Breadcrumb style={{ marginBottom: 16 }}>{breadcrumb}</Breadcrumb>}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          {title && <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{title}</h1>}
          {subTitle && <div style={{ marginTop: 8, color: '#666' }}>{subTitle}</div>}
        </div>
        {extra && <div>{extra}</div>}
      </div>
      {children}
    </div>
  );
}


export default PageHeader;
