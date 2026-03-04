import React from 'react';
import * as headings from './style';

function Heading({ as = 'h1', children, className, id }) {
  const StyledHeading = as ? headings[as.toUpperCase()] : headings.H1;

  return (
    <StyledHeading className={className} id={id}>
      {children}
    </StyledHeading>
  );
}


export default Heading;
