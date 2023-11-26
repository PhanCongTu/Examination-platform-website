import React, { useEffect, useState } from 'react'
import { addActiveClassService, deleteActiveClassService, getAllActiveClassService, getAllUnActiveClassService, removeCredential, updateActiveClassService } from '../../../services/ApiService'
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import InputField from '../../../components/form-controls/InputField/InputField';
import ButtonS from '../../../components/form-controls/Button/Button';
import { Modal, } from 'flowbite-react';
import Toggle from '../../../components/form-controls/Toggle/Toggle';

import PaginationNav from '../../../components/pagination/PaginationNav';
import { useNavigate } from 'react-router-dom';
import Path from '../../../utils/Path';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button
} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
const CLASS_CODE = 'classCode';
const CLASS_NAME = 'className';
const IS_PRIVATE = 'isPrivate';
const ID_CLASS = 'id';

export const Classmanager = () => {
    const navigate = useNavigate();
    const [isQuestionGroupOpen, setIsQuestionGroupOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [searchData, setSearchData] = useState('');
    const [listAllClass, setlistAllClass] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFirst, setIsFirst] = useState(false);
    const [isLast, setIsLast] = useState(false);
    const [offset, setOffset] = useState(0);
    const [numberOfElements, setNumberOfElements] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [classSelect, setClassSelect] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isDelete, setIsDelete] = useState(false);
    const [isToggle, setIsToggle] = useState(false);
    const [isModeActive, setIsModeActivate] = useState(true);

    const initialValue = {
        [CLASS_CODE]: '',
        [CLASS_NAME]: '',
        [IS_PRIVATE]: '',
        [ID_CLASS]: ''
    };
    const handleShowStudent = (item) => {
        navigate(`/admin/student/${item.id}`)
    }
    // const isChecked = (itemId) => {
    //     const filteredItems = listClassDelete.filter((item) => item === itemId);
    //     console.log(filteredItems.length > 0);
    //     return filteredItems.length > 0;
    // };

    // const handleCheckboxChange = (event, id, isAll) => {
    //     if (isAll) {
    //         setListClassDelete(listAllClass.map((item, index) => {
    //             return item.id;
    //         }));
    //     } else {
    //         const isChecked = event.target.checked;
    //         console.log(listClassDelete);
    //         if (isChecked) {
    //             setListClassDelete((prevSelected) => [...prevSelected, id]);
    //         } else {
    //             setListClassDelete((prevSelected) =>
    //                 prevSelected.filter((value) => value !== id)
    //             );
    //         }
    //     }

    // };

    const handleShowExamOfClass = (item) => {
        console.log("SSAAA", item.id);
        navigate(`/admin/examination/${item.id}`)
    }

    const handleClickOpenQuestionGroup = (item) => {
        navigate(`/admin/questiongr/${item.id}`)
    }
    
    const handleClickDelete = (item) => {
        setIsDelete(true);
        setClassSelect(item);
    }

    const handleClose = () => {
        console.log("handleClose", isAdd);
        if (isEdit)
            setIsEdit(false);
        if (isAdd)
            setIsAdd(false);
        if (isDelete)
            setIsDelete(false);
        if (isQuestionGroupOpen)
            setIsQuestionGroupOpen(false);
    }

    const handleClickAdd = () => {
        console.log("ADDD");
        setIsAdd(true);
    }

    const form = useForm({
        mode: 'onSubmit',
        defaultValues: initialValue,
        criteriaMode: "firstError",
    })

    const submitForm = (body) => {
        handleClose();
        console.log(body);
        if (isEdit)
            updateActiveClassService({ ...body, isPrivate: isToggle }).then((res) => {
                console.log("Response: " + res);
                toast.success(`Update class successfully!`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                getAllClass();
            }).catch((error) => {
                toast.error(`Update class fail !`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
        if (isAdd)
            addActiveClassService({ ...body, isPrivate: isToggle }).then((res) => {
                console.log("Response: " + res);
                toast.success(`Add class successfully!`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                getAllClass();
            }).catch((error) => {
                toast.error(`Add class fail !`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
        if (isDelete)
            deleteActiveClassService(body).then((res) => {
                console.log(body);
                console.log("Response: " + res);
                toast.success(`Delete class successfully!`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                getAllClass();
            }).catch((error) => {
                toast.error(`Delete class fail !`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
        setActiveIndex(0);

    }

    const handleClickPage = (index) => {
        console.log("INDEX ", index);
        setActiveIndex(index);
        getAllClass(index);
    };

    const handlePrevious = (index) => {

        setActiveIndex(index - 1);
        getAllClass(index - 1);
    }

    const handleNext = (index) => {

        setActiveIndex(index + 1);
        getAllClass(index + 1);
    }

    const handleSearch = (data) => {
        console.log("SEARCH");
        if (isModeActive)
            getAllActiveClassService(undefined, undefined, undefined, undefined, data).then((res) => {
                console.log(isActive(0));
                setActiveIndex(0);
                setlistAllClass(res.content);
                setIsLast(res.last);
                setIsFirst(res.first);
                console.log("TOTAL PAGE", res.totalPages);
                const pageNumbers2 = [];
                for (let i = 1; i <= res.totalPages; i++) {
                    pageNumbers2.push(i);
                }
                setPageNumbers(pageNumbers2);
                console.log(pageNumbers);
                setTotalElements(res.totalElements);
                console.log(listAllClass);
                setOffset(res.pageable.offset);
                setNumberOfElements(res.numberOfElements);
                console.log("numberOfElements", res.numberOfElements);
            }).catch((error) => {

                toast.error(`Search fail !`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
        else
            getAllUnActiveClassService(undefined, undefined, undefined, undefined, data).then((res) => {
                console.log(isActive(0));
                setActiveIndex(0);
                setlistAllClass(res.content);
                setIsLast(res.last);
                setIsFirst(res.first);
                console.log("TOTAL PAGE", res.totalPages);
                const pageNumbers2 = [];
                for (let i = 1; i <= res.totalPages; i++) {
                    pageNumbers2.push(i);
                }
                setPageNumbers(pageNumbers2);
                console.log(pageNumbers);
                setTotalElements(res.totalElements);
                console.log(listAllClass);
                setOffset(res.pageable.offset);
                setNumberOfElements(res.numberOfElements);
                console.log("numberOfElements", res.numberOfElements);
            }).catch((error) => {
                removeCredential();
                navigate(Path.LOGIN);
                toast.error(`Search fail !`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })

    }

    const handleClickEdit = (item) => {
        console.log("IIII", item);
        setIsEdit(true);
        setTimeout(() => {
            setClassSelect(item);
        });
        console.log(item);
    }

    const getAllActiveClass = async (page, sortType, column, size, search) => {
        await getAllActiveClassService(page, sortType, column, size, search).then((res) => {

            console.log("LIST " + res.content);
            console.log("ACTIVE" + isActive(activeIndex));
            setlistAllClass(res.content);
            setIsLast(res.last);
            setIsFirst(res.first);
            console.log("TOTAL PAGE", res.totalPages);
            const pageNumbers2 = [];
            for (let i = 1; i <= res.totalPages; i++) {
                pageNumbers2.push(i);
            }
            setPageNumbers(pageNumbers2);
            console.log(pageNumbers);
            setTotalElements(res.totalElements);
            console.log(listAllClass);
            setOffset(res.pageable.offset);
            setNumberOfElements(res.numberOfElements);
            console.log("numberOfElements", res.numberOfElements);
            setIsLoading(false);
            // setIndexPage(res.pageable.pageNumber);
        }).catch((error) => {
            setIsLoading(false);
            toast.error(`Get class fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
            console.log(error);
        });
    }
    const getAllUnActivateClass = async (page, sortType, column, size, search) => {
        getAllUnActiveClassService(page, sortType, column, size, search).then((res) => {
            setlistAllClass(res.content);
            setIsLast(res.last);
            setIsFirst(res.first);
            console.log("TOTAL PAGE", res.totalPages);
            const pageNumbers2 = [];
            for (let i = 1; i <= res.totalPages; i++) {
                pageNumbers2.push(i);
            }
            setPageNumbers(pageNumbers2);
            console.log(pageNumbers);
            setTotalElements(res.totalElements);
            console.log(listAllClass);
            setOffset(res.pageable.offset);
            setNumberOfElements(res.numberOfElements);
            console.log("numberOfElements", res.numberOfElements);
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            toast.error(`Get class fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
            console.log(error);
            removeCredential();
            navigate(Path.LOGIN);
        });
    }
    const getAllClass = (page, sortType, column, size, search) => {
        if (isModeActive)
            getAllActiveClass(page, sortType, column, size, search);
        else
            getAllUnActivateClass(page, sortType, column, size, search);
    }
    const isActive = (index) => {
        return index === activeIndex;
    };

    useEffect(() => {
        document.title = "Class Mananger Admin"
        getAllClass();
    }, [isModeActive]);


    return (
        <>
            <div className=" p-4 h-full w-full flex-row flex">
                <div className="p-4 dark:border-gray-700">
                    <div className="flex items-center justify-start h-auto mb-4 dark:bg-gray-800">
                        {/* <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                            </svg>
                        </p> */}


                        <div className=" overflow-auto shadow-md sm:rounded-lg">
                            <div className='items-center flex gap-4 justify-between mb-[14px]'>
                                {/* <button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                    <svg className="w-3 h-3 text-gray-500 dark:text-gray-400 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                                    </svg>
                                    Last 30 days
                                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                <div id="dropdownRadio" className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style={{
                                    position: 'absolute',
                                    inset: 'auto auto 0px 0px',
                                    margin: '0px',
                                    transform: 'translate3d(522.5px, 3847.5px, 0px)',
                                }}>
                                    <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                                        <li>
                                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input id="filter-radio-example-1" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="filter-radio-example-1" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last day</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input id="filter-radio-example-2" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="filter-radio-example-2" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 7 days</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input id="filter-radio-example-3" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="filter-radio-example-3" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 30 days</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input id="filter-radio-example-4" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="filter-radio-example-4" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last month</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                <input id="filter-radio-example-5" type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="filter-radio-example-5" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last year</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div> */}

                                <Toggle checked={isModeActive} handleToggle={setIsModeActivate} >{isModeActive ? 'Active' : 'Inactive'}</Toggle>
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 flex items-center pl-3 ">
                                        <ButtonS handleOnClick={() => { handleSearch(searchData) }} >
                                            <svg className="w-5 h-5 text-white dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                        </ButtonS>
                                    </div>
                                    <input onChange={(e) => { setSearchData(e.target.value) }} type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />

                                </div>
                                <div className='flex gap-4  items-center justify-between'>
                                    <ButtonS className="bg-blue-800" handleOnClick={() => { handleClickAdd() }}>Add</ButtonS>

                                </div>
                            </div>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        {/* <th scope="col" className="p-4">
                                            <div className="flex items-center">
                                                <input onChange={() => handleCheckboxChange(undefined, undefined, true)} id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                            </div>
                                        </th> */}
                                        <th scope="col" className="px-6 py-3">
                                            ID class
                                        </th>
                                        <th scope="col" className="px-6 py-3 min-w-[200px] m-w-[200px]" >
                                            Class name
                                        </th>
                                        <th scope="col" className="px-6 py-3 min-w-[200px] m-w-[200px]">
                                            Class code
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Active
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Private
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        isLoading ? 'Loading ...' :
                                            (listAllClass.length !== 0 ? (
                                                listAllClass.map(
                                                    (item, index) => {

                                                        return (
                                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                                {/* <td className="w-4 p-4">
                                                                    <div className="flex items-center">
                                                                        <input
                                                                            checked={isChecked(item.id)}
                                                                            onChange={(e) => handleCheckboxChange(e, item.id)}
                                                                            id={`checkbox-table-search-${index}`}
                                                                            type="checkbox"
                                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                        />
                                                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                                                    </div>
                                                                </td> */}
                                                                <th scope="row" className="w-[62px] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                                                    {item.id}
                                                                </th>
                                                                <td className="px-6 py-4 w-[300px] ">
                                                                    <p onClick={() => handleClickOpenQuestionGroup(item)} className="cursor-pointer font-medium dark:text-blue-500 hover:underline max-w-[200px] line-clamp-1" title={item.className}>{item.className}</p>
                                                                </td>
                                                                <td className="px-6 py-4 w-[300px] " >
                                                                    <p className=" truncate font-medium  max-w-[200px] line-clamp-1" title={item.classCode}>{item.classCode}</p>
                                                                </td>
                                                                <td className="px-6 py-4 w-[62px]">
                                                                    <div className="flex items-center">
                                                                        {
                                                                            item.isEnable === true ? (<><div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                                                                Active</>
                                                                            ) : (<><div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Passive</>)
                                                                        }
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 w-[62px] ">
                                                                    <div className="flex items-center">
                                                                        {
                                                                            item.isPrivate === true ? (<><div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                                                                Private</>
                                                                            ) : (<><div className="h-2.5 w-2.5 rounded-full  bg-green-500 mr-2"></div> Public</>)
                                                                        }
                                                                    </div>
                                                                </td>

                                                                <td className="px-6 py-4 w-[60px]">
                                                                    <Menu >
                                                                        <MenuHandler>
                                                                            <Button className='bg-slate-400'>
                                                                                <FontAwesomeIcon icon={faBars} />
                                                                            </Button>
                                                                        </MenuHandler>
                                                                        <MenuList className='rounded-md'>
                                                                            <MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { handleClickEdit(item) }}>Edit</MenuItem>
                                                                            <MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { handleClickDelete(item) }} >Delete</MenuItem>
                                                                            <MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { handleShowStudent(item) }} >Show student in class</MenuItem>
                                                                            <MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { handleClickOpenQuestionGroup(item) }}>Show question group of class</MenuItem>
                                                                            <MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { handleShowExamOfClass(item) }}>Show examination of class</MenuItem>
                                                                        </MenuList>
                                                                    </Menu>

                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                )) : (<>
                                                    <h1 className='text-sm'>Currently there is no class. Come back later.</h1>
                                                </>))
                                    }
                                </tbody>
                            </table>

                            <PaginationNav
                                pageNumbers={pageNumbers}
                                handlePrevious={handlePrevious}
                                handleNext={handleNext}
                                activeIndex={activeIndex}
                                handleClickPage={handleClickPage}
                                offset={offset}
                                numberOfElements={numberOfElements}
                                totalElements={totalElements}
                                isFirst={isFirst}
                                isLast={isLast}
                                isActive={isActive} />
                        </div>
                    </div>
                </div>
                {isEdit && (
                    <><div className='fixed bg-black opacity-60 top-0 right-0 left-0 bottom-0 rounded-none w-full h-full z-[100]'></div>
                        <Modal className="top-1/4 left-0 right-0 z-[101] m-auto w-96" show={true} size="md" popup onClose={() => handleClose()} >
                            <Modal.Header />
                            <Modal.Body>
                                <form onSubmit={form.handleSubmit(submitForm)}
                                    className="relative mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                                >
                                    <p className="text-center text-lg font-medium"> Edit class</p>
                                    <InputField name={ID_CLASS} disabled form={form} defaultValue={classSelect.id} />
                                    <InputField name={CLASS_CODE} label="Class code" form={form} defaultValue={classSelect.classCode} />
                                    <InputField name={CLASS_NAME} label="Class name" form={form} defaultValue={classSelect.className} />
                                    <Toggle checked={classSelect.isPrivate} handleToggle={setIsToggle} >Is Private</Toggle>
                                    <ButtonS onClick={() => handleClose()} className="bg-blue-800" type='submit'>Submit</ButtonS>
                                </form>
                            </Modal.Body>
                        </Modal></>)
                }
                {isAdd && (
                    <><div className='fixed bg-black opacity-60 top-0 right-0 left-0 bottom-0 rounded-none w-full h-full z-[100]'></div>
                        <Modal className="top-1/4 left-0 right-0 z-[101] m-auto w-96" show={true} size="md" popup onClose={() => handleClose()} >
                            <Modal.Header />
                            <Modal.Body>
                                <form onSubmit={form.handleSubmit(submitForm)}
                                    className="relative mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                                >
                                    <p className="text-center text-lg font-medium">Add class</p>
                                    <InputField name={ID_CLASS} disabled form={form} defaultValue={''} />
                                    <InputField name={CLASS_CODE} label="Class code" form={form} defaultValue={''} />
                                    <InputField name={CLASS_NAME} label="Class name" form={form} defaultValue={''} />
                                    <Toggle handleToggle={setIsToggle} >Is Private</Toggle>
                                    <ButtonS onClick={() => handleClose()} className="bg-blue-800" type='submit'>Submit</ButtonS>
                                </form>
                            </Modal.Body>
                        </Modal></>)
                }
                {isDelete && (
                    <><div className='fixed bg-black opacity-60 top-0 right-0 left-0 bottom-0 rounded-none w-full h-full z-[100]'></div>
                        <Modal className="top-1/5 left-0 right-0 z-[101] m-auto w-96" show={true} size="md" popup onClose={() => handleClose()} >
                            <Modal.Header />
                            <Modal.Body>
                                <form onSubmit={form.handleSubmit(submitForm)}
                                    className="relative mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                                >
                                    <InputField name={ID_CLASS} disabled form={form} defaultValue={classSelect.id} />
                                    <p className="text-center text-[20px] font-medium text-yellow-300 uppercase"> Warning </p>
                                    <h1 className='text-[16px] text-center'>Are you sure you want to delete ?</h1>
                                    <div className='invisible py-3'></div>
                                    <div className='flex gap-3'>
                                        <ButtonS className="bg-red-500" type='submit'>Delete</ButtonS>
                                        <ButtonS onClick={() => handleClose()} className="bg-blue-400">Cancel</ButtonS>
                                    </div>
                                </form>
                            </Modal.Body>
                        </Modal></>)
                }


            </div >
        </ >

    )
}
