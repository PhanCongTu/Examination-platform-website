
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
const getAllExamOfClassUrl = 'api/v1/multiple-choice-test/classroom';
const addExamByIdClassroomUrl = 'api/v1/multiple-choice-test/create'
const getAllActiveQuestionUrl = 'api/v1/question/question-group'
const getAllInActiveQuestionUrl = 'api/v1/question/inactive/question-group'
const addQuestionByQuestionGroupUrl = 'api/v1/question/create';
const updateQuestionUrl = 'api/v1/question/update/{id}';
const deleteQuestionUrl = 'api/v1/question/delete/{id}';
const deleteExamUrl = 'api/v1/multiple-choice-test/delete/{idExam}';
const updateExamUrl = 'api/v1/multiple-choice-test/update/info/{idExam}';
const getAllStudentScoreByIDExamUrl = 'api/v1/score/multiple-choice-test'

export const getAllStudentScoreByIDExamService = async (id, page, sortType, column, size, search) => {
      let accessToken = getAccessToken();
      let getAllStudentScoreByIDExamUrlParam = getAllStudentScoreByIDExamUrl;
      let queryParams = [];
      if (id)
            getAllStudentScoreByIDExamUrlParam += `/${id}`;

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
            getAllStudentScoreByIDExamUrlParam += '?' + queryParams.join('&');
      }

      return await axios.request({
            method: 'get',
            url: getAllStudentScoreByIDExamUrlParam,
            headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  "Content-Type": 'application/json'
            }
      })
}
export const updateExamService = async (body) => {
      let { id, ...params } = body;

      let accessToken = getAccessToken();
      return await axios.request({
            method: 'put',
            url: updateExamUrl.replace('{idExam}', id),
            data: params,
            headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
            }
      })
}

export const deleteExamService = async (idExam) => {
      let accessToken = getAccessToken();
      return await axios.request({
            method: 'delete',
            url: deleteExamUrl.replace('{idExam}', idExam),
            headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
            }
      })
}

export const deleteQuestionService = async (id) => {
      let accessToken = getAccessToken();
      return await axios.request({
            method: 'delete',
            url: deleteQuestionUrl.replace('{id}', id),
            headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
            }
      })
}

export const updateQuestionService = async (body) => {
      let { id, ...params } = body;

      let accessToken = getAccessToken();
      return await axios.request({
            method: 'put',
            url: updateQuestionUrl.replace('{id}', id),
            data: params,
            headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
            }
      })
}

export const addQuestionByQuestionGroupService = async (body) => {
      let accessToken = getAccessToken();
      return await axios.request({
            method: 'post',
            url: addQuestionByQuestionGroupUrl,
            data: body,
            headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
            }
      })
}

export const getAllInActiveQuestionService = async (id, page, sortType, column, size, search) => {
      let accessToken = getAccessToken();
      let getAllInActiveQuestionUrlParam = getAllInActiveQuestionUrl;
      if (id)
            getAllInActiveQuestionUrlParam += `/${id}`;
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
            getAllInActiveQuestionUrlParam += '?' + queryParams.join('&');
      }

      return await axios.request({
            method: 'get',
            url: getAllInActiveQuestionUrlParam,
            headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  "Content-Type": 'application/json'
            }
      })
}

export const getAllActiveQuestionService = async (id, page, sortType, column, size, search) => {
      let accessToken = getAccessToken();
      let getAllActiveQuestionUrlParam = getAllActiveQuestionUrl;
      if (id)
            getAllActiveQuestionUrlParam += `/${id}`;
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
            getAllActiveQuestionUrlParam += '?' + queryParams.join('&');
      }

      return await axios.request({
            method: 'get',
            url: getAllActiveQuestionUrlParam,
            headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  "Content-Type": 'application/json'
            }
      })
}

export const addExamByIdClassroomService = async (body) => {
      let accessToken = getAccessToken();
      return await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: addExamByIdClassroomUrl,
            data: body,
            headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  "Content-Type": 'application/json'
            }
      });
}

export const convertDateToMiliseconds = (date) => {
      var dateChange = new Date(date);
      return dateChange.getTime();
}

export const setFormatDateYYYYMMDD = (milliseconds) => {
      var date = new Date(milliseconds);
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      var hours = date.getHours();
      var minutes = date.getMinutes();

      var formattedDay = day.toString().padStart(2, '0');
      var formattedMonth = month.toString().padStart(2, '0');
      var formattedHours = hours.toString().padStart(2, '0');
      var formattedMinutes = minutes.toString().padStart(2, '0');
      return year + '-' + formattedMonth + '-' + formattedDay + 'T' + formattedHours + ':' + formattedMinutes;
}

export const getFormattedDateTimeByMilisecond = (milliseconds) => {
      return convertMillisecondsToTime(milliseconds) + ' ' + getFormattedDate(milliseconds)
}

export function getFormattedDate(milliseconds) {
      var date = new Date(milliseconds);

      var day = date.getDate();
      var month = date.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0, nên cần cộng 1
      var year = date.getFullYear();

      // Định dạng ngày, tháng, năm thành chuỗi có 2 chữ số
      var formattedDay = day.toString().padStart(2, '0');
      var formattedMonth = month.toString().padStart(2, '0');

      // Trả về chuỗi ngày tháng năm trong định dạng DD/MM/YYYY
      return formattedDay + '/' + formattedMonth + '/' + year;
}

export function convertMillisecondsToTime(milliseconds) {
      var date = new Date(milliseconds);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      // var seconds = date.getSeconds();

      // Định dạng giờ, phút, giây thành chuỗi có 2 chữ số
      var formattedHours = hours.toString().padStart(2, '0');
      var formattedMinutes = minutes.toString().padStart(2, '0');
      //var formattedSeconds = seconds.toString().padStart(2, '0');

      // Trả về chuỗi thời gian trong định dạng HH:MM:SS
      return formattedHours + ':' + formattedMinutes;
}

export const getAllExamOfClassService = async (id, isEnded, page, sortType, column, size, search) => {
      let getAllExamOfClassUrlParam = getAllExamOfClassUrl + `/${id}`;
      let queryParams = [];
      if (isEnded) {
            queryParams.push(`isEnded=${isEnded}`);
      }
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
            getAllExamOfClassUrlParam += '?' + queryParams.join('&');
      }

      let accessToken = getAccessToken();
      return await axios.request({
            method: "get",
            maxBodyLength: Infinity,
            url: getAllExamOfClassUrlParam,
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
            },
      });
}

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

