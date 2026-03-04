import UilCheck from '@iconscout/react-unicons/icons/uil-check';
import React from 'react';
import { Link } from 'react-router-dom';
import { Content, PopoverStyle, Title } from './style';
import './style.css';

function Popover({
  content = (
    <>
      <Link to="#">
        <UilCheck />
        <span>Btn Dropdown one</span>
      </Link>
      <Link to="#">
        <UilCheck />
        <span>Btn Dropdown two</span>
      </Link>
      <Link to="#">
        <UilCheck />
        <span>Btn Dropdown three</span>
      </Link>
    </>
  ),
  placement = 'bottom',
  title,
  action = 'hover',
  children,
}) {
  const content1 = <Content>{content}</Content>;

  return (
    <PopoverStyle placement={placement} title={title && <Title>{title}</Title>} content={content1} trigger={action}>
      {children}
    </PopoverStyle>
  );
}


export { Popover };
