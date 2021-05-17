import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Emoji } from 'emoji-mart';

import { Time, Avatar } from '../';

import './Message.scss';

const Message = ({ user, text, date, isMe }) => {
  return (
    <div className={classNames('message', { 'message--isme': isMe })}>
      <div className="message__content">
        <div className="message__avatar">
          <Avatar user={user} />
        </div>
        <div className="message__info">
          <div className="message__bubble">
            <p className="message__text">
              {text}
              <Emoji set="apple" emoji={text} size={16} />
            </p>
          </div>
          <span className="message__date">{<Time date={date} />}</span>
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
