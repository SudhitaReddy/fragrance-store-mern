// import UilBriefcaseAlt from '@iconscout/react-unicons/icons/uil-briefcase-alt';
// import UilAward from '@iconscout/react-unicons/icons/uil-award';
import * as Unicons from '@iconscout/react-unicons';
import React, { memo, useMemo } from 'react';
import { InfoCardStyle } from './Style';

// Memoized InfoCard component for better performance
const InfoCard = memo(function InfoCard({
  icon = 'briefcase',
  text = 'Total Products',
  counter = '21k',
  type = 'primary',
  ...props
}) {
  const IconTag = useMemo(() => {
    return Unicons[icon] || Unicons.UilQuestionCircle;
  }, [icon]);

  return (
    <InfoCardStyle type={type} {...props}>
      <span className="ninjadash-infocard-icon" aria-hidden="true">
        <IconTag />
      </span>
      <p className="ninjadash-infocard-text">{text}</p>
      <h2 className="ninjadash-infocard-label" aria-label={`${counter} ${text}`}>
        {counter}
      </h2>
    </InfoCardStyle>
  );
});


export default InfoCard;
