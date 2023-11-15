
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../components/form-controls/InputField/InputField';
import Button from '../../components/form-controls/Button/Button';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAccessToken, loginInService, saveCredential } from '../../services/ApiService';
import Path from '../../utils/Path';

const USERNAME = 'loginName';
const PASSWORD = 'password';

const Login = () => {
      const navigate = useNavigate();
      // Link tham khao userForm
      // https://viblo.asia/p/react-hook-form-xu-ly-form-de-dang-hon-bao-gio-het-RnB5pAdDKPG
      const initialValue = {
            [USERNAME]: '',
            [PASSWORD]: ''
      };
      const yupObject = yup.object().shape({
            [USERNAME]: yup
                  .string(),
            [PASSWORD]: yup
                  .string()

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
      useEffect(()=>{
            if(getAccessToken()){
                  navigate(Path.HOME);
            }
      },[])
      const [errorMessage, setErrorMessage] = useState();
      // True nếu user nhận mình là giáo viên"
      
      const submitForm = (body) => {
            // Tạo service để chứa response từ API riêng
           
            loginInService(body)
                  .then((response) => {
                        toast.success(`Log in successfully!`, {
                              position: toast.POSITION.TOP_RIGHT,
                        });
                        saveCredential(response) // Lưu thông tin user vào local sto
                        navigate(Path.HOME);
                  })
                  .catch((error) => {
                        toast.error(`Log in fail !`, {
                              position: toast.POSITION.TOP_RIGHT,
                        });
                        setErrorMessage(error.response.data.message)
                  });
            // Nếu thành công thì chuyển đến trang Home
      };
      return (
            <div>
                  <div className="mx-auto max-w-screen-xl px-4 py-2 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-lg">
                              <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                                    Welcome to  <br /> our examination platform
                              </h1>
                              {/*  form.handleSubmit => validate trước khi gọi submitForm*/}
                              <form onSubmit={form.handleSubmit(submitForm)}
                                    className="mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                              >
                                    <p className="text-center text-lg font-medium">Log in</p>

                                    <InputField name={USERNAME} label="Username" form={form} />
                                    <InputField name={PASSWORD} type ="password" label="Password" form={form} />
                                    {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
                                    <Button className= "bg-blue-800" isSubmiting={form.formState.isSubmitting} type='submit' >Log in</Button>
                                    <div>
                                    <p className="text-center text-sm text-gray-500">
                                          {/* NavLink dùng để redirect đến link được define trong router (App.js) */}
                                          Haven't an account? &nbsp;
                                          <NavLink className='underline text-sm' to="/register" >Register</NavLink>
                                          
                                    </p>
                                    <p className="text-center text-sm text-gray-500">
                                          {/* NavLink dùng để redirect đến link được define trong router (App.js) */}
                                          Don't remember password? &nbsp;
                                          <NavLink className='underline text-sm' to="/forgot" >Forgot password</NavLink>
                                    </p>
                                    </div>
                                    
                              </form>
                        </div>
                  </div>
            </div>
      )
}

export default Login
