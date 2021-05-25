import { openNotification } from '../../utils/helpers';
import { userApi } from '../../utils/api';

import _getFingerprint from '../../services/auth.service';

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
  fetchUserLogin: (postData) => async (dispatch) => {
    const fingerprint = await _getFingerprint();
    const { data, status } = await userApi.login({
      authCredentials: postData,
      fingerprint,
    });
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
      window.axios.defaults.headers.common['Authorization'] =
        'Bearer ' + accessToken;
      window.localStorage['accessToken'] = accessToken;
      dispatch(actions.fetchUserData());
    }
    return { data, status };
  },
  // eslint-disable-next-line no-unused-vars
  fetchUserRegister: (postData) => async (dispatch) => {
    const fingerprint = await _getFingerprint();
    const { data, status } = await userApi.register({
      user: postData,
      fingerprint,
    });
    console.log('status=', status);
    const { accessToken } = data;
    if (status !== 201) {
      openNotification({
        title: 'Ошибка при регистрации!',
        text: 'Неверный логин или пароль',
        type: 'error',
      });
    } else {
      openNotification({
        title: 'Отлично!',
        text: 'Регистрация успешна.',
        type: 'success',
      });
      window.axios.defaults.headers.common['Authorization'] =
        'Bearer ' + accessToken;
      window.localStorage['accessToken'] = accessToken;
      dispatch(actions.fetchUserData());
    }
    return { data, status };
  },
};

export default actions;
