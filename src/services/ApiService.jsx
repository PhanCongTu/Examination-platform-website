
import axios from './axios';
const signUpStudentUrl = `/signup/student`;
const signUpTeacherUrl = `/signup/teacher`;
const loginInUrl = '/login';
const resetPasswordUrl = '/api/password/reset/EMAIL:{email}'
const codeResetPassUrl = 'api/password/request-reset/EMAIL:{email}'
const getAllActiveClassUrl = 'api/v1/classroom';
const updateActiveClassUrl="api/v1/classroom/update/{id}";
const addActiveClassUrl="api/v1/classroom/create";

export const addActiveClassService=async(body)=>{
      const {id, ...params}=body;
      console.log(params);
      let accessToken=getAccessToken();
      console.log(accessToken);
      return await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: addActiveClassUrl,
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization':`Bearer ${accessToken}`
            },
            data: params
      })
}

export const updateActiveClassService= async(body)=>{
      const {id, ...params}=body;
      console.log(params);
      let accessToken=getAccessToken();
      console.log(accessToken);
      return await axios.request({
            method: 'put',
            maxBodyLength: Infinity,
            url: updateActiveClassUrl.replace('{id}',id),
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization':`Bearer ${accessToken}`
            },
            data: params
      })
}

export const getAllActiveClassService = async (page, sortType, column, size, search) => {
      let getAllActiveClassUrlParam = getAllActiveClassUrl; 
      let queryParams = [];

      if (page) {
            queryParams.push(`page=${page}`);
      }
      if (sortType) {
            queryParams.push(`sortType=${sortType}`);
      }
      if (column) {
            queryParams.push(`column=${column}`);
      }
      if (size) {
            queryParams.push(`size=${size}`);
      }
      if (search) {
            queryParams.push(`search=${search}`);
      }
      if (queryParams.length > 0) {
            getAllActiveClassUrlParam += '?' + queryParams.join('&');
            console.log(getAllActiveClassUrlParam);
      }
      return await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: getAllActiveClassUrlParam,
            headers: {
                  'Content-Type': 'application/json'
            },
      })
}

export const codeResetService = async (emailAddress) => {
      console.log(codeResetPassUrl.replace('{email}', emailAddress))
      return await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: codeResetPassUrl.replace('{email}', emailAddress),
            headers: {
                  'Content-Type': 'application/json'
            },

      })
}

export const resetPasswordService = async (body, emailAddress) => {
      const { confirmPassword, ...rest } = body;
      const data = rest;
      return await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: resetPasswordUrl.replace('{email}', emailAddress),
            headers: {
                  'Content-Type': 'application/json'
            },
            data: data
      })
}

/**
 * Gọi API Log in
 * 
 * @param {*} body : request body (từ form)
 * @returns : Trả về 1 promise
 */
export const loginInService = async (body) => {
      let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: loginInUrl,
            headers: {
                  'Content-Type': 'application/json'
            },
            data: body
      };
      return await axios.request(config);
}

/**
 * Gọi API đăng ký user
 * 
 * @param {*} body : request body (từ form)
 * @param {*} teacher : check xem có phải là teacher ha không
 * @returns : Trả về 1 promise
 */
export const signUpService = async (body, isTeacher) => {
      let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${isTeacher ? signUpTeacherUrl : signUpStudentUrl}`,
            headers: {
                  'Content-Type': 'application/json'
            },
            data: body
      };
      return await axios.request(config);
}

export const removeCredential = () => {
      localStorage.removeItem('userInfor');
      destroyToken();
}

/**
 * Lưu thông tin của user vào Local Storage || Session Storage
 * 
 * @param {*} userInfor : Thoong tin user (từ response body)
 * @param {*} rememberMe : True nếu user check vào "Remember Me"
 */
export const saveCredential = (userInfor) => {
      localStorage.setItem('userInfor', JSON.stringify(userInfor));

      // Lưu token riêng vào local storage
      saveToken(userInfor.accessToken, userInfor.refreshToken);
}

export const saveToken = (accessToken, refreshToken) => {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
}
export const destroyToken = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
}

export const getAccessToken = () => {
      return localStorage.getItem('accessToken');

}

export const getRefreshToken = () => {
      return localStorage.getItem('refreshToken');
}

