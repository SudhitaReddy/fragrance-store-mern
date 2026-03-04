import { useState, useEffect } from 'react';

export const useResponsiveChartHeight = (mobileHeight, desktopHeight, breakpoint = 575) => {
  const [height, setHeight] = useState(desktopHeight);

  useEffect(() => {
    const updateHeight = () => {
      setHeight(window.innerWidth <= breakpoint ? mobileHeight : desktopHeight);
    };

    // Set initial height immediately
    updateHeight();

    // Add resize listener
    window.addEventListener('resize', updateHeight);

    // Add a small delay to handle route changes and component mounting
    const timeoutId = setTimeout(updateHeight, 100);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateHeight);
      clearTimeout(timeoutId);
    };
  }, [mobileHeight, desktopHeight, breakpoint]);

  // Force update on component mount/remount (route changes)
  useEffect(() => {
    const updateHeight = () => {
      setHeight(window.innerWidth <= breakpoint ? mobileHeight : desktopHeight);
    };
    
    // Update height when component mounts (route changes)
    updateHeight();
    
    // Also update after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(updateHeight, 50);
    
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array means this runs on every mount

  return height;
};
