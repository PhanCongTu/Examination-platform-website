import axios from 'axios';
import Path from '../utils/Path';
import { toast } from 'react-toastify';

const host = 'http://localhost:5000';
const signUpStudentUrl = `${host}/signup/student`;
const signUpTeacherUrl = `${host}/signup/teacher`;


/**
 * Chỉ return data nếu không có lỗi
 * 
 * @param {*} body : request body (từ form)
 * @param {*} isTeacher : check xem có phải là giáo viên hay không
 * @returns : response body
 */
export const userCidential = (body, isTeacher) => {
      signUpService(body, isTeacher)
            .then((response) => {
                  // Link tham khảo Toast: https://blog.logrocket.com/using-react-toastify-style-toast-messages/
                  toast.success(`Sign-up successfully!`, {
                        position: toast.POSITION.TOP_RIGHT,
                  });
                  saveCedentials(response.data)
                  return response;
            })
            .catch((error) => {
                  toast.error(`Sign-up fail !`, {
                        position: toast.POSITION.TOP_RIGHT,
                  });
            });
}

/**
 * Gọi API đăng ký user
 * 
 * @param {*} body : request body (từ form)
 * @param {*} teacher : check xem có phải là teacher ha không
 * @returns : Trả về 1 promise
 */
const signUpService = async (body, teacher) => {
      let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${teacher ? signUpTeacherUrl : signUpStudentUrl}`,
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
const saveCedentials = (userInfor, rememberMe) => {
      if (rememberMe) {
            localStorage.setItem('userInfor', JSON.stringify(userInfor));
      } else {
            sessionStorage.setItem('userInfor', JSON.stringify(userInfor));
      }
}

