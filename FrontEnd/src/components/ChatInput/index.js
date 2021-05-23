/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import { SmileOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Picker } from 'emoji-mart';

import './ChatInput.scss';

const ChatInput = (props) => {
  const [value, setValue] = useState('');
  const [emojiPickerVisible, setShowEmojiPicker] = useState('');
  const { onSendMessage, currentDialogId } = props;

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!emojiPickerVisible);
  };

  const handleSendMessage = (e) => {
    if (e.key === 'Enter') {
      console.log(value, currentDialogId);
      onSendMessage(value, currentDialogId);
      setValue('');
    }
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
      <Input
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={handleSendMessage}
        size="large"
        placeholder="Введите текст сообщения..."
        value={value}
      />
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
