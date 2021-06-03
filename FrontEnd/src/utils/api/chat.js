import { request } from '../../core';
// todo: use aliases

export default {
  postChatPhoto: async (file, chatUUID) => {
    const formData = new FormData();
    formData.append('image', file);
    return await request(true).post('/api/chats/file', formData, {
      params: { chatUUID },
    });
  },
  getAll: async () => {
    return request(true).get('/api/chats');
  },
};
