import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardWrapper = styled.figure`
  background: ${({ theme }) => theme[theme.mainContent]['white-background']};
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 0;
  figcaption {
    h2 {
      margin: 18px 0 10px 0;
      font-size: 18px;
      font-weight: 600;
      color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
    }
    p {
      line-height: 1.79;
      color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
    }
    a {
      color: ${({ theme }) => theme['primary-color']};
      font-size: 15px;
      font-weight: 600;
    }
  }
`;

function SampleCardTwo({ item = undefined }) {
  const { content, title, img } = item;
  return (
    <CardWrapper>
      <img src={require(`../../../${img}`)} alt="" />
      <figcaption>
        <h2>{title}</h2>
        <p>{content}</p>
        <Link to="#">Learn More</Link>
      </figcaption>
    </CardWrapper>
  );
}



export default SampleCardTwo;
