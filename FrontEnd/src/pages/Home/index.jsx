import React from 'react';
import Dialogs from '../../components/Dialogs';

import './Home.scss';

const Home = () => {
  return (
    <section className="home">
      <Dialogs
        userId={5}
        items={[
          {
            id: '3n6bd63094042bbgh538fhg423r0fj',
            text: 'Hello, my dear friend! What`s going on?',
            isReaded: false,
            created_at: 'Sun Apr 01 2021 00:08:44 GMT+0300',
            user: {
              id: 'huygvt4578t62f37rgf989g5btr293',
              isOnline: true,
              fullname: 'Dima Dinohin',
              avatar:
                'https://icdn.lenta.ru/images/2021/04/20/13/20210420131617276/square_320_67b6d5074ed9779b672eaa743976f83b.jpg',
            },
          },
          {
            id: 'vvw554rfnui4vtrt87vebf839',
            text: 'Hello, my dear friend!',
            isReaded: false,
            created_at: 'Thu Apr 28 2021 00:08:44 GMT+0300',
            user: {
              id: '3n6bd63094042bbgh538fhg423r0fj',
              fullname: 'Vova Durik',
              avatar: null,
            },
          },
          {
            id: 'huygvt4578t62f37rgf989g5btr293',
            text: 'vewrbtbewcefregvcwe',
            isReaded: false,
            created_at: 'Thu Apr 30 2021 00:08:44 GMT+0300',
            user: {
              id: 'vvw554rfnui4vtrt87vebf839',
              fullname: 'Dima Noskov',
              avatar:
                'https://icdn.lenta.ru/images/2021/04/20/13/20210420131617276/square_320_67b6d5074ed9779b672eaa743976f83b.jpg',
            },
          },
        ]}
      />
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
