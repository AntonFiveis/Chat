import React from 'react';
import {
  TeamOutlined,
  FormOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';

import { Input, Button } from 'antd';
import { ChatInput, Dialogs, Message, Status } from '../../components';

import './Home.scss';

const Home = () => {
  return (
    <section className="home">
      <div className="chat">
        <div className="chat__sidebar">
          <div className="chat__sidebar-header">
            <div>
              <Button type="link" shape="circle" icon={<TeamOutlined />} />
              <span>Список диалогов</span>
            </div>
            <Button type="link" shape="circle" icon={<FormOutlined />} />
          </div>
          <div className="chat__sidebar-search">
            <Input.Search
              placeholder="Поиск среди контактов"
              onSearch={(value) => console.log(value)}
            />
          </div>
          <div className="chat__sidebar-dialogs">
            <Dialogs
              userId={5}
              items={[
                {
                  id: '60905a3d58e855a2999b37a1',
                  text:
                    'Fugiat quis commodo proident officia irure non ullamco excepteur. Quis amet dolor do qui ea veniam cillum id fugiat ullamco dolor proident. Aute culpa qui est enim culpa officia Lorem sint ipsum excepteur excepteur excepteur dolore.',
                  created_at: 'Sat Mar 07 1981 23:21:39 GMT+0000 (UTC)',
                  user: {
                    id: '60905a3d9c55366e017ed000',
                    fullname: 'Christy Dominguez',
                    avatar: null,
                  },
                },
                {
                  id: '60905a3d70fff30fd2181bba',
                  text:
                    'Duis est esse aliqua nulla. Est proident esse cupidatat occaecat et incididunt. Ullamco deserunt ullamco aliqua ut.',
                  created_at: 'Thu Jul 21 1994 02:00:20 GMT+0000 (UTC)',
                  user: {
                    id: '60905a3db24a6958ce884fbb',
                    fullname: 'Benton Browning',
                    avatar: null,
                  },
                },
                {
                  id: '60905a3df36757795f9014d8',
                  text:
                    'Veniam sunt amet minim qui dolor ipsum esse proident tempor quis consectetur nostrud sit in. Ut et sit ea culpa anim dolor in incididunt. Pariatur fugiat do veniam consequat laboris eiusmod consectetur id exercitation nostrud eiusmod nulla enim.',
                  created_at: 'Fri Sep 04 2009 19:13:30 GMT+0000 (UTC)',
                  user: {
                    id: '60905a3d7896f449fa8ad431',
                    fullname: 'Ofelia Burns',
                    avatar: null,
                  },
                },
                {
                  id: '60905a3d6a7481de2e9e0a47',
                  text:
                    'Veniam culpa consectetur magna culpa magna voluptate ut. Duis non nulla sunt nulla ad aliqua non dolore est esse eu. Est ullamco ut Lorem duis reprehenderit ad pariatur cillum quis officia cillum.',
                  created_at: 'Thu Jan 01 2004 01:39:09 GMT+0000 (UTC)',
                  user: {
                    id: '60905a3d28348e08219e1d8b',
                    fullname: 'Ella Hines',
                    avatar: null,
                  },
                },
                {
                  id: '60905a3dd9f02bff3fdf02cb',
                  text:
                    'Ullamco culpa laborum consectetur sunt nostrud sit fugiat voluptate incididunt magna cillum culpa. Pariatur minim in consectetur quis elit. Et magna sunt quis culpa occaecat amet Lorem fugiat.',
                  created_at: 'Sun Sep 27 2009 02:50:19 GMT+0000 (UTC)',
                  user: {
                    id: '60905a3daf912e999a136cfa',
                    fullname: 'Gertrude Lowery',
                    avatar: null,
                  },
                },
                {
                  id: '60905a3d429916c8e0d59c05',
                  text:
                    'Laborum culpa do aliquip laboris. Laboris est nostrud ipsum culpa elit officia. Quis ad dolore aute est mollit enim velit.',
                  created_at: 'Wed Apr 16 1986 16:49:45 GMT+0000 (UTC)',
                  user: {
                    id: '60905a3d8494f93f71a95aa2',
                    fullname: 'Mullins Boone',
                    avatar: null,
                  },
                },
                {
                  id: '60905a3d97398672d0d95fba',
                  text:
                    'Labore minim cupidatat exercitation irure minim enim deserunt laboris est. Mollit minim quis aliqua Lorem aliqua et laborum id. Proident in proident aute reprehenderit sit irure.',
                  created_at: 'Sat Dec 26 2009 12:44:10 GMT+0000 (UTC)',
                  user: {
                    id: '60905a3d2fd6f7e54a87f9c1',
                    fullname: 'Jacobson Adkins',
                    avatar: null,
                  },
                },
                {
                  id: '60905a3db11280ad46ac96cf',
                  text:
                    'Consectetur mollit consectetur ipsum et dolore sunt sit officia excepteur occaecat. Labore commodo cillum fugiat dolore id consectetur. Ut proident excepteur minim est aute nisi anim nulla proident veniam incididunt deserunt ea.',
                  created_at: 'Tue Apr 09 1974 05:11:03 GMT+0000 (UTC)',
                  user: {
                    id: '60905a3d24a9fe877f73c3c3',
                    fullname: 'Francisca Murray',
                    avatar: null,
                  },
                },
                {
                  id: '60905a3d58e855a2999b37a1',
                  text:
                    'Fugiat quis commodo proident officia irure non ullamco excepteur. Quis amet dolor do qui ea veniam cillum id fugiat ullamco dolor proident. Aute culpa qui est enim culpa officia Lorem sint ipsum excepteur excepteur excepteur dolore.',
                  created_at: 'Sat Mar 07 1981 23:21:39 GMT+0000 (UTC)',
                  user: {
                    id: '60905a3d9c55366e017ed000',
                    fullname: 'Christy Dominguez',
                    avatar: null,
                  },
                },
                {
                  id: '60905a3d70fff30fd2181bba',
                  text:
                    'Duis est esse aliqua nulla. Est proident esse cupidatat occaecat et incididunt. Ullamco deserunt ullamco aliqua ut.',
                  created_at: 'Thu Jul 21 1994 02:00:20 GMT+0000 (UTC)',
                  user: {
                    id: '60905a3db24a6958ce884fbb',
                    fullname: 'Benton Browning',
                    avatar: null,
                  },
                },
                {
                  id: '60905a3df36757795f9014d8',
                  text:
                    'Veniam sunt amet minim qui dolor ipsum esse proident tempor quis consectetur nostrud sit in. Ut et sit ea culpa anim dolor in incididunt. Pariatur fugiat do veniam consequat laboris eiusmod consectetur id exercitation nostrud eiusmod nulla enim.',
                  created_at: 'Fri Sep 04 2009 19:13:30 GMT+0000 (UTC)',
                  user: {
                    id: '60905a3d7896f449fa8ad431',
                    fullname: 'Ofelia Burns',
                    avatar: null,
                  },
                },
                {
                  id: '60905a3d6a7481de2e9e0a47',
                  text:
                    'Veniam culpa consectetur magna culpa magna voluptate ut. Duis non nulla sunt nulla ad aliqua non dolore est esse eu. Est ullamco ut Lorem duis reprehenderit ad pariatur cillum quis officia cillum.',
                  created_at: 'Thu Jan 01 2004 01:39:09 GMT+0000 (UTC)',
                  user: {
                    id: '60905a3d28348e08219e1d8b',
                    fullname: 'Ella Hines',
                    avatar: null,
                  },
                },
                {
                  id: '60905a3dd9f02bff3fdf02cb',
                  text:
                    'Ullamco culpa laborum consectetur sunt nostrud sit fugiat voluptate incididunt magna cillum culpa. Pariatur minim in consectetur quis elit. Et magna sunt quis culpa occaecat amet Lorem fugiat.',
                  created_at: 'Sun Sep 27 2009 02:50:19 GMT+0000 (UTC)',
                  user: {
                    id: '60905a3daf912e999a136cfa',
                    fullname: 'Gertrude Lowery',
                    avatar: null,
                  },
                },
                {
                  id: '60905a3d429916c8e0d59c05',
                  text:
                    'Laborum culpa do aliquip laboris. Laboris est nostrud ipsum culpa elit officia. Quis ad dolore aute est mollit enim velit.',
                  created_at: 'Wed Apr 16 1986 16:49:45 GMT+0000 (UTC)',
                  user: {
                    id: '60905a3d8494f93f71a95aa2',
                    fullname: 'Mullins Boone',
                    avatar: null,
                  },
                },
                {
                  id: '60905a3d97398672d0d95fba',
                  text:
                    'Labore minim cupidatat exercitation irure minim enim deserunt laboris est. Mollit minim quis aliqua Lorem aliqua et laborum id. Proident in proident aute reprehenderit sit irure.',
                  created_at: 'Sat Dec 26 2009 12:44:10 GMT+0000 (UTC)',
                  user: {
                    id: '60905a3d2fd6f7e54a87f9c1',
                    fullname: 'Jacobson Adkins',
                    avatar: null,
                  },
                },
                {
                  id: '60905a3db11280ad46ac96cf',
                  text:
                    'Consectetur mollit consectetur ipsum et dolore sunt sit officia excepteur occaecat. Labore commodo cillum fugiat dolore id consectetur. Ut proident excepteur minim est aute nisi anim nulla proident veniam incididunt deserunt ea.',
                  created_at: 'Tue Apr 09 1974 05:11:03 GMT+0000 (UTC)',
                  user: {
                    id: '60905a3d24a9fe877f73c3c3',
                    fullname: 'Francisca Murray',
                    avatar: null,
                  },
                },
              ]}
            />
          </div>
        </div>
        <div className="chat__dialog">
          <div className="chat__dialog-header">
            <div />
            <div className="chat__dialog-header-center">
              <b className="chat__dialog-header-username">Гай Юлий Цезарь</b>
              <div className="chat__dialog-header-status">
                <Status online />
              </div>
            </div>
            <Button type="link" shape="circle" icon={<EllipsisOutlined />} />
          </div>
          <div className="chat__dialog-messages">
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
          <div className="chat__dialog-input">
            <ChatInput />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
