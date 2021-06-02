// import { chatsApi } from '../../utils/api';

const actions = {
  setDialogs: (items) => ({
    type: 'DIALOGS:SET_ITEMS',
    payload: items,
  }),
  setCurrentDialogId: (id) => ({
    type: 'DIALOGS:SET_CURRENT_DIALOG_ID',
    payload: id,
  }),
  addDialog: (item) => ({
    type: 'DIALOGS:ADD_ITEM',
    payload: item,
  }),
  addMessageToDialog: (message) => (dispatch, getState) => {
    const { dialogs } = getState();
    const chats = [...dialogs.items];
    const chatIndex = chats.findIndex((ch) => ch.chatUUID === message.chatUUID);
    const chat = chats.splice(chatIndex, 1)[0];
    let messages = [...chat.messages];
    messages.push(message);
    if (messages.length > 100) messages = messages.splice(1);

    dispatch(actions.setDialogs([...chats, { ...chat, messages }]));
  },
};

export default actions;
