import React from 'react';
import { AlertWrap } from './Style';

function Alert({
  type = 'success',
  icon,
  message = 'Hello there! A simple success alert—check it out!',
  description,
  showIcon,
  outlined,
  closable,
  closeText,
}) {
  return (
    <AlertWrap
      message={message}
      type={type}
      description={description}
      closable={closeText ? { closeIcon: closeText } : closable}
      showIcon={showIcon && showIcon}
      outlined={outlined}
      icon={icon && icon}
    />
  );
}


export default Alert;
