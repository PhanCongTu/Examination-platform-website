import axios from 'axios';

const host = 'http://localhost:5000';
const signUpStudentUrl = `${host}/signup/student`;
const signUpTeacherUrl = `${host}/signup/teacher`;


// Return về 1 promise
export const signUpService = async (body, teacher) => {
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