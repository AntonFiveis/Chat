import { request } from '../../core';

export default {
  getAllByDialogId: (id) => request(true).get(`/messages?dialog=${id}`),
  send: (text, dialogId) =>
    request(true).post('/messages', {
      text: text,
      dialog_id: dialogId,
    }),
  get50FromBothSidesOf: (chatID, date) =>
    request(true).get('/messages', { params: { date, chatID } }),
};
