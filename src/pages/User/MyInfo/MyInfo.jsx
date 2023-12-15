import React, { useEffect } from 'react'
import { changePasswordService, myInfomationService, updateUserProfileService } from '../../../services/UserService';
import { useNavigate } from 'react-router-dom';
import Path from '../../../utils/Path';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { displayNameInvalid, emailInvalid, emailRegex, passwordInvalid, passwordRegex } from '../../../utils/Constant';
function MyInfo() {
      const navigate = useNavigate()
      document.title = 'My infomation';
      // State for updating user profile
      const [toggleUpdateEmail, setToggleUpdateEmail] = React.useState(false);
      const [loginName, setLoginName] = React.useState("");
      const [displayName, setDisplayName] = React.useState("");
      const [emailAddress, setEmailAddress] = React.useState("");
      const [newEmailAddress, setNewEmailAddress] = React.useState("");
      const [isEmailAddressVerified, setIsEmailAddressVerified] = React.useState(false);

      // State for update new password
      const [oldPassword, setOldPassword] = React.useState("");
      const [newPassword, setNewPassword] = React.useState("");
      const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
      const [Error, setError] = React.useState();
      useEffect(() => {
            getMyInfo()
      }, [])
      const getMyInfo = () => {
            myInfomationService()
                  .then(res => {
                        setLoginName(res.loginName)
                        setDisplayName(res.displayName)
                        setEmailAddress(res.emailAddress)
                        setNewEmailAddress(res.newEmailAddress === null ? "" : res.newEmailAddress)
                        setIsEmailAddressVerified(res.isEmailAddressVerified)
                  })
                  .catch(err => {
                        navigate(Path.LOGIN)
                  })
      }

      const handleToggleUpdateEmail = () => {
            setToggleUpdateEmail(pre => !pre)
      }

      const handleChangeDisplayName = (value) => {
            setDisplayName(value)
      }
      const handleChangeEmailAddress = (value) => {
            setNewEmailAddress(value)
      }
      const handleChangeOldPassword = (value) => {
            setOldPassword(value)
      }
      const handleChangeNewPassword = (value) => {
            setNewPassword(value)
      }
      const handleChangeConfirmNewPassword = (value) => {
            setConfirmNewPassword(value)
      }
      const handleSubmitUpdateMyInfo = () => {
            updateUserProfileService(displayName, newEmailAddress)
                  .then(res => {
                        toast.success(`Update successfully!`, {
                              position: toast.POSITION.TOP_RIGHT,
                        });
                  })
                  .catch(err => {
                        getMyInfo()
                        toast.error(`Update fail !`, {
                              position: toast.POSITION.TOP_RIGHT,
                        });
                  })
      }
      const handleChangePassword = () => {
            setError()
            if (newPassword !== confirmNewPassword) {
                  setError("Passwords does not match")
            } else if (!newPassword.match(passwordRegex)) {
                  setError(passwordInvalid)
            } else {
                  changePasswordService(oldPassword, newPassword)
                        .then(res => {
                              toast.success(`Update successfully!`, {
                                    position: toast.POSITION.TOP_RIGHT,
                              });
                        })
                        .catch(err => {
                              setError(err?.message)
                        })
            }
      }
      return (
            <>
                  <div className='grid pt-5 grid-cols-7 gap-10 w-[80%] mx-auto'>
                        <div className=' col-span-4 select-none'>
                              <h1 className='text-[30px] font-bold pl-5 pt-3' >My Information</h1>
                              <hr className="h-px mb-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                              <div className='grid grid-cols-2 gap-5'>
                                    <div className=''>
                                          <h3 className='text-[15px] font-bold pl-5 pt-3' >Login name</h3>
                                          <input disabled={true} value={loginName}
                                                type="text" id="loginName"
                                                className="opacity-90 pointer-events-none cursor-default block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 " required />
                                    </div>
                                    <div className=''>
                                          <h3 className='text-[15px] font-bold pl-5 pt-3' >Email address <FontAwesomeIcon onClick={() => handleToggleUpdateEmail()} className='pl-5 cursor-pointer' icon={faPenToSquare} /></h3>
                                          <input disabled={true} value={emailAddress}
                                                type="text" id="emailAddress"
                                                className="opacity-90 pointer-events-none cursor-default block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 " required />

                                    </div>
                              </div>
                              <div className='grid grid-cols-2 gap-5'>
                                    <div className=''>
                                          <h3 className='text-[15px] font-bold pl-5 pt-3' >Display name</h3>
                                          <input value={displayName}
                                                onChange={(e) => handleChangeDisplayName(e.target.value)}
                                                type="text" id="displayName"
                                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-black rounded-lg bg-gray-50 " required />
                                    </div>
                                    {(toggleUpdateEmail || newEmailAddress !== "") &&
                                          <div className=''>
                                                <h3 className='text-[15px] font-bold pl-5 pt-3' >New email address</h3>
                                                <input value={newEmailAddress}
                                                      onChange={(e => handleChangeEmailAddress(e.target.value))}
                                                      type="text" id="displayName"
                                                      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-black rounded-lg bg-gray-50 " required />
                                          </div>
                                    }
                              </div>
                              <div className='flex justify-end items-center opacity-95 px-10 py-5    rounded-lg select-none mr-10 mt-1' >
                                    <div onClick={() => handleSubmitUpdateMyInfo()}
                                          className='hover:bg-black hover:text-white flex select-none cursor-pointer justify-center items-center rounded-lg border-[3px] py-2 px-5 bg-white border-black' variant="outlined">Update</div>
                              </div>
                        </div>
                        <div className=' col-span-3 pl-10'>
                              <h1 className='text-[30px] font-bold pl-5 pt-3' >Change password</h1>
                              <hr className="h-px mb-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                              <div className=''>
                                    <div className=''>
                                          <h3 className='text-[15px] font-bold pl-5 pt-3' >Old password</h3>
                                          <input onChange={(e) => handleChangeOldPassword(e.target.value)}
                                                value={oldPassword}
                                                type="password" id="oldPassword"
                                                className=" block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 " required />
                                    </div>
                                    <div className=''>
                                          <h3 className='text-[15px] font-bold pl-5 pt-3' >New password</h3>
                                          <input onChange={(e) => handleChangeNewPassword(e.target.value)}
                                                value={newPassword}
                                                type="password" id="newPassword"
                                                className=" block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 " required />
                                    </div>
                                    <div className=''>
                                          <h3 className='text-[15px] font-bold pl-5 pt-3' >Confirm your new password</h3>
                                          <input onChange={(e) => handleChangeConfirmNewPassword(e.target.value)}
                                                value={confirmNewPassword}
                                                type="password" id="confirmNewPassword"
                                                className=" block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 " required />
                                    </div>
                                    {Error &&
                                          <div className='pt-1 pl-3 text-red-500' >
                                                {Error}
                                          </div>
                                    }
                              </div>
                              {(oldPassword && newPassword && confirmNewPassword) &&
                                    < div className='flex justify-end items-center opacity-95 px-10 py-5    rounded-lg select-none mr-10 mt-1' >
                                          <button onClick={() => handleChangePassword()}
                                                className=' hover:bg-black hover:text-white flex select-none cursor-pointer justify-center items-center rounded-lg border-[3px] py-2 px-5 bg-white border-black' variant="outlined">Change</button>
                                    </div >
                              }
                        </div>

                  </div >

            </>
      )
}

export default MyInfo