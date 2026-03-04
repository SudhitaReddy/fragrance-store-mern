import React, { useState, useCallback, memo, forwardRef } from 'react';
import { ButtonStyled, ButtonStyledGroup } from './styled';

// Memoized Button component for better performance
const Button = memo(forwardRef(function Button({
  type = 'default',
  shape,
  icon,
  size,
  outlined,
  ghost,
  transparented,
  raised,
  squared,
  color,
  social,
  load,
  children,
  loading: externalLoading,
  onClick,
  ...rest
}, ref) {
  const [internalLoading, setInternalLoading] = useState(false);

  const handleClick = useCallback(
    (e) => {
      if (load) {
        setInternalLoading(true);
        // Auto-reset loading state after 2 seconds
        setTimeout(() => setInternalLoading(false), 2000);
      }
      if (onClick) {
        onClick(e);
      }
    },
    [load, onClick],
  );

  const isLoading = externalLoading !== undefined ? externalLoading : internalLoading;

  return (
    <ButtonStyled
      ref={ref}
      squared={squared}
      outlined={outlined ? 1 : 0}
      ghost={ghost}
      transparent={transparented ? 1 : 0}
      raised={raised ? 1 : 0}
      data={type}
      size={size}
      shape={shape}
      type={type}
      icon={icon}
      color={color}
      social={social}
      onClick={handleClick}
      loading={isLoading}
      disabled={isLoading}
      aria-label={typeof children === 'string' ? children : undefined}
      {...rest}
    >
      {children}
    </ButtonStyled>
  );
}));


function BtnGroup({ children }) {
  return <ButtonStyledGroup>{children}</ButtonStyledGroup>;
}


export { Button, BtnGroup };
