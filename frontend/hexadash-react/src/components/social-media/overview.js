import React from 'react';
import FontAwesome from 'react-fontawesome';
import { MainWraper, SocialIcon } from './overview-style';
import Heading from '../heading/heading';

function SocialMediaContent(props) {
  const { icon, bgColor, title, subTitle } = props;
  return (
    <MainWraper>
      <SocialIcon className="social-icon" bgColor={bgColor}>
        <FontAwesome
          className="super-crazy-colors"
          name={icon}
          size="2x"
          style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
        />
      </SocialIcon>
      <Heading as="h1">{title}</Heading>
      <p>{subTitle}</p>
    </MainWraper>
  );
}


export { SocialMediaContent };
