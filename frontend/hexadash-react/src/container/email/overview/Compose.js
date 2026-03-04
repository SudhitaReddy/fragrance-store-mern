import React, { useState } from 'react';
import UilTimes from '@iconscout/react-unicons/icons/uil-times';
import UilExpandAlt from '@iconscout/react-unicons/icons/uil-expand-alt';
import MDEditor from '@uiw/react-md-editor';
import { Input } from 'antd';
import { MailBox } from './style';
import MailComposer from './MailComposer';

function Compose({ close = undefined }) {
  const [state, setState] = useState({
    value: '',
    tags: [],
    size: 'small',
  });

  const onChange = (value) => {
    setState({ ...state, value });
  };

  const toggleSize = () => {
    return setState({
      ...state,
      size: state.size === 'small' ? 'big' : 'small',
    });
  };

  const onMailSend = async () => {
    // hit the mail sender api
  };

  return (
    <MailBox size={state.size}>
      <div className="header">
        <p>New Message</p>
        <div className="icon-right">
          <UilExpandAlt onClick={toggleSize} />
          <UilTimes onClick={close} />
        </div>
      </div>

      <div className="body">
        <div className="group">
          <Input placeholder="Subject" type="text" />
        </div>
        <MailComposer onSend={onMailSend} onChange={onChange} />
      </div>
    </MailBox>
  );
}



export default Compose;
