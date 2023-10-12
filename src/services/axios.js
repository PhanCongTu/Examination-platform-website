import axios from 'axios';
import { getRefreshToken, saveToken } from './ApiService';

const instance = axios.create({
      baseURL: 'http://localhost:5000',
      'Content-Type': 'application/json',
});


instance.interceptors.response.use(function (response) {
      console.log("response")
      console.log(response)
      return response?.data;
}, async function (error) {

      console.log("response status code---" + error.response.status);
      console.log("response config---" + error.config);
      const prevRequest = error?.config;
      if (error.response && error?.response?.status === 401 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const resp = (await refreshToken(getRefreshToken()));

            console.log("resp")
            console.log(resp)
            console.log(JSON.stringify(prevRequest))


            saveToken(resp.accessToken, resp.refreshToken)
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