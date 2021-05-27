import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { dialogsActions } from '../redux/actions';
import socket from '../core/socket';

import { Dialogs as BaseDialogs } from '../components';

const Dialogs = ({
  fetchDialogs,
  currentDialogId,
  setCurrentDialogId,
  items,
  userId,
}) => {
  const [inputValue, setValue] = useState('');
  const [filtred, setFiltredItems] = useState(Array.from(items));

  const onChangeInput = (value = '') => {
    console.log('value before', value);
    setFiltredItems(
      items.filter(
        (dialog) =>
          dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) >=
            0 ||
          dialog.parnter.fullname.toLowerCase().indexOf(value.toLowerCase()) >=
            0,
      ),
    );
    setValue(value);
  };

  const onNewDialog = () => {
    fetchDialogs();
  };

  useEffect(() => {
    if (items.length) {
      onChangeInput('');
    }
  }, [items]);

  useEffect(() => {
    if (!items.length) {
      fetchDialogs();
    } else {
      setFiltredItems(items);
    }
    // eslint-disable-next-line no-unused-vars
    socket.on('SERVER:DIALOG_CREATED', onNewDialog);

    return () => socket.removeListener('SERVER:DIALOG_CREATED', onNewDialog);
  }, []);

  return (
    <BaseDialogs
      userId={userId}
      items={filtred}
      onSearch={onChangeInput}
      inputValue={inputValue}
      onSelectDialog={setCurrentDialogId}
      currentDialogId={currentDialogId}
    />
  );
};

export default connect(({ dialogs }) => dialogs, dialogsActions)(Dialogs);
