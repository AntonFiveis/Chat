import React, { useEffect, useState } from 'react';
import { ChatInfo as BaseChatInfo } from '../components';
import { connect } from 'react-redux';
import { dialogsActions } from '../redux/actions';
import { chatsApi, userApi } from '../utils/api';
import socket from '../core/socket';
const ChatInfo = ({
  currentDialogId,
  items,
  changeDialogPhoto,
  user,
  setChatMembers,
}) => {
  const currentChatObj = items.find((i) => i.chatUUID === currentDialogId);
  const [editMode, setEditMode] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [name, setName] = useState(currentChatObj.chatName);
  const [value, setValue] = useState('');

  useEffect(() => {
    socket.on('CHAT_EDIT', (res) => {
      changeDialogPhoto(res);
    });
    socket.on('SET_CHAT_MEMBERS', (res) => {
      setChatMembers(res);
    });
  }, []);
  const onToggleEdit = () => {
    setEditMode(!editMode);
  };
  const onAddFile = (file) => {
    console.log(file);
    setPhotoFile(file[0]);
  };
  const changeChatPhoto = async () => {
    console.log(photoFile, currentDialogId);
    await chatsApi.postChatPhoto(photoFile, currentDialogId);
  };
  const onSearch = async (val) => {
    setValue(val);
    const { data: users } = await userApi.findUsersByEmail(val);
    const userIndex = users.findIndex((u) => u.email == user.email);
    users.splice(userIndex, 1);
    setUsers(users);
  };
  const onAddMembers = () => {
    const chatMembersDTO = selectedUsers.map((su) => {
      return { userEmail: su.email, chatUUID: currentDialogId };
    });
    socket.call('ADD_CHAT_MEMBERS', chatMembersDTO);
  };
  const onSelectUser = (selUser) => {
    const index = selectedUsers.findIndex((u) => u.email === selUser.email);
    if (index === -1) {
      setSelectedUsers([...selectedUsers, selUser]);
    } else {
      const selUsers = selectedUsers;
      selUsers.splice(index, 1);
      setSelectedUsers(selUsers);
    }
  };
  const onMemberRemove = (email) => {
    socket.call('REMOVE_CHAT_MEMBER', {
      userEmail: email,
      chatUUID: currentDialogId,
    });
  };
  return (
    <BaseChatInfo
      editMode={editMode}
      {...currentChatObj}
      onToggleEdit={onToggleEdit}
      onSelectUser={onSelectUser}
      onMemberRemove={onMemberRemove}
      onAddMembers={onAddMembers}
      onNameChange={(n) => setName(n)}
      chatName={name}
      onAddFile={onAddFile}
      changeChatPhoto={changeChatPhoto}
      isMe={user.email === currentChatObj.ownerEmail}
      value={value}
      onChangeValue={onSearch}
      users={users}
      selectedUsers={selectedUsers}
    />
  );
};

export default connect(
  ({ dialogs, user }) => ({
    currentDialogId: dialogs.currentDialogId,
    items: dialogs.items,
    user: user.data,
  }),
  dialogsActions,
)(ChatInfo);
