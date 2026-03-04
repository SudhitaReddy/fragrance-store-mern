import React from 'react';
import { useSelector } from 'react-redux';
import EmailContent from './Content';

function Trash() {
  const searchData = useSelector((state) => state.headerSearchData);
  const email = useSelector((state) => state.email.allMessage);
  return (
    <EmailContent
      email={email.filter((value) => {
        return value.type === 'trash';
      })}
      searchData={searchData}
    />
  );
}

export default Trash;
