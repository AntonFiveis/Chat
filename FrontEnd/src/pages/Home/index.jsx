import React from 'react';

import DialogItem from '../../components/DialogItem';

import './Home.scss';

const Home = () => {
  return (
    <section className="home">
      <div className="dialogs">
        <DialogItem
          user={{
            fullname: 'Федор Достоевский',
            isOnline: true,
          }}
          unread={200}
        />
        <DialogItem
          user={{
            fullname: 'Дмитрий Грушевский',
            isOnline: false,
          }}
          unread={5}
        />
      </div>
      {/* <Dialogs
        items={[
          {
            user: {
              fullname: 'Dima Dinohin',
              avatar: null,
            },
            message: {
              text: 'Hello, my dear friend! What`s going on?',
              isReaded: false,
              updated_at: new Date()
            }
          },
        ]}
      /> */}
      {/* <Message
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
      /> */}
    </section>
  );
};

export default Home;
