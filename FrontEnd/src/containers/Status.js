import React, { useState } from 'react';
import { Status as BaseStatus } from '../components';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { ChatInfo } from './index';
const Status = ({ currentDialogId, user, dialogs }) => {
  const [showModal, setShowModal] = useState(false);
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
  const toggleShowModal = () => {
    console.log(showModal);
    setShowModal(!showModal);
  };
  if (currentDialogObj.isGroup)
    return (
      <>
        <Modal
          title={'Chat Info'}
          visible={showModal}
          onCancel={toggleShowModal}
          onOk={toggleShowModal}
        >
          <ChatInfo />
        </Modal>
        <BaseStatus
          // online={false}
          onClick={toggleShowModal}
          fullname={currentDialogObj.chatName}
        />
      </>
    );
  else
    return (
      <>
        <Modal
          title={'Chat Info'}
          visible={showModal}
          onCancel={toggleShowModal}
          onOk={toggleShowModal}
        >
          <ChatInfo />
        </Modal>
        <BaseStatus
          onClick={toggleShowModal}
          fullname={currentDialogObj.chatMembers.find(
            (u) => u.email != user.email,
          )}
        />
      </>
    );
};

export default connect(({ dialogs, user }) => ({
  dialogs: dialogs.items,
  currentDialogId: dialogs.currentDialogId,
  user: user.data,
}))(Status);
