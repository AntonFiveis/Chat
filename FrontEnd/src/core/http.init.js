import axios from 'axios';
import { userApi } from '../utils/api';
class Http {
  constructor(status) {
    // todo: use es6 status?.auth ?? false
    this.isAuth = status && status.auth ? status.auth : false;
    this.instance = axios.create({
      baseURL: process.env.API_URL,
    });

    return this.init();
  }

  init() {
    if (this.isAuth) {
      this.instance.interceptors.request.use(
        (req) => {
          req.headers.authorization =
            'Bearer ' + window.localStorage.getItem('accessToken');
          if (
            Number(window.localStorage.getItem('finishDate')) <
            Number(new Date())
          ) {
            return userApi
              .refresh(window.localStorage.getItem('fingerprint'))
              .then((response) => {
                window.localStorage.setItem(
                  'accessToken',
                  response.accessToken,
                );
                window.localStorage.setItem('finishDate', response.finishDate);
                req.headers.authorization =
                  'Bearer ' + window.localStorage.getItem('accessToken');
                return req;
              })
              .catch((error) => Promise.reject(error));
          } else {
            return req;
          }
        },
        (error) => {
          return Promise.reject(error);
        },
      );
    }

    return this.instance;
  }
}

// todo: axios.defaults could eliminate almost all that code

export default function request(auth = false) {
  return new Http({ auth });
}
