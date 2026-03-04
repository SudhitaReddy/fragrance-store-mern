import React from 'react';
import { useSelector } from 'react-redux';
import Content from './Content';

function Spam() {
  const searchData = useSelector((state) => state.headerSearchData);
  const email = useSelector((state) => state.email.allMessage);
  return (
    <Content
      email={email.filter((value) => {
        return value.type === 'spam';
      })}
      searchData={searchData}
    />
  );
}

export default Spam;
