import React from 'react';
// import classNames from 'classnames';
import orderBy from 'lodash/orderBy';

import DialogItem from '../DialogItem';

import './Dialogs.scss';

const Dialogs = ({ items, userId }) => (
  //fix message sorting.
  <div className="dialogs">
    {console.log(
      items.slice().sort((a, b) => new Date(b.date) - new Date(a.date)),
    )}
    {orderBy(items, ['created_at'], ['desc']).map((item) => (
      <DialogItem key={item.id} isMe={item.user.id === userId} {...item} />
    ))}
  </div>
);

export default Dialogs;
