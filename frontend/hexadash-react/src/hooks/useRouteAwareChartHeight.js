import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useRouteAwareChartHeight = (mobileHeight, desktopHeight, breakpoint = 575) => {
  const [height, setHeight] = useState(desktopHeight);
  const location = useLocation();

  const updateHeight = () => {
    // Ensure window is available (SSR safety)
    if (typeof window !== 'undefined') {
      const newHeight = window.innerWidth <= breakpoint ? mobileHeight : desktopHeight;
      setHeight(newHeight);
    }
  };

  useEffect(() => {
    // Update height immediately when route changes
    updateHeight();
    
    // Update height after multiple delays to handle different loading scenarios
    const timeoutIds = [
      setTimeout(updateHeight, 50),
      setTimeout(updateHeight, 100),
      setTimeout(updateHeight, 200)
    ];
    
    return () => timeoutIds.forEach(id => clearTimeout(id));
  }, [location.pathname, mobileHeight, desktopHeight, breakpoint]);

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      updateHeight();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Initial height calculation with multiple attempts
    updateHeight();
    const initialTimeout = setTimeout(updateHeight, 10);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(initialTimeout);
    };
  }, [mobileHeight, desktopHeight, breakpoint]);

  // Force update on component mount
  useEffect(() => {
    updateHeight();
    const mountTimeout = setTimeout(updateHeight, 50);
    return () => clearTimeout(mountTimeout);
  }, []);

  return height;
};
