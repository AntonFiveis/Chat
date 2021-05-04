import React from 'react';
import classNames from 'classnames';
import { IconReaded, Avatar } from '../';
import { format, isToday } from 'date-fns';

const getMessageTime = (createdAt) => {
  if (isToday(new Date(createdAt))) {
    return format(new Date(createdAt), 'HH:mm');
  } else {
    return format(new Date(createdAt), 'dd.MM.yyyy');
  }
};

const DialogItem = ({ user, created_at, text, unread, isMe }) => (
  <div
    className={classNames('dialogs__item', {
      'dialogs__item--online': user.isOnline,
    })}
  >
    <div className="dialogs__item-avatar">
      <Avatar user={user} />
    </div>
    <div className="dialogs__item-info">
      <div className="dialogs__item-info-top">
        <b>{user.fullname}</b>
        <span>{getMessageTime(created_at)}</span>
      </div>
      <div className="dialogs__item-info-bottom">
        <p>{text}</p>
        {isMe && <IconReaded isMe={true} isReaded={true} />}
        {unread > 0 && (
          <div className="dialogs__item-info-bottom-count">
            {unread > 9 ? '+9' : unread}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default DialogItem;
