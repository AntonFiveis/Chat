/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userApi } from '../utils/api';
import socket from '../core/socket';
import { Sidebar } from '../components';

const SidebarContainer = ({ user }) => {
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messageText, setMessageText] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const onClose = () => {
    setVisible(false);
  };

  const onShow = () => {
    setVisible(true);
  };

  const onSearch = async (value) => {
    setIsLoading(true);
    const { data } = await userApi.findUsersByEmail(value);
    // .then(({ data }) => {
    //   console.log(data);
    //   setUsers(data);
    //   console.log(users);
    //   setIsLoading(false);
    // })
    // .catch(() => {
    //   setUsers([]);
    //   setIsLoading(true);
    // });
    const index = data.findIndex((u) => u.email == user.email);
    if (index !== -1) data.splice(index, 1);
    setUsers(data);
    setIsLoading(false);
  };

  const onAddDialog = () => {
    console.log('createDialog');
    const usersEmails = selectedUsers.map((us) => us.email);
    socket
      .call('ADD_CHAT', {
        chatName: 'New Chat',
        isGroup: true,
        users: [...usersEmails, user.email],
      })
      .then((res) => {
        if (res.ok) onClose();
        else setIsLoading(false);
      });
    // chatsApi
    //   .create({
    //     partner: selectedUserId,
    //     text: messageText,
    //   })
    //   .then(onClose)
    //   .catch(() => {
    //     setIsLoading(false);
    //   });
  };

  const handleChangeInput = async (value) => {
    setInputValue(value.target.value);
    await onSearch(value.target.value);
  };

  const onChangeTextArea = (e) => {
    setMessageText(e.target.value);
  };

  const onSelectUser = (selUser) => {
    const index = selectedUsers.findIndex((u) => u.email === selUser.email);
    if (index === -1) {
      setSelectedUsers([...selectedUsers, selUser]);
    } else {
      const selUsers = selectedUsers;
      selUsers.splice(index, 1);
      console.log(selUsers);
      setSelectedUsers(selUsers);
    }
  };

  return (
    <Sidebar
      user={user}
      inputValue={inputValue}
      visible={visible}
      isLoading={isLoading}
      onClose={onClose}
      onShow={onShow}
      onSearch={onSearch}
      onChangeInput={handleChangeInput}
      onSelectUser={onSelectUser}
      onModalOk={onAddDialog}
      onChangeTextArea={onChangeTextArea}
      messageText={messageText}
      selectedUsers={selectedUsers}
      users={users}
    />
  );
};

export default connect(({ user }) => ({ user: user.data }))(SidebarContainer);
