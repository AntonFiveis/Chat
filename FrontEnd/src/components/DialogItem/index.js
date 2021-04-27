import React from 'react';
import classNames from 'classnames';
import { IconReaded } from '../';

import './DialogItem.scss';

const getAvatar = (avatar) => {
  if (avatar) {
    return <img src={avatar} alt="avatar" />;
  } else {
    //make avatar
  }
};

const DialogItem = ({ user, unread }) => (
  <div
    className={classNames('dialogs__item', {
      'dialogs__item--online': user.isOnline,
    })}
  >
    <div className="dialogs__item-avatar">
      {/* <img src={user.avatar} alt={`${user.fullname} avatar`} /> */}
      {getAvatar('https://avatars.githubusercontent.com/u/77641899?v=4')}
    </div>
    <div className="dialogs__item-info">
      <div className="dialogs__item-info-top">
        <b>{user.fullname}</b>
        <span>
          {/* <Time date={new Date()} /> */}
          13:03
        </span>
      </div>
      <div className="dialogs__item-info-bottom">
        <p>
          Мы все свидетельствуем aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ...
        </p>
        <IconReaded isMe={true} isReaded={true} />
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
