import React from 'react';
import { ModalStyled } from './styled';
import { Button } from '../buttons/buttons';

function Modal(props) {
  const { onCancel, className, onOk, visible, title, type, color, footer, width, children } = props;

  return (
    <ModalStyled
      title={title}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      type={color ? type : false}
      width={width}
      className={className}
      footer={
        footer || footer === null
          ? footer
          : [
              <Button type="secondary" key="back" onClick={onCancel}>
                Cancel
              </Button>,
              <Button type={type} key="submit" onClick={onOk}>
                Save Change
              </Button>,
            ]
      }
    >
      {children}
    </ModalStyled>
  );
}



const alertModal = ModalStyled;
export { Modal, alertModal };
