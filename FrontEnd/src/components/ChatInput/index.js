import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import { SmileOutlined, ArrowRightOutlined } from '@ant-design/icons';

import './ChatInput.scss';

const ChatInput = () => (
  <div className="chat-input">
    <div className="chat-input__smile-btn">
      <Button type="link" shape="circle" icon={<SmileOutlined />} />
    </div>
    <Input size="large" placeholder="Введите текст сообщения..."></Input>
    <div className="chat-input__actions">
      <Button type="link" shape="circle" icon={<ArrowRightOutlined />} />
    </div>
  </div>
);

ChatInput.propTypes = {
  className: PropTypes.string,
};

export default ChatInput;
