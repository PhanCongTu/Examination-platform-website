import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './headersc'
import './header.css'
import { getAccessToken, getRoles, getUserInfo, removeCredential } from '../../../services/ApiService'
import { ROLE_STUDENT } from '../../../utils/Constant'
import { toast } from 'react-toastify'
import Path from '../../../utils/Path'
import UserIcon from '../../../assets/user.png';
import TestIcon from '../../../assets/test_icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons'

export const Header = () => {
    const [isHovered, setIsHovered] = useState(false);
    let [isStudent, setIsStudent] = useState(false)
    const userInfor = JSON.parse(getUserInfo());
    let navigate = useNavigate();
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const dropdownRef = useRef(null);


    useEffect(() => {
        let accessToken = getAccessToken();
        let roles = getRoles();
        setIsStudent(accessToken && roles.includes(ROLE_STUDENT))
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    /// Sign out
    const handleSignOut = () => {
        setIsStudent(false)
        removeCredential();
        navigate(Path.HOME)
        window.location.reload();
    };
    return (
        <div className='shadow-[5px_9px_30px_4px_#00000024] rounded-b-md fixed z-50 w-full'>
            <nav className="relative bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="flex items-center">
                        <img src={TestIcon} className="h-8 mr-3" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Examination platform</span>
                    </div>
                    <form className="w-2/6 ">
                        <label htmlFor="default-search" className="w-auto mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-auto h-auto text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            {/* <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Search</button> */}
                        </div>
                    </form>
                    {userInfor ?
                        <div ref={dropdownRef} className=" relative flex items-center md:order-2">
                            <div className='relative'>
                                <button onClick={() => { toggleDropdown() }} type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-8 h-8 rounded-full" src={UserIcon} alt="" />
                                </button>
                                {/* Dropdown menu */}
                                {showDropdown && (
                                    <div className="z-50 absolute -right-28 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                                        <div className="px-4 py-3">
                                            <span className="block text-sm text-gray-900 dark:text-white"> {userInfor.displayName}</span>
                                            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                                                {
                                                    userInfor.isEmailAddressVerified ?
                                                        <FontAwesomeIcon className='pr-1' icon={faCircleCheck} style={{ color: "#00f004", }} />
                                                        :
                                                        <FontAwesomeIcon className='pr-1' icon={faCircleXmark} style={{ color: "#ff0000", }} />
                                                }
                                                {userInfor.emailAddress}</span>
                                        </div>
                                        <ul className="py-2" aria-labelledby="user-menu-button">
                                            <li>
                                                <NavLink to={Path.MY_INFO}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                                    Update my infomation</NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                                    Change password</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={Path.VERIFY_EMAIL}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                                    Verify email address</NavLink>
                                            </li>
                                            <li>
                                                <div onClick={() => handleSignOut()} className="cursor-pointer border-t-2 border-[#000] block px-4 py-2 font-bold text-sm text-red-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                                    Sign out</div>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        : <></>}

                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <NavLink to={Path.HOME} className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                                    Home</NavLink>
                            </li>
                            {!userInfor ?
                                <li>
                                    <NavLink to={Path.LOGIN} className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                                        Login</NavLink>
                                </li>
                                : <>
                                    {isStudent ?
                                        <li className='relative' onMouseEnter={() => { handleMouseEnter() }}>
                                            <button
                                                id="mega-menu-full-dropdown-button" data-collapse-toggle="mega-menu-full-dropdown" className="flex items-center justify-between w-full py-2 pl-3 pr-4  text-gray-900 rounded md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                                                Option<svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                                </svg>
                                            </button>
                                        </li>
                                        : <></>}
                                </>}



                        </ul>
                    </div>
                </div>
                {isHovered && (
                    <div onMouseLeave={() => { handleMouseLeave() }} id="mega-menu-full-dropdown" data-carousel="static" className="border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600 ">
                        <div className="w-full group absolute bg-white border-b-2 border-[#aeaeae] z-10 overflow-hidden rounded-lg md:h-auto px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
                            <ul className='flex flex-row justify-center gap-x-10'>
                                <li >
                                    <NavLink to={Path.MY_CLASSROOMS} className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <div className="font-semibold">Classroom</div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Check my all current classrooms.</span>
                                    </NavLink >
                                </li>

                                <li >
                                    <NavLink className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <div className="font-semibold">Score</div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Check the results of the examinations.</span>
                                    </NavLink >
                                </li>

                            </ul>
                            <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-black/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                    </svg>
                                    <span className="sr-only">Previous</span>
                                </span>
                            </button>

                            <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-black/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <span className="sr-only">Next</span>
                                </span>
                            </button>
                        </div>
                    </div>)}

            </nav>
        </div>

    )
}
