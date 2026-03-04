import React from 'react';
import { Link } from 'react-router-dom';
import { Content, DropdownStyle } from './dropdown-style';

function Dropdown({
  content = (
    <>
      <Link to="#">
        <span>Export to CSV</span>
      </Link>
      <Link to="#">
        <span>Export to XML</span>
      </Link>
      <Link to="#">
        <span>Export to Drive</span>
      </Link>
    </>
  ),
  placement = 'bottomRight',
  title,
  action = ['hover'],
  children,
  style = {},
  className = 'ninjadash-dropdown',
}) {
  return (
    <DropdownStyle
      overlayClassName={className}
      style={style}
      placement={placement}
      title={title}
      menu={{ items: [{ key: 'content', label: <Content>{content}</Content> }] }}
      trigger={action}
      getPopupContainer={(trigger) => trigger.parentElement}
    >
      {children}
    </DropdownStyle>
  );
}


export { Dropdown };
