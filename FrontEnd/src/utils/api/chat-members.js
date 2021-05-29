import { request } from '../../core';

export default {
  getMyChats: async () => {
    const res = await request(true).get('/api/chat-members');
    return res.data;
  },
  getChatMembers: async (chatID) => {
    const res = await request(true).get(`/api/chat-members/${chatID}`);
    return res.data;
  },
};
