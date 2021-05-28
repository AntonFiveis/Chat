import { axios } from '../../core';

export default {
  postChatPhoto: async (file, chatID, accessToken) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await axios.post('/api/chats/file', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { chatID },
    });
    return res.data;
  },
};
