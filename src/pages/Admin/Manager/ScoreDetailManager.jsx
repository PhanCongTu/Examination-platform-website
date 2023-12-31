import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { getScoreOfStudentService } from '../../../services/UserService';
import classroomPNG from '../../../assets/classroomPNG.png';
import Path from '../../../utils/Path';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import clsx from 'clsx';
function ScoreDetailManager() {
      document.title = 'Score detail';
      const navigate = useNavigate();
      let location = useLocation();
      const [MCTestId, setMCTestId] = useState(location?.state?.testId);
      const [StudentId, setStudentId] = useState(location?.state?.studentId);
      const [score, setScore] = useState();

      useEffect(() => {
            getScoreOfStudentService(StudentId, MCTestId)
                  .then((res) => {
                        console.log(res);
                        setScore(res);
                  })
                  .catch((err) => {
                  })
      }, [])

      return (
            <>
                  <div className='min-h-screen h-full w-screen  bg-repeat p-5 flex justify-center ' style={{ backgroundImage: "url(" + classroomPNG + ")" }}>
                        <div className='bg-white opacity-95 min-h-screen h-full w-[80%] pt-6 rounded-lg select-none' >
                              <div onClick={() => navigate(-1)}
                                    className='flex justify-start items-center ml-10 cursor-pointer w-fit rounded-lg p-1'>
                                    <FontAwesomeIcon className='mr-3' icon={faLeftLong} /> Back to the previous page
                              </div>
                              <div className='flex  justify-center items-center opacity-95  rounded-lg select-none' >
                                    <div className='w-[80%]  min-h-screen h-full opacity-95 rounded-lg select-none' >

                                          {
                                                score ? <>
                                                      <div className='bg-white opacity-100 flex justify-center pt-16 pb-10 '>

                                                            <div className=" w-1/2 flex flex-col items-center bg-slate-100 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-[80%] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                                                  <div className="flex flex-col w-full justify-between p-4 leading-normal">
                                                                        <h5 className="flex justify-center mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">

                                                                              {score.totalScore >= score.targetScore ?
                                                                                    <>
                                                                                          <p className='text-green-600' >Passed</p>
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                          <p className='text-red-600' >Failed</p>
                                                                                    </>
                                                                              }
                                                                        </h5>
                                                                        <p className="py-5 text-[50px] flex justify-center items-end mb-3 font-normal text-black dark:text-gray-400 select-none">
                                                                              <strong>{score?.totalScore} </strong>
                                                                              <span className='text-[20px] pb-3'>/10</span>
                                                                        </p>
                                                                        <div className=" text-[18px] mb-1 font-normal text-black dark:text-gray-400 select-none">
                                                                              <p><strong>Exam name:</strong> {score?.multipleChoiceTest?.testName}</p>
                                                                              <p><strong>Submitted on:</strong> {format(score?.submittedDate, 'MMM dd, yyy h:mm a')}</p>
                                                                              <p><strong>Target score:</strong> {score?.targetScore || 0} / 10</p>
                                                                              <p><strong>Test description:</strong> {score?.multipleChoiceTest?.description || 0}</p>
                                                                        </div>


                                                                  </div>
                                                            </div>
                                                      </div>
                                                </> : <>
                                                      <div className="grid w-full h-32 mt-5 px-4 bg-white place-content-center">
                                                            <div className="text-center">
                                                                  <h1
                                                                        className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                                                                  >
                                                                        Uh-oh!
                                                                  </h1>
                                                                  <p className="mt-4 text-gray-500">We cannot find any result of this test.</p>
                                                                  <p className="my-2 text-gray-500">Maybe you didn't take this exam!</p>
                                                            </div>
                                                      </div>
                                                </>
                                          }
                                          {
                                                score?.submittedQuestions?.length > 0 && <div className='pl-10 pb-10 rounded-lg select-none bg-slate-200' >
                                                      {
                                                            score?.submittedQuestions?.map((ques, index) => {
                                                                  return <div key={index} className='pt-10'>
                                                                        <h3 className="pl-3 mb-4 font-semibold text-black dark:text-white">{index + 1}. {ques.content}</h3>
                                                                        <ul className="w-[90%] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                                                              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                                                                    <div className="flex items-center ps-3">
                                                                                          <input disabled checked={ques.firstAnswer === ques.submittedAnswer}
                                                                                                id={`list-radio-license-1-${ques.id}`} value="" type="radio" name={`list-radio-${ques.id}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                                                          <label htmlFor={`list-radio-license-1-${ques.id}`} className={clsx(ques.firstAnswer === ques.correctAnswer ? "text-red-600" : "text-gray-900", "w-full py-3 ms-2 text-sm font-medium dark:text-gray-300")}>
                                                                                                {ques.firstAnswer}</label>
                                                                                    </div>
                                                                              </li>
                                                                              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                                                                    <div className="flex items-center ps-3">
                                                                                          <input disabled checked={ques.secondAnswer === ques.submittedAnswer}
                                                                                                id={`list-radio-license-2-${ques.id}`} value="" type="radio" name={`list-radio-${ques.id}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                                                          <label htmlFor={`list-radio-license-2-${ques.id}`} className={clsx(ques.secondAnswer === ques.correctAnswer ? "text-red-600" : "text-gray-900", "w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300")}>
                                                                                                {ques.secondAnswer} </label>
                                                                                    </div>
                                                                              </li>
                                                                              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                                                                    <div className="flex items-center ps-3">
                                                                                          <input disabled checked={ques.thirdAnswer === ques.submittedAnswer}
                                                                                                id={`list-radio-license-3-${ques.id}`} value="" type="radio" name={`list-radio-${ques.id}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                                                          <label htmlFor={`list-radio-license-3-${ques.id}`} className={clsx(ques.thirdAnswer === ques.correctAnswer ? "text-red-600" : "text-gray-900", "w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300")}>
                                                                                                {ques.thirdAnswer} </label>
                                                                                    </div>
                                                                              </li>
                                                                              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                                                                    <div className="flex items-center ps-3">
                                                                                          <input disabled checked={ques.fourthAnswer === ques.submittedAnswer}
                                                                                                id={`list-radio-license-4-${ques.id}`} value="" type="radio" name={`list-radio-${ques.id}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                                                          <label htmlFor={`list-radio-license-4-${ques.id}`} className={clsx(ques.fourthAnswer === ques.correctAnswer ? "text-red-600" : "text-gray-900", "w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300")}>
                                                                                                {ques.fourthAnswer} </label>
                                                                                    </div>
                                                                              </li>

                                                                        </ul>
                                                                  </div>
                                                            })
                                                      }
                                                </div>
                                          }
                                          <div className="flex w-full justify-center p-4 leading-normal">
                                                <NavLink to={-1}
                                                      className='flex w-80 select-none cursor-pointer justify-center items-center rounded-lg border-[2px] py-1 bg-white text-red-600 border-red-600' variant="outlined">Back to previous page</NavLink>
                                          </div>

                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      )
}

export default ScoreDetailManager