import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import { SmileOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Picker } from 'emoji-mart';

import './ChatInput.scss';

const ChatInput = () => {
  const [emojiPickerVisible, setShowEmojiPicker] = useState('');

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!emojiPickerVisible);
  };

  return (
    <div className="chat-input">
      <div className="chat-input__smile-btn">
        {emojiPickerVisible && (
          <div className="chat-input__emoji-picker">
            <Picker set="apple" />
          </div>
        )}
        <Button
          onClick={toggleEmojiPicker}
          type="link"
          shape="circle"
          icon={<SmileOutlined />}
        />
      </div>
      <Input size="large" placeholder="Введите текст сообщения..."></Input>
      <div className="chat-input__actions">
        <Button type="link" shape="circle" icon={<ArrowRightOutlined />} />
      </div>
    </div>
  );
};

ChatInput.propTypes = {
  className: PropTypes.string,
};

export default ChatInput;
