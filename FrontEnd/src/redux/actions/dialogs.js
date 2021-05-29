import { chatsApi } from '../../utils/api';

const actions = {
  setDialogs: (items) => ({
    type: 'DIALOGS:SET_ITEMS',
    payload: items,
  }),
  setCurrentDialogId: (id) => ({
    type: 'DIALOGS:SET_CURRENT_DIALOG_ID',
    payload: id,
  }),
  fetchDialogs: () => (dispatch) => {
    chatsApi.getAll().then(({ data }) => {
      dispatch(actions.setDialogs(data));
    });
  },
};

export default actions;
