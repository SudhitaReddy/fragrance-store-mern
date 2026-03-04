import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Pages from './pages';
import withAdminLayout from '../../layout/withAdminLayout';
const NotFound = lazy(() => import('../../container/pages/404'));

const Admin = React.memo(() => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route path="/*" element={<Pages />} />
        <Route path="pages/*" element={<Pages />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

Admin.displayName = 'Admin';
export default withAdminLayout(Admin);