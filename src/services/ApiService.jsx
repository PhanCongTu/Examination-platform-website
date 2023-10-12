import axios from './axios';
const signUpStudentUrl = `/signup/student`;
const signUpTeacherUrl = `/signup/teacher`;

const checkRoleStudent = `/check/student`;

export const checkStudent = async () => {
      const accessToken = getAccessToken();
      let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${checkRoleStudent}`,
            headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
            }
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

/**
 * Lưu thông tin của user vào Local Storage || Session Storage
 * 
 * @param {*} userInfor : Thoong tin user (từ response body)
 * @param {*} rememberMe : True nếu user check vào "Remember Me"
 */
export const saveCedentials = (userInfor) => {
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

