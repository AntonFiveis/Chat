import { axios } from '../../core';

export default {
  getMyChats: async (accessToken) => {
    const res = await axios.get('/api/chat-members', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  },
  getChatMembers: async (chatID, accessToken) => {
    const res = await axios.get(`/api/chat-members/${chatID}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  },
};
