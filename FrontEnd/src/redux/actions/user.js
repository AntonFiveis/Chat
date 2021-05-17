import { openNotification } from '../../utils/helpers';
import { userApi } from '../../utils/api';

const actions = {
  setUserData: (data) => ({
    type: 'USER:SET_DATA',
    payload: data,
  }),
  fetchUserData: () => (dispatch) => {
    userApi.getMe().then(({ data }) => {
      dispatch(actions.setUserData(data));
    });
  },
  fetchUserLogin: (postData) => (dispatch) => {
    return userApi.login(postData).then(({ data, status }) => {
      console.log('status=', status);
      const { accessToken } = data;
      if (status !== 201) {
        openNotification({
          title: 'Ошибка при авторизации!',
          text: 'Неверный логин или пароль',
          type: 'error',
        });
      } else {
        openNotification({
          title: 'Отлично!',
          text: 'Авторизация успешна.',
          type: 'success',
        });
        window.axios.defaults.headers.common['accessToken'] = accessToken;
        window.localStorage['accessToken'] = accessToken;
        dispatch(actions.fetchUserData());
      }
      return data;
    });
  },
};

export default actions;
