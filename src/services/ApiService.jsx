
import axios from './axios';
const signUpStudentUrl = `/signup/student`;
const signUpTeacherUrl = `/signup/teacher`;
const loginInUrl = '/login';
const resetPasswordUrl = '/api/password/reset/EMAIL:{email}';
const codeResetPassUrl = 'api/password/request-reset/EMAIL:{email}';
const getAllActiveClassUrl = 'api/v1/classroom';
const updateActiveClassUrl = "api/v1/classroom/update/{id}";
const addActiveClassUrl = "api/v1/classroom/create";
const deleteActiveClassUrl = "api/v1/classroom/delete/{id}";

const getAllActiveQuestionGroupUrl = 'api/v1/question-group/classroom/';
const addQuestionGroupUrl = 'api/v1/question-group/create';
const updateQuestionGroupUrl = 'api/v1/question-group/update/{id}';
const deleteQuestionGroupUrl = 'api/v1/question-group/delete/{id}'
const getAllUnActiveClassUrl = 'api/v1/classroom/inactive';
const getAllUnActiveQuestionGroupUrl = 'api/v1/question-group/inactive/classroom/{id}';
const getAllStudentOfClassUrl = 'api/v1/student/classroom';
const getAllActiveStudentUrl = 'api/v1/student';
const addStudentToClassUrl = 'api/v1/student/add-to-class';

export const addStudentToClassService = async (body) => {
      console.log("BODY STUDENT ", body);
      let accessToken = getAccessToken();
      return await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: addStudentToClassUrl,
            data: body,
            headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': "application/json"
            }
      })
}

export const getAllActiveStudentService = async (page, sortType, column, size, search) => {
      let getAllActiveStudentOUrlParam = getAllActiveStudentUrl;
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
            getAllActiveStudentOUrlParam += '?' + queryParams.join('&');
      }
      let accessToken = getAccessToken();
      return await axios.request({
            method: "get",
            maxBodyLength: Infinity,
            url: getAllActiveStudentOUrlParam,
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
            },
      })
}

export const getAllStudentOfClassService = async (id, page, sortType, column, size, search) => {

      let getAllStudentOfClassUrlParam = getAllStudentOfClassUrl + `/${id}`;
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
            getAllStudentOfClassUrlParam += '?' + queryParams.join('&');
      }

      let accessToken = getAccessToken();
      return await axios.request({
            method: "get",
            maxBodyLength: Infinity,
            url: getAllStudentOfClassUrlParam,
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
            },
      })
}

export const getAllUnActiveQuestionGroupService = async (id, page, sortType, column, size, search) => {
      let getAllUnActiveQuestionGroupUrlParam = getAllUnActiveQuestionGroupUrl.replace("{id}", id);
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
            getAllUnActiveQuestionGroupUrlParam += '?' + queryParams.join('&');

      }

      let accessToken = getAccessToken();
      return await axios.request({
            method: "get",
            maxBodyLength: Infinity,
            url: getAllUnActiveQuestionGroupUrlParam,
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
            },
      })
}

export const getAllUnActiveClassService = async (page, sortType, column, size, search) => {
      let getAllUnActiveClassUrlParam = getAllUnActiveClassUrl;
      let queryParams = [];
      let accessToken = getAccessToken();
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
            getAllUnActiveClassUrlParam += '?' + queryParams.join('&');
            console.log(getAllUnActiveClassUrlParam);
      }
      return await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: getAllUnActiveClassUrlParam,
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
            },
      })
}

export const deleteQuestionGroupService = async (body) => {

      let accessToken = getAccessToken();
      return await axios.request({
            method: 'delete',
            maxBodyLength: Infinity,
            url: deleteQuestionGroupUrl.replace('{id}', body.id),
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
            }
      })
}

export const updateQuestionGroupService = async (body) => {
      const { isEnable, id, classroomId, ...params } = body;
      let accessToken = getAccessToken();
      return await axios.request({
            method: 'put',
            maxBodyLength: Infinity,
            url: updateQuestionGroupUrl.replace('{id}', id),
            data: params,
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
            }
      })
}

export const addQuestionGroupService = async (body) => {
      const { isEnable, id, ...params } = body;
      let accessToken = getAccessToken();
      return await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: addQuestionGroupUrl,
            data: params,
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
            }
      })
}

export const getAllActivateQuestionGroupService = async (id, page, sortType, column, size, search) => {
      let getAllQuestionGroupUrlParam = getAllActiveQuestionGroupUrl + id;
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
            getAllQuestionGroupUrlParam += '?' + queryParams.join('&');

      }

      let accessToken = getAccessToken();
      return await axios.request({
            method: "get",
            maxBodyLength: Infinity,
            url: getAllQuestionGroupUrlParam,
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
            },
      })
}

export const deleteActiveClassService = async (body) => {

      let accessToken = getAccessToken();
      return await axios.request({
            method: 'delete',
            maxBodyLength: Infinity,
            url: deleteActiveClassUrl.replace('{id}', body.id),
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
            },
            data: body.id
      })
}

export const addActiveClassService = async (body) => {
      const { id, ...params } = body;
      console.log(params);
      let accessToken = getAccessToken();
      console.log(accessToken);
      return await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: addActiveClassUrl,
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
            },
            data: params
      })
}

export const updateActiveClassService = async (body) => {
      const { id, ...params } = body;
      console.log(params);
      let accessToken = getAccessToken();
      console.log(accessToken);
      return await axios.request({
            method: 'put',
            maxBodyLength: Infinity,
            url: updateActiveClassUrl.replace('{id}', id),
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
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
      saveToken(userInfor.accessToken, userInfor.refreshToken, JSON.stringify(userInfor.roles));
}

export const saveToken = (accessToken, refreshToken, roles) => {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      if (roles != null)
            localStorage.setItem('roles', roles);
}
export const destroyToken = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('roles');
}

export const getRoles = () => {
      return localStorage.getItem('roles');
}

export const getAccessToken = () => {
      return localStorage.getItem('accessToken');

}
export const getUserInfo = () => {
      return localStorage.getItem('userInfor');
}

export const getRefreshToken = () => {
      return localStorage.getItem('refreshToken');
}

