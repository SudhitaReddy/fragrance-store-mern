import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const FrontendRoutes = () => {
  return (
    <Routes>
      {/* Redirect everything to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default FrontendRoutes;