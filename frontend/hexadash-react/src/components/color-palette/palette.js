import React from 'react';
import { ColorPalette } from './style';

function Palette(props) {
  const { colorCode, bordered, content, bg, gradient, direction, children } = props;

  return (
    <>
      <ColorPalette
        isgrad={gradient}
        direction={direction}
        isbg={bg}
        iscontent={content}
        isbordered={bordered}
        type={colorCode}
      >
        <span>{children}</span> {content && <span>{!gradient ? colorCode : colorCode[1]}</span>}
      </ColorPalette>
      {!content && colorCode}
    </>
  );
}


export default Palette;
