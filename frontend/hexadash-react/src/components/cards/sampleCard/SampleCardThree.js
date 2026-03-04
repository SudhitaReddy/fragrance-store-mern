import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.figure`
  background: ${({ theme }) => theme[theme.mainContent]['white-background']};
  padding: 25px;
  border-radius: 10px;
  text-align: center;
  margin: 0;
  figcaption {
    h2 {
      margin: 24px 0 10px 0;
      color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
    }
    p {
      line-height: 1.79;
      color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
    }
  }
`;

function SampleCardThree({ item = undefined }) {
  const { content, title, img } = item;
  return (
    <CardWrapper>
      <img src={require(`../../../${img}`)} alt="" />
      <figcaption>
        <h2>{title}</h2>
        <p>{content}</p>
      </figcaption>
    </CardWrapper>
  );
}



export default SampleCardThree;
