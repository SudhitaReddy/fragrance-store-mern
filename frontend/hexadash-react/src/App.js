import React, { useEffect, useState, lazy, Suspense, useMemo } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import Home from "./pages/Home";

// Suppress specific React warnings
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

console.warn = (...args) => {
  const message = args[0];
  if (typeof message === 'string' && message.includes('defaultProps will be removed')) {
    return;
  }
  originalConsoleWarn(...args);
};

console.error = (...args) => {
  const message = args[0];
  if (typeof message === 'string' && message.includes('defaultProps will be removed')) {
    return;
  }
  originalConsoleError(...args);
};

import { Provider, useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ConfigProvider, Spin } from 'antd';

import store from './redux/store';
import './static/css/style.css';
import config from './config/config';

import ErrorBoundary from './components/utilities/ErrorBoundary';

import { updateCSSVariables } from './config/theme/themeVariables';
import 'antd/dist/reset.css';

// Lazy load main components for better performance
const Admin = lazy(() => import('./routes/admin'));


const LoadingSpinner = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <Spin size="large" />
  </div>
);

const { themeColor } = config;

const ProviderConfig = () => {
  const dispatch = useDispatch();

  const selector = useMemo(
    () => (state) => ({
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      mainContent: state.ChangeLayoutMode.mode,
    }),
    []
  );

  const { rtl, topMenu, mainContent } = useSelector(selector);

  // ✅ JWT check here (NOT inside JSX)
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    updateCSSVariables(mainContent === "darkMode");
  }, [mainContent]);

  return (
    <ErrorBoundary>
      <ConfigProvider direction={rtl ? "rtl" : "ltr"}>
        <ThemeProvider theme={{ ...themeColor, rtl, topMenu, mainContent }}>
          <Router basename={process.env.PUBLIC_URL}>
            <Suspense fallback={<LoadingSpinner />}>

              <Routes>

                  
                  

                  {/* Public Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password/:token" element={<ResetPassword />} />
                  <Route path="/verify-otp" element={<VerifyOtp />} />

                  {/* Protected Route */}
                  <Route
                    path="/admin/*"
                    element={
                      isLoggedIn ? <Admin /> : <Navigate to="/login" />
                    }
                  />

                  {/* Default Redirect — ALWAYS LAST */}
                  <Route
                    path="*"
                    element={<Navigate to={isLoggedIn ? "/admin" : "/login"} />}
                  />

              </Routes>

            </Suspense>
          </Router>
        </ThemeProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
};
function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />
    </Provider>
  );
}

export default App;