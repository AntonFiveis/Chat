import React from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from 'date-fns/locale/ru';
import classNames from 'classnames';

import './Message.scss';

const Message = ({ avatar, user, text, date, isMe }) => {
  return (
    <div className={classNames('message', { 'message--isme': isMe })}>
      <div className="message__content">
        <div className="message__avatar">
          <img src={avatar} alt={`Avatar ${user.fullname}`}></img>
        </div>
        <div className="message__info">
          <div className="message__bubble">
            <p className="message__text">{text}</p>
          </div>
          <span className="message__date">
            {formatDistanceToNow(new Date(date), {
              addSuffix: true,
              locale: ruLocale,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

Message.defaultProps = {
  user: {},
};

Message.propTypes = {
  avatar: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  user: PropTypes.object,
  isTyping: PropTypes.bool,
  isMe: PropTypes.bool,
};

export default Message;
