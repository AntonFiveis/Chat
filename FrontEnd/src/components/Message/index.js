/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import reactStringReplace from 'react-string-replace';
import { Emoji } from 'emoji-mart';
import { Time, Avatar } from '../';

import './Message.scss';
import { set } from 'date-fns';

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
              {reactStringReplace(text, /:(.+?):/g, (match, i) => (
                <Emoji emoji={match} set="apple" size={16} />
              ))}
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
