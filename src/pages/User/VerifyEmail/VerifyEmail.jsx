import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { sendEmailVerifyCodeService, verifyEmailService } from '../../../services/UserService';
import { getUserInfo, removeCredential, saveCredential } from '../../../services/ApiService';
import { toast } from 'react-toastify';
import Path from '../../../utils/Path';
function VerifyEmail() {
      const navigate = useNavigate();
      document.title = 'Verify email address';
      const [code, setCode] = React.useState();
      const [isSend, setIsSend] = React.useState(false);


      const handleSendEmailVerifyCode = () => {
            setIsSend(true)
            sendEmailVerifyCodeService()
                  .then(ress => { })
                  .catch(err => {
                        removeCredential()
                        navigate(Path.LOGIN)
                  })
      }
      const handleCodeChange = (code) => {
            setCode(code)
      }
      const handleVerifyEmail = () => {
            code && verifyEmailService(code)
                  .then(res => {
                        navigate(Path.HOME)
                        toast.success(`Verify successfully!`, {
                              position: toast.POSITION.TOP_RIGHT,
                        });
                        const userInfor = JSON.parse(getUserInfo());
                        userInfor.isEmailAddressVerified = true;
                        saveCredential(userInfor);
                  })
                  .catch(err => {
                        toast.error(`Fail! Please verify again`, {
                              position: toast.POSITION.TOP_RIGHT,
                        });
                  })
      }
      return (
            <div className='mt-12 select-none'>
                  <div className="mx-auto max-w-screen-xl px-4 py-2 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-lg">
                              <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                                    Welcome to  <br /> our examination platform
                              </h1>

                              <div className="mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                                    <h1 className="text-center text-[25px] font-medium">Verify your email address</h1>
                                    <p className='text-center text-sm text-black'>Your have to verify your email address to be added in the classroom</p>

                                    <div className="flex justify-center items-center ">
                                          <div className="relative w-80">
                                                <input onChange={(e) => handleCodeChange(e.target.value)}
                                                      type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the verify code" required />
                                                <button onClick={() => handleVerifyEmail()}
                                                      className="text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                      Verify</button>
                                          </div>
                                    </div>
                                    <p onClick={() => handleSendEmailVerifyCode()}
                                          className='underline cursor-pointer text-center text-sm text-gray-500'>{isSend ? "Send again" : "Send code"}</p>
                                    <div className=" flex justify-end items-center ">
                                          <NavLink className=' text-center rounded-lg text-black0 py-1 px-5 border-black border-2 bg-white text-sm' to="/home" >Verify later</NavLink>
                                    </div>

                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default VerifyEmail