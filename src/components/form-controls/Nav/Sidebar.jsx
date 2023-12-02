import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Path from '../../../utils/Path'
import { removeCredential } from '../../../services/ApiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

export const Sidebar = (props) => {
   let navigate = useNavigate();
   const { handleOnClick } = props;
   const handleLogOut = () => {

      // handleOnClick(false);
      navigate(Path.LOGIN);
      removeCredential();

   }
   return (
      <div className=' h-auto w-[250px]'>
         <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>
         <aside id="logo-sidebar" className=" top-0 left-0 z-40 w-[280px] h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full w-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
               <p className="flex items-center pl-2.5 mb-5">
                  <svg className="h-6 mr-3 sm:h-7" fill="#000000" width="40px" height="40px" viewBox="0 0 30 30" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>administrator-solid</title> <circle cx="14.67" cy="8.3" r="6" className="clr-i-solid clr-i-solid-path-1"></circle><path d="M16.44,31.82a2.15,2.15,0,0,1-.38-2.55l.53-1-1.09-.33A2.14,2.14,0,0,1,14,25.84V23.79a2.16,2.16,0,0,1,1.53-2.07l1.09-.33-.52-1a2.17,2.17,0,0,1,.35-2.52,18.92,18.92,0,0,0-2.32-.16A15.58,15.58,0,0,0,2,23.07v7.75a1,1,0,0,0,1,1H16.44Z" className="clr-i-solid clr-i-solid-path-2"></path><path d="M33.7,23.46l-2-.6a6.73,6.73,0,0,0-.58-1.42l1-1.86a.35.35,0,0,0-.07-.43l-1.45-1.46a.38.38,0,0,0-.43-.07l-1.85,1a7.74,7.74,0,0,0-1.43-.6l-.61-2a.38.38,0,0,0-.36-.25H23.84a.38.38,0,0,0-.35.26l-.6,2a6.85,6.85,0,0,0-1.45.61l-1.81-1a.38.38,0,0,0-.44.06l-1.47,1.44a.37.37,0,0,0-.07.44l1,1.82A7.24,7.24,0,0,0,18,22.83l-2,.61a.36.36,0,0,0-.26.35v2.05a.36.36,0,0,0,.26.35l2,.61a7.29,7.29,0,0,0,.6,1.41l-1,1.9a.37.37,0,0,0,.07.44L19.16,32a.38.38,0,0,0,.44.06l1.87-1a7.09,7.09,0,0,0,1.4.57l.6,2.05a.38.38,0,0,0,.36.26h2.05a.38.38,0,0,0,.35-.26l.6-2.05a6.68,6.68,0,0,0,1.38-.57l1.89,1a.38.38,0,0,0,.44-.06L32,30.55a.38.38,0,0,0,.06-.44l-1-1.88a6.92,6.92,0,0,0,.57-1.38l2-.61a.39.39,0,0,0,.27-.35V23.82A.4.4,0,0,0,33.7,23.46Zm-8.83,4.72a3.34,3.34,0,1,1,3.33-3.34A3.34,3.34,0,0,1,24.87,28.18Z" className="clr-i-solid clr-i-solid-path-3"></path> <rect x="0" y="0" width="36" height="36" fillOpacity="0"></rect> </g></svg>

                  <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Admin</span>
               </p>
               <ul className="space-y-2 font-medium w-[250px]">
                  <li className=''>
                     <NavLink className={({ isActive }) => (isActive ? 'flex items-center p-2 rounded-lg dark:text-white bg-gradient-to-r from-orange-300 to-red-300 text-[#fff]' : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group')} to={Path.AMCLASSMANAGER} onClick={() => handleOnClick(false)} >
                        <svg width="20px" height="20px" className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 392.60 392.60" stroke="#95505b" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)">
                           <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                           <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="2.355588"></g><g id="SVGRepo_iconCarrier">
                              <path style={{ fill: "#FFFFFF" }} d="M359.855,142.481H32.743c-6.012,0-10.925,4.848-10.925,10.925v206.416 c0,6.012,4.848,10.925,10.925,10.925h327.111c6.012,0,10.925-4.849,10.925-10.925V153.406 C370.78,147.329,365.867,142.481,359.855,142.481z"></path>
                              <rect x="43.604" y="164.267" style={{ fill: "#56ACE0" }} width="305.325" height="184.63"></rect> <g>
                                 <path style={{ fill: "#194F82" }} d="M150.271,270.158c-18.166,0.711-31.612,13.123-31.612,30.901c0,18.101,14.739,31.289,31.612,30.901 c18.166-0.711,31.612-13.123,31.612-30.901C181.947,282.958,167.143,269.705,150.271,270.158z M168.113,300.994 c-0.711,11.442-7.822,18.941-17.842,19.265c-8.792,0.259-18.101-8.339-17.842-19.265h0.065 c0.711-11.442,7.822-18.941,17.842-19.265c8.792-0.259,18.101,8.339,17.842,19.265H168.113z"></path>
                                 <path style={{ fill: "#194F82" }} d="M221.382,270.158c-18.166,0.711-31.612,13.123-31.612,30.901c0,18.101,14.739,31.289,31.612,30.901 c18.166-0.711,31.612-13.123,31.612-30.901C253.123,282.958,238.319,269.705,221.382,270.158z M239.289,300.994 c-0.711,11.442-7.822,18.941-17.842,19.265c-8.792,0.259-18.101-8.339-17.842-19.265h0.065 c0.711-11.442,7.822-18.941,17.842-19.265c8.792-0.259,18.101,8.339,17.842,19.265H239.289z"></path>
                                 <path style={{ fill: "#194F82" }} d="M108.832,291.297c-0.517-15.321-8.404-20.04-26.053-19.846H59.96v59.798h13.446v-19.071h9.244 l13.382,19.071h16.549L97.39,309.915C105.018,307.135,108.832,300.865,108.832,291.297z M83.232,300.671h-9.826v-17.713h10.149 c6.788,0.129,11.636,0.905,11.636,8.404C95.063,298.731,91.507,300.606,83.232,300.671z"></path>
                                 <polygon style={{ fill: "#194F82" }} points="298.117,304.356 282.602,271.451 264.436,271.451 264.436,331.313 277.883,331.313 277.883,293.624 294.109,326.335 302.061,326.335 318.416,293.624 318.416,331.313 331.863,331.313 331.863,271.451 313.762,271.451 "></polygon> </g>
                              <path style={{ fill: "#FFC10D" }} d="M196.299,43.636c6.012,0,10.925-4.848,10.925-10.925c0-6.012-4.848-10.925-10.925-10.925 s-10.925,4.848-10.925,10.925S190.287,43.636,196.299,43.636z"></path> <g>
                                 <path style={{ fill: "#194F82" }} d="M359.855,120.695H324.17l-95.289-90.182C227.717,13.511,213.56,0,196.299,0 c-17.778,0-32.323,14.287-32.711,32l-95.095,88.695h-35.75c-18.036,0-32.711,14.675-32.711,32.711v206.416 c0,18.101,14.675,32.776,32.711,32.776h327.111c18.036,0,32.711-14.675,32.711-32.711V153.406 C392.566,135.37,377.891,120.695,359.855,120.695z M370.78,359.822c0,6.012-4.848,10.925-10.925,10.925H32.743 c-6.012,0-10.925-4.849-10.925-10.925V153.406c0-6.012,4.848-10.925,10.925-10.925h327.111c6.012,0,10.925,4.848,10.925,10.925 V359.822L370.78,359.822z M196.299,21.786c6.012,0,10.925,4.848,10.925,10.925s-4.848,10.925-10.925,10.925 s-10.925-4.848-10.925-10.925S190.287,21.786,196.299,21.786z M171.733,54.238c6.012,6.853,14.739,11.184,24.566,11.184 c10.15,0,19.265-4.655,25.212-11.895l70.853,67.168H100.493L171.733,54.238z"></path>
                                 <path style={{ fill: "#194F82" }} d="M89.244,193.422c6.335,0,11.636,2.65,15.903,7.952l8.404-9.503 c-6.723-7.564-14.998-11.378-24.889-11.378c-16.097-0.065-31.741,12.347-31.741,31.418c0,17.261,13.382,31.095,32,31.095 c9.244,0,17.39-3.879,24.242-11.572l-8.663-8.857c-4.202,5.236-9.632,7.887-16.226,7.887c-11.119-0.453-17.778-9.115-17.455-18.618 C70.562,201.891,78.707,193.034,89.244,193.422z"></path>
                                 <polygon style={{ fill: "#194F82" }} points="163.071,230.335 137.341,230.335 137.341,181.915 123.83,181.915 123.83,242.295 163.071,242.295 "></polygon>
                                 <path style={{ fill: "#194F82" }} d="M215.952,242.295h14.352l-26.117-60.444h-13.059l-26.117,60.444h14.352l5.624-13.059h25.341 L215.952,242.295z M190.093,217.471l7.564-17.519l7.499,17.519H190.093z"></path>
                                 <path style={{ fill: "#194F82" }} d="M317.511,205.899c-7.046-1.939-13.123-3.038-13.382-7.887c0.129-3.879,3.426-6.465,7.24-5.883 c5.56,0,10.99,2.004,16.226,5.947l6.788-9.891c-6.012-5.172-14.739-8.21-22.626-7.952c-11.572,0-21.721,5.818-21.527,18.036 c-0.065,13.899,9.18,15.58,20.299,19.135c6.077,1.616,11.83,3.491,11.119,7.564c-0.646,4.655-3.685,6.012-7.952,5.947 c-5.56,0-11.507-2.844-18.101-8.598l-8.016,9.891c7.628,7.111,16.226,10.667,25.794,10.667 c12.347,0.711,22.562-7.628,22.109-18.295C336,214.756,329.535,208.679,317.511,205.899z"></path>
                                 <path style={{ fill: "#194F82" }} d="M280.533,224.711c0.388-9.956-6.077-15.968-18.101-18.747c-7.046-1.939-13.123-3.038-13.382-7.887 c0.129-3.879,3.426-6.465,7.24-5.883c5.56,0,10.99,2.004,16.226,5.947l6.788-9.891c-6.012-5.172-14.739-8.21-22.626-7.952 c-11.572,0-21.721,5.818-21.527,18.036c-0.065,13.899,9.18,15.58,20.299,19.135c6.077,1.616,11.83,3.491,11.119,7.564 c-0.646,4.655-3.685,6.012-7.952,5.947c-5.56,0-11.507-2.844-18.101-8.598l-8.016,9.891c7.628,7.111,16.226,10.667,25.794,10.667 C270.707,243.717,280.921,235.378,280.533,224.711z"></path> </g> </g>
                        </svg>
                        <span className="ml-3">Class management</span>
                     </NavLink>
                  </li>
                  {/* <li className=''>
                     <NavLink to={Path.AMTEACHERMANAGER} className={({ isActive }) => (isActive ? 'flex items-center p-2 rounded-lg dark:text-white bg-gradient-to-r from-orange-300 to-red-300 text-[#fff]' : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group')} onClick={() => handleOnClick(false)} >
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                           <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                           <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                           <g id="SVGRepo_iconCarrier">
                              <path d="M10.05 2.53004L4.03002 6.46004C2.10002 7.72004 2.10002 10.54 4.03002 11.8L10.05 15.73C11.13 16.44 12.91 16.44 13.99 15.73L19.98 11.8C21.9 10.54 21.9 7.73004 19.98 6.47004L13.99 2.54004C12.91 1.82004 11.13 1.82004 10.05 2.53004Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M5.63 13.08L5.62 17.77C5.62 19.04 6.6 20.4 7.8 20.8L10.99 21.86C11.54 22.04 12.45 22.04 13.01 21.86L16.2 20.8C17.4 20.4 18.38 19.04 18.38 17.77V13.13" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M21.4 15V9" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g>
                        </svg>

                        <span className="flex-1 ml-3 whitespace-nowrap">Teacher management</span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                     </NavLink>
                  </li> */}
                  {/* <li className=''>
                     <NavLink to={'/admin/score/'} className={({ isActive }) => (isActive ? 'flex items-center p-2 rounded-lg dark:text-white bg-gradient-to-r from-orange-300 to-red-300 text-[#fff]' : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group')} onClick={() => handleOnClick(false)} >

                        <svg width="20px" height="20px" className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 1024 1024" version="1.1" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M905.92 237.76a32 32 0 0 0-52.48 36.48A416 416 0 1 1 96 512a418.56 418.56 0 0 1 297.28-398.72 32 32 0 1 0-18.24-61.44A480 480 0 1 0 992 512a477.12 477.12 0 0 0-86.08-274.24z" fill="#231815"></path><path d="M630.72 113.28A413.76 413.76 0 0 1 768 185.28a32 32 0 0 0 39.68-50.24 476.8 476.8 0 0 0-160-83.2 32 32 0 0 0-18.24 61.44zM489.28 86.72a36.8 36.8 0 0 0 10.56 6.72 30.08 30.08 0 0 0 24.32 0 37.12 37.12 0 0 0 10.56-6.72A32 32 0 0 0 544 64a33.6 33.6 0 0 0-9.28-22.72A32 32 0 0 0 505.6 32a20.8 20.8 0 0 0-5.76 1.92 23.68 23.68 0 0 0-5.76 2.88l-4.8 3.84a32 32 0 0 0-6.72 10.56A32 32 0 0 0 480 64a32 32 0 0 0 2.56 12.16 37.12 37.12 0 0 0 6.72 10.56zM355.84 313.6a36.8 36.8 0 0 0-13.12 18.56l-107.52 312.96a37.44 37.44 0 0 0 2.56 35.52 32 32 0 0 0 24.96 10.56 27.84 27.84 0 0 0 17.28-5.76 43.84 43.84 0 0 0 10.56-13.44 100.16 100.16 0 0 0 7.04-15.36l4.8-12.8 17.6-49.92h118.72l24.96 69.76a45.76 45.76 0 0 0 10.88 19.2 28.8 28.8 0 0 0 20.48 8.32h2.24a27.52 27.52 0 0 0 27.84-15.68 41.28 41.28 0 0 0 0-29.44l-107.84-313.6a36.8 36.8 0 0 0-13.44-19.2 44.16 44.16 0 0 0-48 0.32z m24.32 96l41.6 125.44h-83.2zM594.88 544a66.56 66.56 0 0 0 25.6 4.16h62.4v78.72a29.12 29.12 0 0 0 32 32 26.24 26.24 0 0 0 27.2-16.32 73.28 73.28 0 0 0 4.16-26.24v-66.88h73.6a27.84 27.84 0 0 0 29.44-32 26.56 26.56 0 0 0-16-27.2 64 64 0 0 0-23.04-4.16h-64v-75.84a28.16 28.16 0 0 0-32-30.08 26.56 26.56 0 0 0-27.2 15.68 64 64 0 0 0-4.16 24v66.88h-62.72a69.44 69.44 0 0 0-25.6 4.16 26.56 26.56 0 0 0-15.68 27.2 25.92 25.92 0 0 0 16 25.92z" fill="#231815"></path></g></svg>

                        <span className="flex-1 ml-3 whitespace-nowrap">Score
                           management</span>
                     </NavLink>
                  </li>
                  <li className=''>
                     <NavLink to={'/admin/examination/'} className={({ isActive }) => (isActive ? 'flex items-center p-2 rounded-lg dark:text-white bg-gradient-to-r from-orange-300 to-red-300 text-[#fff]' : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group')} onClick={() => handleOnClick(false)} >
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                           <svg width="20px" height="20px" viewBox="0 0 800 800" className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M676.637,183.386c0.002-0.002,0.004-0.004,0.005-0.005L522.549,29.287c-3.619-3.62-8.62-5.86-14.145-5.86H137.5 c-11.046,0-20,8.954-20,20v713.146c0,11.046,8.954,20,20,20h525c11.046,0,20-8.954,20-20V197.522 C682.5,192.407,680.426,187.203,676.637,183.386z M642.5,736.573h-485V63.427h342.62l114.096,114.095l-85.812,0v-41.788 c0-11.046-8.954-20-20-20s-20,8.954-20,20v61.788c0,11.046,8.954,20,20,20c0,0,92.404,0,134.096,0V736.573z"></path> <path d="M295.217,224.417l-39.854,39.855l-5.697-5.697c-7.811-7.811-20.473-7.811-28.283,0c-7.811,7.81-7.811,20.473,0,28.284 l19.84,19.84c3.75,3.751,8.838,5.858,14.142,5.858c5.305,0,10.392-2.107,14.143-5.858l53.996-53.999 c7.81-7.811,7.81-20.474-0.001-28.284C315.69,216.606,303.027,216.606,295.217,224.417z"></path> <path d="M557.831,312.557h6.646c11.046,0,20-8.954,20-20s-8.954-20-20-20h-6.646c-11.046,0-20,8.954-20,20 S546.785,312.557,557.831,312.557z"></path> <path d="M367.389,272.557c-11.046,0-20,8.954-20,20s8.954,20,20,20h129.609c11.046,0,20-8.954,20-20s-8.954-20-20-20H367.389z"></path> <path d="M557.831,435.552h6.646c11.046,0,20-8.954,20-20s-8.954-20-20-20h-6.646c-11.046,0-20,8.954-20,20 S546.785,435.552,557.831,435.552z"></path> <path d="M496.998,395.552H367.389c-11.046,0-20,8.954-20,20s8.954,20,20,20h129.609c11.046,0,20-8.954,20-20 S508.044,395.552,496.998,395.552z"></path> <path d="M557.831,558.547h6.646c11.046,0,20-8.954,20-20s-8.954-20-20-20h-6.646c-11.046,0-20,8.954-20,20 S546.785,558.547,557.831,558.547z"></path> <path d="M496.998,518.547H367.389c-11.046,0-20,8.954-20,20s8.954,20,20,20h129.609c11.046,0,20-8.954,20-20 S508.044,518.547,496.998,518.547z"></path> <path d="M557.831,681.542h6.646c11.046,0,20-8.954,20-20s-8.954-20-20-20h-6.646c-11.046,0-20,8.954-20,20 S546.785,681.542,557.831,681.542z"></path> <path d="M496.998,641.542H367.389c-11.046,0-20,8.954-20,20s8.954,20,20,20h129.609c11.046,0,20-8.954,20-20 S508.044,641.542,496.998,641.542z"></path> <path d="M255.363,435.552c5.304,0,10.392-2.107,14.142-5.858l53.996-53.996c7.811-7.811,7.811-20.475,0-28.285 s-20.473-7.811-28.283,0l-39.854,39.855l-5.697-5.698c-7.81-7.81-20.474-7.812-28.284-0.001s-7.811,20.474-0.001,28.284 l19.84,19.841C244.972,433.444,250.059,435.552,255.363,435.552z"></path> <path d="M234.239,511.547l-12.856,12.857c-7.81,7.811-7.81,20.474,0.001,28.284c3.905,3.905,9.023,5.857,14.142,5.857 s10.237-1.952,14.143-5.858l12.855-12.855l12.856,12.855c3.904,3.906,9.023,5.858,14.142,5.858s10.237-1.952,14.142-5.858 c7.811-7.811,7.811-20.473,0-28.283l-12.855-12.857l12.856-12.857c7.81-7.811,7.81-20.474-0.001-28.284 c-7.811-7.81-20.474-7.81-28.284,0.001l-12.856,12.856l-12.857-12.856c-7.811-7.811-20.473-7.811-28.283,0s-7.811,20.474,0,28.283 L234.239,511.547z"></path> <path d="M295.217,593.4l-39.854,39.855l-5.697-5.697c-7.811-7.811-20.473-7.811-28.283,0c-7.811,7.81-7.811,20.473,0,28.283 l19.84,19.84c3.75,3.752,8.838,5.858,14.142,5.858c5.305,0,10.392-2.107,14.143-5.858l53.996-53.998 c7.81-7.811,7.81-20.474-0.001-28.284C315.69,585.59,303.027,585.59,295.217,593.4z"></path> </g> </g></svg>
                        </svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">Examination management</span>
                     </NavLink>
                  </li>
                  <li className=''>
                     <NavLink to={'/admin/question/'} className={({ isActive }) => (isActive ? 'flex items-center p-2 rounded-lg dark:text-white bg-gradient-to-r from-orange-300 to-red-300 text-[#fff]' : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group')} onClick={() => handleOnClick(false)} >

                        <svg width="20px" height="20px" viewBox="0 0 24 24" className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M13 15h-1a4.62 4.62 0 0 1 1.803-3.755c.672-.66 1.203-1.182 1.197-2.049A2.188 2.188 0 0 0 12.607 7a2.419 2.419 0 0 0-2.624 2.39h-1a3.19 3.19 0 0 1 1.163-2.557A3.88 3.88 0 0 1 12.606 6 3.173 3.173 0 0 1 16 9.193a3.732 3.732 0 0 1-1.496 2.765A3.636 3.636 0 0 0 13 15zm-1.5 3.5a1 1 0 1 0 1-1 1 1 0 0 0-1 1zm11.3-6A10.3 10.3 0 1 1 12.5 2.2a10.297 10.297 0 0 1 10.3 10.3zm-1 0a9.3 9.3 0 1 0-9.3 9.3 9.31 9.31 0 0 0 9.3-9.3z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">Question management</span>
                     </NavLink>
                  </li> */}
                  <li className=''>
                     <NavLink to={'/admin/student'} className={({ isActive }) => (isActive ? 'flex items-center p-2 rounded-lg dark:text-white bg-gradient-to-r from-orange-300 to-red-300 text-[#fff]' : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group')} onClick={() => handleOnClick(false)}>

                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="64px" height="64px" viewBox="0 0 256 256" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M225.26514,60.20508l-96-32a4.00487,4.00487,0,0,0-2.53028,0l-96,32c-.05713.019-.10815.04809-.16406.06958-.08545.033-.16821.06811-.251.10644a4.04126,4.04126,0,0,0-.415.22535c-.06714.04174-.13575.08007-.20044.12548a3.99,3.99,0,0,0-.47632.39307c-.02027.01953-.0437.0354-.06348.05542a3.97787,3.97787,0,0,0-.44556.53979c-.04077.0586-.07373.12183-.11132.18262a3.99741,3.99741,0,0,0-.23487.43262c-.03613.07837-.06811.15771-.09912.23852a3.96217,3.96217,0,0,0-.144.46412c-.01929.07714-.04126.15234-.05591.2312A3.98077,3.98077,0,0,0,28,64v80a4,4,0,0,0,8,0V69.55005l43.87524,14.625A59.981,59.981,0,0,0,104.272,175.09814a91.80574,91.80574,0,0,0-53.39062,38.71631,3.99985,3.99985,0,1,0,6.70117,4.36914,84.02266,84.02266,0,0,1,140.83447,0,3.99985,3.99985,0,1,0,6.70117-4.36914A91.80619,91.80619,0,0,0,151.728,175.09814a59.981,59.981,0,0,0,24.39673-90.92309l49.14038-16.38013a4.00037,4.00037,0,0,0,0-7.58984ZM180,120A52,52,0,1,1,87.92993,86.85986l38.80493,12.93506a4.00487,4.00487,0,0,0,2.53028,0l38.80493-12.93506A51.85133,51.85133,0,0,1,180,120ZM168.00659,78.44775l-.01294.0044L128,91.7832,44.64893,64,128,36.2168,211.35107,64Z"></path> </g></svg>

                        <span className="flex-1 ml-3 whitespace-nowrap">Student management</span>
                     </NavLink>
                  </li>
                  {/* <li className=''>
                     <NavLink to={Path.AMQUESTIONGROUPMANAGER} className={({ isActive }) => (isActive ? 'flex items-center p-2 rounded-lg dark:text-white bg-gradient-to-r from-orange-300 to-red-300 text-[#fff]' : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group')} onClick={() => handleOnClick(false)}>


                        <FontAwesomeIcon icon={faBook} style={{ color: "#0f0f0f", }} />
                        <span className="flex-1 ml-3 whitespace-nowrap">Question group management</span>
                     </NavLink>
                  </li> */}
                  <NavLink to={'/logout'} className={({ isActive }) => (isActive ? 'flex items-center p-2 rounded-lg dark:text-white bg-gradient-to-r from-orange-300 to-red-300 text-[#fff]' : 'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group')} onClick={() => handleLogOut()} >
                     <li className='flex items-center rounded-lg' >
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                        </svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
                     </li>
                  </NavLink>
               </ul>
            </div>
         </aside>
      </div>
   )
}
