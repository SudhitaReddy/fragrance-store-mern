import { Radio } from 'antd';
import React, { useState } from 'react';
import { DrawerStyle } from './style';
import { Button } from '../buttons/buttons';

const RadioGroup = Radio.Group;

function Drawer(props) {
  const { width, title, placement, children, customPlacement, render, childDrawer, childTitle, btnText = 'Open Drawer' } = props;
  const [state, setState] = useState({
    open: false,
    placement: placement || 'right',
    childrenDrawer: false,
  });

  const showDrawer = () => {
    setState({
      ...state,
      open: true,
    });
  };

  const onClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  const onChange = (e) => {
    setState({
      ...state,
      placement: e.target.value,
    });
  };

  const showChildrenDrawer = () => {
    setState({
      ...state,
      childrenDrawer: true,
    });
  };

  const onChildrenDrawerClose = () => {
    setState({
      ...state,
      childrenDrawer: false,
    });
  };

  return (
    <>
      {customPlacement && (
        <RadioGroup style={{ marginRight: 8 }} defaultValue={placement} onChange={onChange}>
          <Radio value="top">top</Radio>
          <Radio value="right">right</Radio>
          <Radio value="bottom">bottom</Radio>
          <Radio value="left">left</Radio>
        </RadioGroup>
      )}

      {render && <p>Render in this</p>}
      <Button type="primary" size="default" onClick={showDrawer} raised>
        {btnText}
      </Button>
      <DrawerStyle
        title={title}
        placement={state.placement}
        closable={false}
        onClose={onClose}
        open={state.open}
        getContainer={false}
        rootStyle={{ position: !render ? 'fixed' : 'absolute' }}
        width={width}
      >
        {!childDrawer ? (
          children
        ) : (
          <>
            <Button type="primary" onClick={showChildrenDrawer}>
              Two-level drawer
            </Button>

            <DrawerStyle
              title={childTitle}
              width={width}
              closable={false}
              onClose={onChildrenDrawerClose}
              open={state.childrenDrawer}
            >
              {childDrawer}
            </DrawerStyle>
            {children}

            <div
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e8e8e8',
                padding: '10px 16px',
                textAlign: 'right',
                left: 0,
                background: '#fff',
                borderRadius: '0 0 4px 4px',
              }}
            >
              <Button
                style={{
                  marginRight: 8,
                }}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button onClick={onClose} type="primary">
                Submit
              </Button>
            </div>
          </>
        )}
      </DrawerStyle>
    </>
  );
}



export { Drawer };
