import { getAccessToken } from './ApiService';
import axios from './axios';
const getMy2WeeksAroundMCTest = 'api/v1/multiple-choice-test/me/two-weeks-around';
const getMyClassrooms = 'api/v1/classroom/me';
const getClassroomById = 'api/v1/classroom';
const getMCTestsOfClassroom = 'api/v1/multiple-choice-test/classroom';
const getMyMultipleChoiceTestInformation = 'api/v1/multiple-choice-test/my/info';
const getDoMultipleChoiceTest = 'api/v1/multiple-choice-test';
const createTestTracking = 'api/v1/test-tracking/my/create';
const trackMyTest = 'api/v1/test-tracking/my';
const submitMCTest = 'api/v1/score/submit-test';
const getMyCore = 'api/v1/score/my';
const sendEmailVerifyCode = 'api/email/send-verification';
const verifyEmail = 'api/email/verify';

export const verifyEmailService = async (code) => {
      let accessToken = getAccessToken();
      return await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: verifyEmail,
            data: { "code": code },
            headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': "application/json"
            }
      })
}

export const sendEmailVerifyCodeService = async () => {
      let accessToken = getAccessToken();
      return await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: sendEmailVerifyCode,
            headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': "application/json"
            }
      })
}

export const getMyCoreService = async (MCTestId) => {
      let accessToken = getAccessToken();
      return await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: getMyCore + `/ ${MCTestId}`,
            headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': "application/json"
            }
      })
}

export const submitMCTestService = async (value) => {
      let accessToken = getAccessToken();
      return await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: submitMCTest,
            data: value,
            headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': "application/json"
            }
      })
}

export const trackMyTestService = async (MCTestId) => {
      let accessToken = getAccessToken();
      return await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: trackMyTest + `/ ${MCTestId}`,
            headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': "application/json"
            }
      })
}

export const createTestTrackingService = async (MCTestId) => {
      let accessToken = getAccessToken();
      return await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: createTestTracking + `/ ${MCTestId}`,
            headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': "application/json"
            }
      })
}

export const getDoMultipleChoiceTestService = async (MCTestId) => {
      let accessToken = getAccessToken();
      return await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: getDoMultipleChoiceTest + `/ ${MCTestId}`,
            headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': "application/json"
            }
      })
}

export const getMyMultipleChoiceTestInformationService = async (MCTestId) => {
      let accessToken = getAccessToken();
      return await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: getMyMultipleChoiceTestInformation + `/ ${MCTestId}`,
            headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': "application/json"
            }
      })
}

export const getMCTestsOfClassroomService = async (classroomId, page, sortType, column, size, search, isEnded) => {
      let getMCTestsOfClassroomParam = getMCTestsOfClassroom + `/${classroomId}`;
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
      if (isEnded) {
            queryParams.push(`isEnded=${isEnded}`);
      }
      if (queryParams.length > 0) {
            getMCTestsOfClassroomParam += '?' + queryParams.join('&');
      }
      console.log("getMCTestsOfClassroomParam")
      console.log(getMCTestsOfClassroomParam)
      return await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: getMCTestsOfClassroomParam,
            headers: {
                  'Content-Type': "application/json"
            }
      })
}

export const getClassroomByIdService = async (classroomId) => {
      return await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: getClassroomById + `/ ${classroomId}`,
            headers: {
                  'Content-Type': "application/json"
            }
      })
}

export const getMy2WeeksAroundMCTestService = async () => {
      let accessToken = getAccessToken();
      return await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: getMy2WeeksAroundMCTest,
            headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': "application/json"
            }
      })
}

export const getMyClassroomsService = async (page, sortType, column, size, search) => {
      let getMyClassroomsParam = getMyClassrooms;
      let queryParams = [];
      if (page) {
            queryParams.push(`page = ${page}`);
      }
      if (sortType) {
            queryParams.push(`sortType = ${sortType}`);
      }
      if (column) {
            queryParams.push(`column = ${column}`);
      }
      if (size) {
            queryParams.push(`size = ${size}`);
      }
      if (search) {
            queryParams.push(`search = ${search}`);
      }
      if (queryParams.length > 0) {
            getMyClassroomsParam += '?' + queryParams.join('&');
      }
      let accessToken = getAccessToken();
      return await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: getMyClassroomsParam,
            headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': "application/json"
            }
      })
}