import axios from 'axios';
import { getRefreshToken, removeCredential, saveToken } from './ApiService';

const instance = axios.create({
      baseURL: 'http://localhost:8080',
      'Content-Type': 'application/json',
});


instance.interceptors.response.use(function (response) {
      return response?.data;
}, async function (error) {

      const prevRequest = error?.config;
      if (error.response && error?.response?.status === 401 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const resp = (await refreshToken(getRefreshToken()));
            saveToken(resp.accessToken, resp.refreshToken, null);
            prevRequest.headers = {
                  authorization: `Bearer ${resp.accessToken}`,
                  'Content-Type': 'application/json'
            };
            return instance(prevRequest);
      }

      return Promise.reject(error);
});

const refreshToken = (data) => instance({
      url: '/refresh_token',
      method: 'post',
      data: {
            'refreshToken': data
      }
})
export default instance;