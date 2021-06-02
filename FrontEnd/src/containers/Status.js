import React from 'react';
import { Status as BaseStatus } from '../components';
import { connect } from 'react-redux';

const Status = ({ currentDialogId, user, dialogs }) => {
  if (!dialogs.length || !currentDialogId) {
    return null;
  }
  const currentDialogObj = dialogs.find(
    (dialog) => dialog.chatUUID === currentDialogId,
  );
  console.log(user);
  // let partner = false;
  //
  // if (currentDialogObj.ownerEmail === user.email) {
  //   partner = currentDialogObj.partner;
  // } else {
  //   partner = currentDialogObj.author;
  // }
  if (currentDialogObj.isGroup)
    return (
      <BaseStatus
        // online={false}
        fullname={currentDialogObj.chatName}
      />
    );
  else
    return (
      <BaseStatus
        fullname={currentDialogObj.chatMembers.find(
          (u) => u.email != user.email,
        )}
      />
    );
};

export default connect(({ dialogs, user }) => ({
  dialogs: dialogs.items,
  currentDialogId: dialogs.currentDialogId,
  user: user.data,
}))(Status);
