import { Avatar, Button, UserOptions } from '../index';
import React from 'react';

const ChatInfo = ({
  editMode,
  chatUUID,
  chatName,
  photo,
  value,
  isMe,
  chatMembers = [],
  onNameChange,
  onSelectUser,
  users = [],
  selectedUsers,
  onAddMembers,
  onMemberRemove,
  onAddFile,
  changeChatPhoto,
  onChangeValue,
  onToggleEdit,
}) => {
  return (
    <div>
      {isMe ? <Button onClick={onToggleEdit}>Edit</Button> : null}
      <Avatar user={{ photo, name: chatName, uuid: chatUUID }} />
      {editMode ? (
        <div className={'fileUpload'}>
          <label htmlFor="file">Choose images to upload (PNG, JPG)</label>
          <input
            type="file"
            id={'file'}
            onChange={({ target }) => onAddFile(target.files)}
          />
          <Button onClick={changeChatPhoto}>Submit</Button>
        </div>
      ) : null}
      {editMode ? (
        <input
          onChange={({ target }) => onNameChange(target.value)}
          value={chatName}
        />
      ) : (
        <p>{chatName}</p>
      )}
      {chatMembers.map((cm) => (
        <p key={cm.email}>
          {cm.name}
          {editMode ? (
            <Button
              onClick={() => {
                onMemberRemove(cm.email);
              }}
            >
              Remove
            </Button>
          ) : null}
        </p>
      ))}

      {editMode ? (
        <>
          <input
            value={value}
            onChange={({ target }) => onChangeValue(target.value)}
          />
          <UserOptions
            onSelectUser={onSelectUser}
            users={users}
            selectedUsers={selectedUsers}
          />
          <Button onClick={onAddMembers}>Add Members</Button>
        </>
      ) : null}
    </div>
  );
};
export default ChatInfo;
