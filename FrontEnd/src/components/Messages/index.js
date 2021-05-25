import React from 'react';
import PropTypes from 'prop-types';
import { Empty, Spin } from 'antd';
import classNames from 'classnames';

import { Message } from '../';

import './Messages.scss';

const Messages = ({ blockRef, isLoading, items, user }) => {
  return (
    <div
      ref={blockRef}
      className={classNames('messages', { 'messages--loading': isLoading })}
    >
      {isLoading ? (
        <Spin size="large" tip="Загрузка сообщений..."></Spin>
      ) : items && !isLoading ? (
        items.length > 0 ? (
          items.map((item) => (
            <Message key={item.id} {...item} isMe={user.id === item.user.id} />
          ))
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
