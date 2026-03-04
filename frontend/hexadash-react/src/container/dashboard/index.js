

import React, { lazy, Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';


function Dashboard() {

  console.log("DASHBOARD LOADED");
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Demo 1',
    },
  ];
  return (
  <>
    <PageHeader
      className="ninjadash-page-header-main"
      title="Dashboard"
    />

    <Main>
      <div style={{ padding: 40, fontSize: 24 }}>
        Dashboard Working Successfully 🚀
      </div>
    </Main>
  </>
);
}

export default Dashboard;
