import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Path from '../../../utils/Path';
import classroomPNG from '../../../assets/classroomPNG.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { createTestTrackingService, getDoMultipleChoiceTestService, getMyScoreService, submitMCTestService, trackMyTestService } from '../../../services/UserService';
import { secondsDiff, secondsToTime } from '../../../utils/WebUtils';
import {
      differenceInSeconds
} from 'date-fns'
import QuizQuestion from '../../../components/exam/QuizQuesiton';
import { useTranslation } from 'react-i18next';


function DoMCTest() {
      const {t}=useTranslation();
      document.title = t('Testing');
      const navigate = useNavigate();
      let location = useLocation();
      const [MCTestId, setMCTestId] = useState(location?.state?.mctestid);
      const [MCTest, setMCTest] = useState();
      const [testingTime, setTestingTime] = useState();
      const [listAnswer, setListAnswer] = useState([]);
      const [listSubmitAnswer, setListSubmitAnswer] = useState([]);
      const [response, setResponse] = useState(undefined);
      const [submitValue, setSubmitValue] = useState({
            
      });

      // If test id is missing
      useEffect(() => {
            if (!MCTestId) {
                  navigate(Path.HOME)
            }
      }, [])
      // Get the test
      useEffect(() => {
            getMyScoreService(MCTestId)
                  .then((res) => {
                        // If the test is already submitted
                        navigate(Path.SCORE_DETAIL.replace(':testId', MCTestId))
                  })
                  .catch((err) => {
                        getDoMultipleChoiceTestService(MCTestId)
                              .then((res) => {
                                    console.log(res.data)
                                    setMCTest(res.data)
                                    res?.data.questions.forEach(question => {
                                          question.answers.forEach(
                                                answer => {
                                                      var answer1 = {
                                                            questionId: question.id,
                                                            answer: answer.answerContent
                                                      };
                                                      setListAnswer(pre => [...pre, answer1]);
                                                }
                                          )

                                    })
                              })
                              .catch((err) => {

                                    console.error(err)
                              })
                        // Start tracking the test
                        trackMyTestService(MCTestId)
                              .then((res) => {
                                    console.log(res)
                                    // if (!Object.keys(res?.data).length) {
                                    if (!res.hasOwnProperty('data')) {
                                          createTestTrackingService(MCTestId)
                                                .then((res2) => {
                                                      console.log(res2)
                                                      setTestingTime(secondsDiff((new Date(res2.data.dueTime)), (new Date())))
                                                })
                                                .catch((err) => {
                                                      console.error(err)
                                                })
                                    } else {
                                          console.log(res.data)
                                          setTestingTime(secondsDiff((new Date(res.data.dueTime)), (new Date())))
                                    }
                              })
                              .catch((err) => {
                                    console.error(err)
                              })
                  })
      }, [])
      // Time coundown
      useEffect(() => {
            if (testingTime > 0) {
                  setTimeout(() => {
                        setTestingTime(pre => pre - 1)
                  }, [1000])
            } else if (testingTime <= 0) {
                  handleSubmit()
            }
      }, [testingTime])
      const handleChooseAnswer = useCallback((questionId, value) => {
            console.log("handleChooseAnswer");
            console.log(questionId, value);
            console.log("Check prev");
            if (listSubmitAnswer.length !== 0) {
                  console.log("Check");
                  listSubmitAnswer.forEach(submittedAnswer => {
                        console.log(submittedAnswer)
                        if (submittedAnswer?.questionId == questionId) {
                              setListSubmitAnswer(prev => prev.map((item, index) => {
                                    if (item && item.questionId === questionId) {
                                          return { ...item, answer: value };
                                        }
                                        return item;
                              }))
                        } else {
                              var answer = {
                                    questionId: questionId,
                                    answer: value
                              };
                              setListSubmitAnswer(prev => [...prev, answer])
                        }
                  })
            }
            else{
                  console.log("Add submit answer");
                  var answer = {
                        questionId: questionId,
                        answer: value
                  };
                  setListSubmitAnswer(prev => [...prev, answer])
            }
            // if (listSubmitAnswer.some(submittedAnswer => submittedAnswer.questionId === questionId)) {
            //       setListSubmitAnswer(prev => prev.map(item => {
            //             if (item.questionId === questionId) {
            //                   return { ...item, answer: value };
            //             }
            //             return item;
            //       }));
            // } else {
            //       setListSubmitAnswer(prev => [...prev, { questionId: questionId, answer: value }]);
            // }
            setSubmitValue({
                  multipleChoiceTestId: MCTestId,
                  submittedAnswers: listSubmitAnswer
            })
            console.log(listSubmitAnswer);


            // listAnswer.forEach(item => {
            //       if (item.questionId === questionId) {
            //             item.answer = value
            //             var tempListAnswer = listAnswer.filter(item => item.questionId !== questionId)
            //             var answer = {
            //                   questionId: questionId,
            //                   answer: value
            //             };
            //             tempListAnswer.push(answer)
            //             setListAnswer(tempListAnswer)
            //             setSubmitValue({
            //                   multipleChoiceTestId: MCTestId,
            //                   submittedAnswers: tempListAnswer
            //             })
            //       }
            // })
      },[listSubmitAnswer])
      const handleSubmit = () => {
            submitMCTestService(submitValue)
                  .then((res) => {
                        navigate(Path.SCORE_DETAIL.replace(':testId', MCTestId))
                  })
                  .catch((err) => {
                        console.error(err)
                  })
      }
      return (
            <>
                  <div className='fixed z-50 ml-5 bg-white mt-5 py-1 px-5 flex justify-start items-center opacity-95   rounded-lg select-none ' >
                        <h3 className='text-[35px] font-bold'>{secondsToTime(testingTime).m} : {secondsToTime(testingTime).s}</h3>
                  </div>
                  <div className='min-h-screen h-full  bg-repeat p-5 flex justify-center ' style={{ backgroundImage: "url(" + classroomPNG + ")" }}>
                        <div className='bg-white opacity-95 min-h-screen h-full w-[80%] pt-6 rounded-lg select-none' >
                              <div onClick={() => navigate(-1)}
                                    className='flex justify-start items-center ml-10 cursor-pointer w-fit rounded-lg p-1'>
                                    <FontAwesomeIcon className='mr-3' icon={faLeftLong} /> {t('Back to the previous page')}
                              </div>
                              <div className='flex  justify-center items-center opacity-95  rounded-lg select-none' >
                                    <div className='w-[80%]  min-h-screen h-full opacity-95 rounded-lg select-none' >
                                          <div className='pl-10  rounded-lg select-none bg-slate-200' >
                                                {
                                                      MCTest?.questions?.map((ques, index) => {
                                                            return <div key={index} className='pt-10'>
                                                                  {/* <h3 className="pl-3 mb-4 font-semibold text-black dark:text-white">{index + 1}. {ques.content}</h3>
                                                                  <ul className="w-[90%] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"> */}
                                                                  <QuizQuestion indexQuestion={index} question={ques} handleChooseAnswer={handleChooseAnswer} showScore={false}/>

                                                                  {/* <li onClick={() => handleChooseAnswer(ques.id, ques.firstAnswer)} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                                                              <div className="flex items-center ps-3">
                                                                                    <input
                                                                                          id={`list-radio-license-1-${ques.id}`} value="" type="radio" name={`list-radio-${ques.id}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                                                    <label htmlFor={`list-radio-license-1-${ques.id}`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                                          {ques.firstAnswer}</label>
                                                                              </div>
                                                                        </li>
                                                                        <li onClick={() => handleChooseAnswer(ques.id, ques.secondAnswer)} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                                                              <div className="flex items-center ps-3">
                                                                                    <input
                                                                                          id={`list-radio-license-2-${ques.id}`} value="" type="radio" name={`list-radio-${ques.id}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                                                    <label htmlFor={`list-radio-license-2-${ques.id}`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                                          {ques.secondAnswer} </label>
                                                                              </div>
                                                                        </li>
                                                                        <li onClick={() => handleChooseAnswer(ques.id, ques.thirdAnswer)} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                                                              <div className="flex items-center ps-3">
                                                                                    <input
                                                                                          id={`list-radio-license-3-${ques.id}`} value="" type="radio" name={`list-radio-${ques.id}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                                                    <label htmlFor={`list-radio-license-3-${ques.id}`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                                          {ques.thirdAnswer} </label>
                                                                              </div>
                                                                        </li>
                                                                        <li onClick={() => handleChooseAnswer(ques.id, ques.fourthAnswer)} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                                                              <div className="flex items-center ps-3">
                                                                                    <input
                                                                                          id={`list-radio-license-4-${ques.id}`} value="" type="radio" name={`list-radio-${ques.id}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                                                    <label htmlFor={`list-radio-license-4-${ques.id}`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                                          {ques.fourthAnswer} </label>
                                                                              </div>
                                                                        </li> */}
                                                                  {/* </ul> */}
                                                            </div>
                                                      })
                                                }
                                                <div className='flex justify-end items-center opacity-95 px-10 py-5    rounded-lg select-none mr-10 mt-1' >
                                                      <div onClick={() => handleSubmit()}
                                                            className='hover:bg-black hover:text-white flex select-none cursor-pointer justify-center items-center rounded-lg border-[3px] py-2 px-5 bg-white border-black' variant="outlined">{t('Submit')}</div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {

                  }

            </>
      )
}

export default DoMCTest
