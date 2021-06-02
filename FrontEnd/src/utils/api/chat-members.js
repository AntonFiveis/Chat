import { request } from '../../core';

export default {
  getMyChats: async () => {
    const res = await request(true).get('/api/chat-members');
    return res.data;
  },
  getChatMembers: async (chatUUID) => {
    const res = await request(true).get(`/api/chat-members/${chatUUID}`);
    return res.data;
  },
};
