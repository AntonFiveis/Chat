import React from 'react';
import PropTypes from 'prop-types';
import { Empty } from 'antd';

import { Message } from '../';

const Messages = ({ items }) => {
  return items ? (
    <div>
      <Message
        avatar="https://avatars.githubusercontent.com/u/77641899?v=4"
        text="hello! What's up?"
        date="Sun Apr 21 2019 21:30:07"
        isMe={false}
      />
      <Message
        avatar="https://avatars.githubusercontent.com/u/77641899?v=4"
        text="hello!"
        date="Sun Apr 21 2019 21:35:07"
        isMe={true}
      />
      <Message
        avatar="https://avatars.githubusercontent.com/u/77641899?v=4"
        text="hello!"
        date="Sun Apr 21 2019 21:35:07"
        isMe={false}
      />
      <Message
        avatar="https://avatars.githubusercontent.com/u/77641899?v=4"
        text="hello!"
        date="Sun Apr 21 2019 21:35:07"
        isMe={true}
      />
      <Message
        avatar="https://avatars.githubusercontent.com/u/77641899?v=4"
        text="hello! What's up?"
        date="Sun Apr 21 2019 21:30:07"
        isMe={false}
      />
      <Message
        avatar="https://avatars.githubusercontent.com/u/77641899?v=4"
        text="hello!"
        date="Sun Apr 21 2019 21:35:07"
        isMe={true}
      />
      <Message
        avatar="https://avatars.githubusercontent.com/u/77641899?v=4"
        text="hello!"
        date="Sun Apr 21 2019 21:35:07"
        isMe={false}
      />
      <Message
        avatar="https://avatars.githubusercontent.com/u/77641899?v=4"
        text="hello!"
        date="Sun Apr 21 2019 21:35:07"
        isMe={true}
      />
      <Message
        avatar="https://avatars.githubusercontent.com/u/77641899?v=4"
        text="hello! What's up?"
        date="Sun Apr 21 2019 21:30:07"
        isMe={false}
      />
      <Message
        avatar="https://avatars.githubusercontent.com/u/77641899?v=4"
        text="hello!"
        date="Sun Apr 21 2019 21:35:07"
        isMe={true}
      />
      <Message
        avatar="https://avatars.githubusercontent.com/u/77641899?v=4"
        text="hello!"
        date="Sun Apr 21 2019 21:35:07"
        isMe={false}
      />
      <Message
        avatar="https://avatars.githubusercontent.com/u/77641899?v=4"
        text="hello!"
        date="Sun Apr 21 2019 21:35:07"
        isMe={true}
      />
    </div>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет сообщений" />
  );
};

Messages.propTypes = {
  items: PropTypes.array,
};

export default Messages;
