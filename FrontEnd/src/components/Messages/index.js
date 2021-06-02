import React from 'react';
import PropTypes from 'prop-types';
import { Empty, Spin } from 'antd';
import classNames from 'classnames';

import { Message } from '../';

import './Messages.scss';

const Messages = ({ blockRef, isLoading, items, user, currentDialog }) => {
  return (
    <div
      ref={blockRef}
      className={classNames('messages', { 'messages--loading': isLoading })}
    >
      {isLoading ? (
        <Spin size="large" tip="Загрузка сообщений..."></Spin>
      ) : items && !isLoading ? (
        items.length > 0 ? (
          items.map((item) => {
            const sender = currentDialog.chatMembers.find(
              (cm) => item.userEmail == cm.email,
            );
            return (
              <Message
                key={item.messagesUUID}
                {...item}
                isMe={user.email == sender.email}
                user={sender}
              />
            );
          })
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Нет сообщений"
          />
        )
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Откройте диалог"
        />
      )}
    </div>
  );
};

Messages.propTypes = {
  items: PropTypes.array,
};

export default Messages;
