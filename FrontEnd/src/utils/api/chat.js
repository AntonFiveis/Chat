import { request } from '../../core';

export default {
  postChatPhoto: async (file, chatID) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await request(true).post('/api/chats/file', formData, {
      params: { chatID },
    });
    return res.data;
  },
  getAll: async () => {
    return request(true).get('/api/chats');
  },
};
