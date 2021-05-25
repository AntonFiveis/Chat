import { messagesApi } from '../../utils/api';

const actions = {
  setMessages: (items) => ({
    type: 'MESSAGES:SET_ITEMS',
    payload: items,
  }),
  addMessages: (message) => (dispatch, getState) => {
    const { dialogs } = getState();
    const { currentDialogId } = dialogs;

    if (currentDialogId === message.dialog.id) {
      dispatch({
        type: 'MESSAGES:ADD_MESSAGE',
        payload: message,
      });
    }
  },
  // eslint-disable-next-line no-unused-vars
  fetchSendMessage: (text, dialogId) => (dispatch) => {
    return messagesApi.send(text, dialogId);
  },
  setIsLoading: (bool) => ({
    type: 'MESSAGES:SET_IS_LOADING',
    payload: bool,
  }),
  fetchMessages: (dialogId) => (dispatch) => {
    dispatch(actions.setIsLoading(true));
    messagesApi
      .getAllByDialogId(dialogId)
      .then(({ data }) => {
        dispatch(actions.setMessages(data));
      })
      .catch(() => {
        dispatch(actions.setIsLoading(false));
      });
  },
};

export default actions;
