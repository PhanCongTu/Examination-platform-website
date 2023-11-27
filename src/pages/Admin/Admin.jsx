import React, { useEffect, useState } from 'react'
import { Sidebar } from '../../components/form-controls/Nav/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { getAccessToken, getRoles } from '../../services/ApiService'
import Path from '../../utils/Path'
import { ROLE_ADMIN } from '../../utils/Constant'


export const Admin = () => {
  const [isClick, setClick] = useState(false);
  let navigate = useNavigate();

  const handleClick = () => {
    setClick(true);
  }

  useEffect((
  ) => {
    let accessToken = getAccessToken();
    let roles = getRoles();
    if (!accessToken || !roles.includes(ROLE_ADMIN)) {
      console.log("CHUA DANG NHAP");
      navigate(Path.LOGIN);
    }
  }, [])
  return (
    <div className='flex h-full w-full '>
      <div>
        <button onClick={() => { handleClick() }} type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>
      </div>

      {isClick && (<div className='fixed top-0 left-0 w-[250px] '>

        <Sidebar handleOnClick={setClick} />

      </div>)}
      <div className={`m-auto ${isClick && 'pl-60'}`}>
        <Outlet />
      </div>


    </div>
  )
}