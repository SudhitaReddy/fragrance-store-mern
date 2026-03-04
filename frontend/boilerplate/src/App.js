import React, { useEffect, useState, lazy, Suspense, useMemo } from 'react';

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
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import store, { rrfProps } from './redux/store';
import './static/css/style.css';
import config from './config/config';
import ProtectedRoute from './components/utilities/protectedRoute';
import ErrorBoundary from './components/utilities/ErrorBoundary';
import { initializeAuth } from './redux/authentication/authSlice';
import { updateCSSVariables } from './config/theme/themeVariables';
import 'antd/dist/reset.css';

// Lazy load main components for better performance
const Admin = lazy(() => import('./routes/admin'));
const Auth = lazy(() => import('./routes/auth'));
const NotFound = lazy(() => import('./container/pages/404'));

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
  
  // Memoize the selector to prevent unnecessary re-renders
  const selector = useMemo(() => (state) => ({
    rtl: state.ChangeLayoutMode.rtlData,
    topMenu: state.ChangeLayoutMode.topMenu,
    mainContent: state.ChangeLayoutMode.mode,
    isLoggedIn: state.auth.login,
  }), []);
  
  const { rtl, isLoggedIn, topMenu, mainContent } = useSelector(selector);

  const [path, setPath] = useState(window.location.pathname);

  // Initialize auth state from localStorage on app startup
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // Update CSS variables when theme changes
  useEffect(() => {
    updateCSSVariables(mainContent === 'darkMode');
  }, [mainContent]);

  return (
    <ErrorBoundary>
      <ConfigProvider direction={rtl ? 'rtl' : 'ltr'}>
        <ThemeProvider theme={{ ...themeColor, rtl, topMenu, mainContent }}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <Router basename={process.env.PUBLIC_URL}>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {!isLoggedIn ? (
                    <Route path="/*" element={<Auth />} />
                  ) : (
                    <>
                      <Route path="/admin/*" element={<ProtectedRoute path="/*" Component={Admin} />} />
                      <Route path="*" element={<NotFound />} />
                    </>
                  )}
                  {isLoggedIn && (path === process.env.PUBLIC_URL || path === `${process.env.PUBLIC_URL}/`) && (
                    <Route path="/" element={<Navigate to="/admin" />} />
                  )}
                </Routes>
              </Suspense>
            </Router>
          </ReactReduxFirebaseProvider>
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