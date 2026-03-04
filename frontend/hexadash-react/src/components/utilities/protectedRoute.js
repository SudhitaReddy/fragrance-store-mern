import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ Component }) {
  const isLoggedIn = useSelector((state) => state.auth.login);

  return isLoggedIn ? <Component /> : <Navigate to="/" replace />;
}


export default ProtectedRoute;
