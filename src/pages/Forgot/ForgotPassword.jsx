import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../components/form-controls/InputField/InputField';
import Button from '../../components/form-controls/Button/Button';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { codeResetService, resetPasswordService } from '../../services/ApiService';
import Path from '../../utils/Path';
import { emailInvalid, emailRegex, passwordInvalid, passwordRegex } from '../../utils/Constant';
import clsx from 'clsx';

const CONFIRMPASSWORD = 'confirmPassword';
const PASSWORD = 'password';
const EMAIL = 'emailAddress';

const ForgotPassword = () => {
      const navigate = useNavigate();
      // Link tham khao userForm
      // https://viblo.asia/p/react-hook-form-xu-ly-form-de-dang-hon-bao-gio-het-RnB5pAdDKPG
      const initialValue = {
            [EMAIL]: ''
      };
      const yupObject = yup.object().shape({

            [PASSWORD]: yup
                  .string()
                  .matches(passwordRegex, passwordInvalid),
            [CONFIRMPASSWORD]: yup
                  .string()
                  .matches(passwordRegex, passwordInvalid),
            [EMAIL]: yup
                  .string()
                  .matches(emailRegex, emailInvalid),
      });
      const form = useForm({
            mode: 'onSubmit',
            defaultValues: initialValue,
            criteriaMode: "firstError",
            // resolver dùng để validate với yup
            // Link tham khảo Yep:
            // https://github.com/jquense/yup
            // https://viblo.asia/p/react-hook-form-with-yup-resolver-RQqKLqG6Z7z
            // https://viblo.asia/p/validation-voi-yup-trong-react-XL6lAVbJ5ek
            // https://www.techzaion.com/validation-with-yup
            resolver: yupResolver(yupObject)
      })

      const [errorMessage, setErrorMessage] = useState();
      // True nếu user nhận mình là giáo viên"
      const [isCode, setIsCode] = useState(false);
      const [email, setEmail] = useState('');


      const submitForm = (body) => {
                  if (body.password === body.confirmPassword) {
                        resetPasswordService(body,email).then((res) => {
                              toast.success(`Reset password successfully!`, {
                                    position: toast.POSITION.TOP_RIGHT,
                              });
                              navigate(Path.LOGIN);
                        }).catch(
                              (e) => {
                                    toast.error(`Error reset password!`, {
                                          position: toast.POSITION.TOP_RIGHT,
                                    });
                                    setErrorMessage(e.response)
                              }
                        )
                  }
                  else {
                        setErrorMessage("Password and confirm password do not match");
                  }

            
      };

      const handlerSendCode = (emailAddress) => {
            if(!isCode){

           
            setIsCode(true);
           
            }
            codeResetService(emailAddress).then(
                  () => {
                        toast.success(`Code reset password is sended to email!`, {
                              position: toast.POSITION.TOP_RIGHT,
                        });
                  }
            ).catch(
                  (e) => {
                        toast.error(`Error send code reset password`, {
                              position: toast.POSITION.TOP_RIGHT,
                        });
                        setErrorMessage(e.response)
                  }
            )
            
      }


      return (
            <div>
                  <div className="mx-auto max-w-screen-xl px-4 py-2 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-lg">
                              <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                                    Welcome to  <br /> our examination platform
                              </h1>
                              {/*  form.handleSubmit => validate trước khi gọi submitForm*/}
                              <p className="text-center text-lg font-medium">Forgot password</p>
                              <div >
                                    <label htmlFor={EMAIL} className="block pb-1 text-sm font-medium text-gray-700">Email address</label>
                                    <div className="relative flex justify-center">
                                          <input
                                                type={ 'text'}
                                                name={EMAIL}
                                                className={clsx("text-opacity-50", "border-2","border-gray-500/75", "w-full", "rounded-lg", "p-4", "pe-12", "text-sm", "shadow-sm")}
                                                placeholder="Enter Email address"
                                                onChange={(e)=>{
                                                     setEmail(e.target.value);
                                                }}
                                          />
                                          
                                    </div>
                              </div>
                              {!isCode &&
                              <Button className="bg-blue-800" handleOnClick={()=>{handlerSendCode(email)}} >
                                    Send code</Button>}
                              {isCode && (
                                    <>
                                          <form onSubmit={form.handleSubmit(submitForm)}
                                                className="mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                                          >
                                                {
                                                      <>
                                                            <InputField name="code" label="Code verify" form={form} >
                                                                  <Button className="bg-blue-800 w-fit h-auto ml-[5px]" children="Send code again" handleOnClick={()=>handlerSendCode(email)} />
                                                            </InputField>
                                                            <InputField name={PASSWORD} label="Password" form={form} />
                                                            <InputField name={CONFIRMPASSWORD} label="Confirm Password" form={form} />
                                                      </>
                                                }
                                                {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
                                                <Button className="bg-blue-800" isSubmiting={form.formState.isSubmitting} type='submit' >Save password</Button>
                                          </form>
                                    </>
                              )
                              }
                              <p className="text-center text-sm text-gray-500">
                                    {/* NavLink dùng để redirect đến link được define trong router (App.js) */}
                                    <NavLink className='underline text-sm' to="/login" >Login</NavLink>
                              </p>

                        </div>
                  </div>
            </div>
      )
}

export default ForgotPassword
