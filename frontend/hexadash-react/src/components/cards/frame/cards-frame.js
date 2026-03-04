import UilellipsisH from '@iconscout/react-unicons/icons/uil-ellipsis-h';
import React from 'react';
import { Link } from 'react-router-dom';
import { CardFrame } from './style';
import { Dropdown } from '../../dropdown/dropdown';
import Heading from '../../heading/heading';

function Cards({
  title,
  children,
  more,
  moreText,
  size,
  headless,
  caption,
  isbutton,
  bodyStyle,
  headStyle,
  border = false,
  bodypadding,
  className,
}) {
  return (
    <>
      {!headless ? (
        <CardFrame
          size={size}
          title={title}
          styles={{
            body: bodyStyle && bodyStyle,
            header: headStyle && headStyle,
          }}
          variant={border ? 'outlined' : 'borderless'}
          className={className}
          bodypadding={bodypadding && bodypadding}
          extra={
            <>
              {more && (
                <Dropdown content={more} placement="bottom">
                  <Link onClick={(e) => e.preventDefault()} to="#">
                    {!moreText ? <UilellipsisH /> : 'More'}
                  </Link>
                </Dropdown>
              )}

              {isbutton && isbutton}
            </>
          }
          style={{ width: '100%' }}
        >
          {children}
        </CardFrame>
      ) : (
        <CardFrame
          bodypadding={bodypadding && bodypadding}
          styles={{ body: bodyStyle && bodyStyle }}
          size={size}
          style={{ width: '100%' }}
          variant={border ? 'outlined' : 'borderless'}
          className={className}
        >
          {title && <Heading as="h4">{title}</Heading>}
          {caption && <p>{caption}</p>}
          {children}
        </CardFrame>
      )}
    </>
  );
}


export { Cards };
