import React from 'react';
import { Status as BaseStatus } from '../components';
import { connect } from 'react-redux';

const Status = ({ currentDialogId, user, dialogs }) => {
  if (!dialogs.length || !currentDialogId) {
    return null;
  }
  const currentDialigObj = dialogs.filter(
    (dialog) => dialog.id === currentDialogId,
  )[0];
  let partner = false;

  if (currentDialigObj.author.id === user.id) {
    partner = currentDialigObj.partner;
  } else {
    partner = currentDialigObj.author;
  }

  return <BaseStatus online={partner.isOnline} fullname={partner.fullname} />;
};

export default connect(({ dialogs, user }) => ({
  dialogs: dialogs.items,
  currentDialogId: dialogs.currentDialogId,
  user: user.data,
}))(Status);
