import React, { useEffect, useState } from 'react'
import ButtonE from '../../../components/form-controls/Button/Button'
import InputField from '../../../components/form-controls/InputField/InputField'
import { Modal } from 'flowbite-react'
import { addExamByIdClassroomService, convertDateToMiliseconds, getAllExamOfClassService, getFormattedDateTimeByMilisecond, removeCredential } from '../../../services/ApiService'
import Path from '../../../utils/Path'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import Toggle from '../../../components/form-controls/Toggle/Toggle'
import PaginationNav from '../../../components/pagination/PaginationNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button
} from "@material-tailwind/react";
import { DatePicker } from '../../../components/form-controls/Datepicker/DatePicker'
const ID_EXAM = 'id';
const EXAM_NAME = 'testName';
const START_DATE = 'startDate';
const END_DATE = 'endDate';
const EXAM_TEST_TIME = 'testingTime';
const ID_CLASSROOM = 'classroomId';

export const Examinationmanager = () => {
    const { idClassRoom } = useParams();
    const navigate = useNavigate();

    const [isAdd, setIsAdd] = useState(false);
    const [searchData, setSearchData] = useState('');
    const [listAllExam, setListAllExam] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFirst, setIsFirst] = useState(false);
    const [isLast, setIsLast] = useState(false);
    const [offset, setOffset] = useState(0);
    const [numberOfElements, setNumberOfElements] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [examSelect, setExamSelect] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isDelete, setIsDelete] = useState(false);
    const [isToggle, setIsToggle] = useState(false);
    const [isStarted, setIsStarted] = useState(true);

    const initialValue = {
        [ID_EXAM]: '',
        [START_DATE]: '',
        [EXAM_NAME]: '',
        [END_DATE]: '',
        [EXAM_TEST_TIME]: ''
    };

    const handleClickDelete = (item) => {
        setIsDelete(true);
        setExamSelect(item);
    }

    const handleClose = () => {
        console.log("handleClose", isAdd);
        if (isEdit)
            setIsEdit(false);
        if (isAdd)
            setIsAdd(false);
        if (isDelete)
            setIsDelete(false);

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
        body.startDate = convertDateToMiliseconds(body.startDate);
        body.endDate = convertDateToMiliseconds(body.endDate);
        console.log(body);
        if (isEdit);

        if (isAdd);
        // addExamByIdClassroom(body);
        if (isDelete);

        setActiveIndex(0);

    }

    const handleClickPage = (index) => {
        console.log("INDEX ", index);
        setActiveIndex(index);
        getAllExam(index);
    };

    const handlePrevious = (index) => {

        setActiveIndex(index - 1);
        getAllExam(index - 1);
    }

    const handleNext = (index) => {

        setActiveIndex(index + 1);
        getAllExam(index + 1);
    }

    const handleSearch = (data) => {
        console.log("SEARCH");
        getAllExamOfClassService(idClassRoom, isStarted, undefined, undefined, undefined, undefined, data).then((res) => {
            setListAllExam(res.content);
            setIsLast(res.last);
            setIsFirst(res.first);
            console.log("TOTAL PAGE", res.totalPages);
            const pageNumbers2 = [];
            for (let i = 1; i <= res.totalPages; i++) {
                pageNumbers2.push(i);
            }
            setPageNumbers(pageNumbers2);
            setTotalElements(res.totalElements);
            setOffset(res.pageable.offset);
            setNumberOfElements(res.numberOfElements);
            console.log("numberOfElements", res.numberOfElements);
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            toast.error(`Get Exam fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
            console.error(error);
            removeCredential();
            navigate(Path.LOGIN);
        });

    }

    const handleClickEdit = (item) => {
        console.log("IIII", item);
        setIsEdit(true);
        setTimeout(() => {
            setExamSelect(item);
        });
        console.log(item);
    }

    const addExamByIdClassroom = async (body) => {

        addExamByIdClassroomService(body).then((res) => {

        }).catch((error) => {

        })
    }

    const getAllExamOfClassroom = async (page, sortType, column, size, search) => {
        getAllExamOfClassService(idClassRoom, isStarted, page, sortType, column, size, search).then((res) => {
            setListAllExam(res.content);
            setIsLast(res.last);
            setIsFirst(res.first);
            console.log("TOTAL PAGE", res.totalPages);
            const pageNumbers2 = [];
            for (let i = 1; i <= res.totalPages; i++) {
                pageNumbers2.push(i);
            }
            setPageNumbers(pageNumbers2);
            setTotalElements(res.totalElements);
            setOffset(res.pageable.offset);
            setNumberOfElements(res.numberOfElements);
            console.log("numberOfElements", res.numberOfElements);
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            toast.error(`Get Exam fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
            console.error(error);
            removeCredential();
            navigate(Path.LOGIN);
        });
    }

    const getAllExam = (page, sortType, column, size, search) => {
        getAllExamOfClassroom(page, sortType, column, size, search);
    }
    const isActive = (index) => {
        return index === activeIndex;
    };

    useEffect(() => {
        document.title = "Examination Mananger Admin"
        console.log(idClassRoom);
        if(idClassRoom)
            getAllExam();
        else{
            navigate(Path.AMCLASSMANAGER);
        }
    }, [isStarted]);

    return (
        <>
            <div className=" p-4 h-full w-full flex-row flex">
                <div className="p-4 dark:border-gray-700">
                    <div className="flex items-center justify-start h-auto mb-4 dark:bg-gray-800">



                        <div className=" overflow-auto shadow-md sm:rounded-lg">
                            <div className='items-center flex gap-4 justify-between mb-[14px]'>

                                <div className='w-[100px]'>

                                    <Toggle checked={isStarted} handleToggle={setIsStarted} >{isStarted ? 'Started' : 'Pending'}</Toggle>
                                </div>
                                <div className="relative float-right">
                                    <div className="absolute inset-y-0 right-0 flex items-center pl-3 ">
                                        <ButtonE handleOnClick={() => { handleSearch(searchData) }} >
                                            <svg className="w-5 h-5 text-white dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                        </ButtonE>
                                    </div>
                                    <input onChange={(e) => { setSearchData(e.target.value) }} type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />

                                </div>
                                <div className='flex gap-4  items-center justify-between'>
                                    <ButtonE className="bg-blue-800" handleOnClick={() => { handleClickAdd() }}>Add Exam</ButtonE>

                                </div>
                            </div>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>

                                        <th scope="col" className="px-6 py-3">
                                            ID Exam
                                        </th>
                                        <th scope="col" className="px-6 py-3  w-[300px]" >
                                            Exam name
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-[150px]">
                                            Start date
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-[150px]">
                                            End date
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-[150px]">
                                            Exam time
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-[60px]" >
                                            Action
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        isLoading ? 'Loading ...' :
                                            (listAllExam.length !== 0 ? (
                                                listAllExam.map(
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
                                                                    <p onClick={() => { }} className="cursor-pointer font-medium dark:text-blue-500 hover:underline max-w-[200px] line-clamp-1" title={item.testName}>{item.testName}</p>
                                                                </td>
                                                                <td className="px-6 py-4 w-[150px] " >
                                                                    <p className=" truncate font-medium  max-w-[200px] line-clamp-1" title={getFormattedDateTimeByMilisecond(item.startDate)}>{getFormattedDateTimeByMilisecond(item.startDate)}</p>
                                                                </td>
                                                                <td className="px-6 py-4 w-[150px] " >
                                                                    <p className=" truncate font-medium  max-w-[200px] line-clamp-1" title={getFormattedDateTimeByMilisecond(item.endDate)}>{getFormattedDateTimeByMilisecond(item.endDate)}</p>
                                                                </td>

                                                                <td className="px-6 py-4 w-[150px] " >
                                                                    <p className=" truncate font-medium  max-w-[200px] line-clamp-1" title={item.testingTime}>{item.testingTime}</p>
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
                                                                            <MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { }}>Show student has joined exam</MenuItem>

                                                                        </MenuList>
                                                                    </Menu>

                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                )) : (<>
                                                    <tfoot>
                                                        <tr>
                                                            <h1 className='text-sm'>Currently there is no exam. Come back later.</h1>
                                                        </tr>
                                                    </tfoot>
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
                                    <p className="text-center text-lg font-medium">Edit class</p>

                                    <Button onClick={() => handleClose()} className="bg-blue-800" type='submit'>Submit</Button>
                                </form>
                            </Modal.Body>
                        </Modal></>)
                }
                {isAdd && (
                    <><div className='fixed bg-black opacity-60 top-0 right-0 left-0 bottom-0 rounded-none w-full h-full z-[100]'></div>
                        <Modal className="top-0 left-0 right-0 z-[101] m-auto w-96" show={true} size="md" popup onClose={() => handleClose()} >
                            <Modal.Header />
                            <Modal.Body>
                                <form onSubmit={form.handleSubmit(submitForm)}
                                    className="relative mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                                >
                                    <p className="text-center text-lg font-medium">Add Exam</p>
                                    <InputField name={EXAM_NAME} label="Exam name" form={form} defaultValue={''} />
                                    <InputField name={ID_CLASSROOM} disabled form={form} defaultValue={''} />
                                    <InputField type='number' name={EXAM_TEST_TIME} label="Time test" form={form} defaultValue={''} />
                                    <DatePicker name={START_DATE} label="Start date" form={form} defaultValue={''} />
                                    <DatePicker name={END_DATE} label="End date" form={form} defaultValue={''} />
                                      {/* <div className='px w-[150px]'>
                                        <Menu placement='bottom-start' >
                                            <MenuHandler>
                                                <Button onClick={() => { console.log("SSSSSAAAAAAAAAAA") }} className='bg-slate-400'>
                                                    Add question
                                                </Button>
                                            </MenuHandler >
                                            <MenuList className='rounded-md z-[102]'>
                                                <MenuItem className='z-[102]rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { }}>Add random by question group</MenuItem>
                                                <MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { }}>Add manual</MenuItem>


                                            </MenuList>
                                        </Menu>
                                    </div> */}
                                    <ButtonE onClick={() => handleClose()} className="bg-blue-800" type='submit'>Submit</ButtonE>
                                </form>
                            </Modal.Body>
                        </Modal></>)
                }
                {isDelete && (
                    <><div className='fixed bg-black opacity-60 top-0 right-0 left-0 bottom-0 rounded-none w-full h-full z-[100]'></div>
                        <Modal className="top-0 left-0 right-0 z-[101] m-auto w-96" show={true} size="md" popup onClose={() => handleClose()} >
                            <Modal.Header />
                            <Modal.Body>
                                <form onSubmit={form.handleSubmit(submitForm)}
                                    className="relative mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                                >

                                    <p className="text-center text-[20px] font-medium text-yellow-300 uppercase"> Warning </p>
                                    <h1 className='text-[16px] text-center'>Are you sure you want to delete ?</h1>
                                    <div className='invisible py-3'></div>
                                    <div className='flex gap-3'>
                                        <Button className="bg-red-500" type='submit'>Delete</Button>
                                        <Button onClick={() => handleClose()} className="bg-blue-400">Cancel</Button>
                                    </div>
                                </form>
                            </Modal.Body>
                        </Modal></>)
                }


            </div >
        </ >

    )
}
