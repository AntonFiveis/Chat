import { request } from '../../core';

export default {
  get50FromBothSidesOf: (chatID, date) =>
    request(true).get('/messages', { params: { date, chatID } }),
};
