import React from 'react';
import { useSelector } from 'react-redux';
import Content from './Content';

function Starred() {
  const searchData = useSelector((state) => state.headerSearchData);
  const email = useSelector((state) => state.email.allMessage);
  return (
    <Content
      email={email.filter((value) => {
        return value.stared;
      })}
      searchData={searchData}
    />
  );
}

export default Starred;
