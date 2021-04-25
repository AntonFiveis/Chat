import React from 'react';

import Message from '../../components/Message';

import './Home.scss';

const Home = () => {
  return (
    <section className="home">
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
    </section>
  );
};

export default Home;
