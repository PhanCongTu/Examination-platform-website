import React, { useEffect, useState } from 'react'
import { activeClassroomService, addActiveClassService, deleteActiveClassService, getAllActiveClassService, getAllUnActiveClassService, removeCredential, updateActiveClassService } from '../../../services/ApiService'
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import InputField from '../../../components/form-controls/InputField/InputField';
import ButtonS from '../../../components/form-controls/Button/Button';
import Toggle from '../../../components/form-controls/Toggle/Toggle';
import * as yup from 'yup';
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
import { faBars, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from 'flowbite-react';
const CLASS_CODE = 'classCode';
const CLASS_NAME = 'className';
const DESCRIPTION = 'description';
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
    const [isToggle, setIsToggle] = useState(true);
    const [isModeActive, setIsModeActivate] = useState(true);
    const [isChooseActive, setIsChooseActive] = useState(false);
    const initialValue = {
        [CLASS_CODE]: '',
        [CLASS_NAME]: '',
        [DESCRIPTION]: '',
        [IS_PRIVATE]: '',
        [ID_CLASS]: ''
    };
    const yupObject = yup.object().shape({
        [CLASS_CODE]: yup
            .string()
            .required("The code of classroom is required."),
        [CLASS_NAME]: yup
            .string()
            .required("The name of classroom is required."),
        [DESCRIPTION]: yup
            .string()
            .required("The description of classroom is required."),
    });

    const handleShowStudent = (item) => {
        navigate(`/admin/student/${item.id}`)
    }
    const handleShowExamOfClass = (item) => {
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
        if (isEdit)
            setIsEdit(false);
        if (isAdd)
            setIsAdd(false);
        if (isDelete)
            setIsDelete(false);
        if (isQuestionGroupOpen)
            setIsQuestionGroupOpen(false);
        if (isChooseActive)
            setIsChooseActive(false);
    }

    const handleClickAdd = () => {
        setIsAdd(true);
    }

    const form = useForm({
        mode: 'onSubmit',
        defaultValues: initialValue,
        criteriaMode: "firstError",
        resolver: yupResolver(yupObject)
    })

    const submitForm = (body) => {
        handleClose();
        if (isEdit)
            updateActiveClassService({ ...body, isPrivate: isToggle }).then((res) => {
                getAllClass();
            }).catch((error) => {
                toast.error(`Update class fail !`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
        if (isAdd)
            addActiveClassService({ ...body, isPrivate: isToggle }).then((res) => {
                getAllClass();
            }).catch((error) => {
                toast.error(`Add class fail !`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
        if (isDelete)
            deleteActiveClassService(body).then((res) => {
                getAllClass();
            }).catch((error) => {
                toast.error(`Delete class fail !`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
        if (isChooseActive)
            activeClassroomService(body.id).then((res) => {
                getAllClass();
            }).catch((error) => {
                toast.error(`Active class fail !`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
        setActiveIndex(0);

    }

    const handleClickPage = (index) => {
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
        if (isModeActive)
            getAllActiveClassService(undefined, undefined, undefined, undefined, data).then((res) => {
                setActiveIndex(0);
                setlistAllClass(res.content);
                setIsLast(res.last);
                setIsFirst(res.first);
                const pageNumbers2 = [];
                for (let i = 1; i <= res.totalPages; i++) {
                    pageNumbers2.push(i);
                }
                setPageNumbers(pageNumbers2);
                setTotalElements(res.totalElements);
                setOffset(res.pageable.offset);
                setNumberOfElements(res.numberOfElements);
            }).catch((error) => {

                toast.error(`Search fail !`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
        else
            getAllUnActiveClassService(undefined, undefined, undefined, undefined, data).then((res) => {
                setActiveIndex(0);
                setlistAllClass(res.content);
                setIsLast(res.last);
                setIsFirst(res.first);
                const pageNumbers2 = [];
                for (let i = 1; i <= res.totalPages; i++) {
                    pageNumbers2.push(i);
                }
                setPageNumbers(pageNumbers2);
                setTotalElements(res.totalElements);
                setOffset(res.pageable.offset);
                setNumberOfElements(res.numberOfElements);
            }).catch((error) => {
                removeCredential();
                navigate(Path.LOGIN);
                toast.error(`Search fail !`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })

    }

    const handleClickActive = (item) => {
        setIsChooseActive(true);
        setTimeout(() => {
            setClassSelect(item);
        });
    }

    const handleClickEdit = (item) => {
        form.clearErrors();
        setIsEdit(true);
        setTimeout(() => {
            setClassSelect(item);
        });
    }

    const getAllActiveClass = async (page, sortType, column, size, search) => {
        await getAllActiveClassService(page, sortType, column, size, search).then((res) => {
            setlistAllClass(res.content);
            setIsLast(res.last);
            setIsFirst(res.first);
            const pageNumbers2 = [];
            for (let i = 1; i <= res.totalPages; i++) {
                pageNumbers2.push(i);
            }
            setPageNumbers(pageNumbers2);
            setTotalElements(res.totalElements);
            setOffset(res.pageable.offset);
            setNumberOfElements(res.numberOfElements);
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            toast.error(`Get class fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
        });
    }

    const getAllUnActivateClass = async (page, sortType, column, size, search) => {
        getAllUnActiveClassService(page, sortType, column, size, search).then((res) => {
            setlistAllClass(res.content);
            setIsLast(res.last);
            setIsFirst(res.first);
            const pageNumbers2 = [];
            for (let i = 1; i <= res.totalPages; i++) {
                pageNumbers2.push(i);
            }
            setPageNumbers(pageNumbers2);
            setTotalElements(res.totalElements);
            setOffset(res.pageable.offset);
            setNumberOfElements(res.numberOfElements);
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            toast.error(`Get class fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
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
                    <div className='flex font-bold items-center justify-center pb-3 text-[40px]'>
                        Classroom manager
                    </div>
                    <div className="flex items-center justify-start h-auto mb-4 bg-gray-100">

                        <div className=" overflow-auto shadow-md sm:rounded-lg">
                            <div className='p-3 items-center flex gap-4 justify-between mb-[14px]'>

                                <div className='w-[150px] z-0'>
                                    <Toggle checked={isModeActive} handleToggle={setIsModeActivate} >{isModeActive ? 'Active' : 'Inactive'}</Toggle>

                                </div>
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
                                        <th scope="col" className="px-6 py-3 w-[150px]">
                                            ID class
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-[300px]" >
                                            Class name
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-[300px] ">
                                            Class code
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-[70px]">
                                            Active
                                        </th>

                                        <th scope="col" className="px-6 py-3 w-[70px]">
                                            Action
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        !isLoading &&
                                        (listAllClass.length !== 0 && (
                                            listAllClass.map(
                                                (item, index) => {

                                                    return (
                                                        <>
                                                            <tr key={index} title={item.description} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                                                                <th scope="row" className="w-[150px] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                                                    {item.id}
                                                                </th>
                                                                <td className="px-6 py-4 w-[300px] ">
                                                                    <p onClick={() => handleClickOpenQuestionGroup(item)} className="cursor-pointer font-medium dark:text-blue-500 hover:underline w-[300px] line-clamp-1">{item.className}</p>
                                                                </td>
                                                                <td className="px-6 py-4 w-[300px] " >
                                                                    <p className=" truncate font-medium w-[300px] line-clamp-1">{item.classCode}</p>
                                                                </td>
                                                                <td className="px-6 py-4 w-[70px]">
                                                                    <div className="flex items-center">
                                                                        {
                                                                            item.isEnable === true ? (<><div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                                                                Active</>
                                                                            ) : (<><div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Passive</>)
                                                                        }
                                                                    </div>
                                                                </td>

                                                                <td className="px-6 py-4 w-[70px]">
                                                                    <Menu >
                                                                        <MenuHandler>
                                                                            <Button className='bg-slate-400'>
                                                                                <FontAwesomeIcon icon={faBars} />
                                                                            </Button>
                                                                        </MenuHandler>

                                                                        {
                                                                            isModeActive ? (<MenuList className='rounded-md'><MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { handleClickEdit(item) }}>Edit</MenuItem>
                                                                                <MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { handleClickDelete(item) }} >Delete</MenuItem>
                                                                                <MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { handleShowStudent(item) }} >Show student in class</MenuItem>
                                                                                <MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { handleClickOpenQuestionGroup(item) }}>Show question group of class</MenuItem>
                                                                                <MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { handleShowExamOfClass(item) }}>Show examination of class</MenuItem>
                                                                            </MenuList>)
                                                                                : (<MenuList className='rounded-md'><MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { handleClickActive(item) }}>Active</MenuItem></MenuList>)
                                                                        }



                                                                    </Menu>

                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                }
                                            )))
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
                    {
                        isLoading ? (<>
                            <h1 className='text-sm pl-1'>Loading...</h1>
                        </>) : (listAllClass.length === 0 && (<>
                            <div className="grid w-full h-32 mt-5 px-4 bg-white place-content-center">
                                <div className="text-center">
                                    <h1
                                        className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                                    >
                                        Uh-oh!
                                    </h1>
                                    <p className="mt-4 text-gray-500">We cannot find any classroom.</p>
                                </div>
                            </div>
                        </>))

                    }
                </div>
                {isEdit && (
                    <>
                        <Modal className="bg-opacity-60 z-[101]" show={true} theme={{ 'content': { 'base': 'w-1/2 m-10' } }} popup onClose={() => handleClose()} >
                            <Modal.Header />
                            <Modal.Body>
                                <form onSubmit={form.handleSubmit(submitForm)}
                                    className="relative mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                                >
                                    <p className="text-center text-lg font-medium"> Edit class</p>
                                    <InputField name={ID_CLASS} disabled form={form} defaultValue={classSelect.id} />
                                    <InputField name={CLASS_CODE} label="Class code" form={form} defaultValue={classSelect.classCode} />
                                    <InputField name={CLASS_NAME} label="Class name" form={form} defaultValue={classSelect.className} />
                                    <InputField name={DESCRIPTION} label="Description" form={form} defaultValue={classSelect.description || ""} />
                                    {/* <Toggle checked={classSelect.isPrivate} handleToggle={setIsToggle} >Is Private</Toggle> */}
                                    <ButtonS onClick={() => handleClose()} className="bg-blue-800" type='submit'>Submit</ButtonS>
                                </form>
                            </Modal.Body>
                        </Modal></>)
                }
                {isAdd && (
                    <>
                        <Modal className="bg-opacity-60 z-[101]" theme={{ 'content': { 'base': 'w-1/2 m-10' } }} show={true} popup onClose={() => handleClose()} >
                            <Modal.Header />
                            <Modal.Body>
                                <form onSubmit={form.handleSubmit(submitForm)}
                                    className="relative mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                                >
                                    <p className="text-center text-lg font-medium">Add new classroom</p>
                                    <InputField name={ID_CLASS} disabled form={form} defaultValue={''} />
                                    <InputField name={CLASS_CODE} label="Class code" form={form} defaultValue={''} />
                                    <InputField name={CLASS_NAME} label="Class name" form={form} defaultValue={''} />
                                    <InputField name={DESCRIPTION} label="Description" form={form} defaultValue={''} />
                                    {/* <Toggle checked={isToggle} handleToggle={setIsToggle} >Is Private</Toggle> */}
                                    <ButtonS
                                        onClick={() => handleClose()} className="bg-blue-800" type='submit'>Submit</ButtonS>
                                </form>
                            </Modal.Body>
                        </Modal></>)
                }
                {isDelete && (
                    <>
                        <Modal className="bg-opacity-60 z-[101]" show={true} size="md" popup onClose={() => handleClose()} >
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
                {isChooseActive && (
                    <>
                        <Modal className="bg-opacity-60 z-[101]" show={true} size="md" popup onClose={() => handleClose()} >
                            <Modal.Header />
                            <Modal.Body>
                                <form onSubmit={form.handleSubmit(submitForm)}
                                    className="relative mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                                >
                                    <InputField name={ID_CLASS} disabled form={form} defaultValue={classSelect.id} />
                                    <p className="text-center text-[20px] font-medium text-green-300 uppercase"> Confirm </p>
                                    <h1 className='text-[16px] text-center'>Are you sure you want to active ?</h1>
                                    <div className='invisible py-3'></div>
                                    <div className='flex gap-3'>
                                        <ButtonS className="bg-red-500" type='submit'>Submit</ButtonS>
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
