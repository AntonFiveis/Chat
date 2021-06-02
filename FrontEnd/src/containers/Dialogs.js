import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { dialogsActions } from '../redux/actions';
import socket from '../core/socket';

import { Dialogs as BaseDialogs } from '../components';

const Dialogs = ({
  addMessageToDialog,
  setDialogs,
  currentDialogId,
  setCurrentDialogId,
  addDialog,
  items,
  userEmail,
}) => {
  const [inputValue, setValue] = useState('');
  const [filtred, setFiltredItems] = useState(items);

  const onChangeInput = (value = '') => {
    setFiltredItems(
      items.filter(
        (dialog) =>
          dialog.chatName.toLowerCase().indexOf(value.toLowerCase()) >= 0,
      ),
    );
    setValue(value);
  };

  useEffect(() => {
    if (items.length) {
      onChangeInput('');
    }
  }, [items]);

  useEffect(() => {
    socket.on('ADD_CHAT', (res) => {
      addDialog(res);
      setFiltredItems([...filtred, res]);
    });
    socket.on('CONNECT', (res) => setDialogs(res.chats));
    socket.on('ADD_MESSAGE', (res) => addMessageToDialog(res));
    return () => {
      socket.removeListener('ADD_CHAT');
      socket.removeListener('CONNECT');
      socket.removeListener('ADD_MESSAGE');
    };
  }, []);

  return (
    <BaseDialogs
      userEmail={userEmail}
      items={filtred}
      onSearch={onChangeInput}
      inputValue={inputValue}
      onSelectDialog={setCurrentDialogId}
      currentDialogId={currentDialogId}
    />
  );
};

export default connect(
  ({ dialogs }) => ({
    dialogs: dialogs,
    items: dialogs.items,
  }),
  dialogsActions,
)(Dialogs);
