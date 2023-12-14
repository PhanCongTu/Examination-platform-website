import React, { useEffect, useState } from 'react'
import ButtonE from '../../../components/form-controls/Button/Button'
import InputField from '../../../components/form-controls/InputField/InputField'
import { Modal } from 'flowbite-react'
import { addExamByIdClassroomService, convertDateToMiliseconds, deleteExamService, getAllExamOfClassService, getFormattedDateTimeByMilisecond, removeCredential, setFormatDateYYYYMMDD, updateExamService } from '../../../services/ApiService'
import Path from '../../../utils/Path'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import Toggle from '../../../components/form-controls/Toggle/Toggle'
import PaginationNav from '../../../components/pagination/PaginationNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button
} from "@material-tailwind/react";
import { DatePicker } from '../../../components/form-controls/Datepicker/DatePicker'
import { QuestionGroup } from './Questiongroupmanager'
import { Questionmanager } from './Questionmanager'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
const ID_EXAM = 'id';
const EXAM_NAME = 'testName';
const START_DATE = 'startDate';
const END_DATE = 'endDate';
const EXAM_TEST_TIME = 'testingTime';
const ID_CLASSROOM = 'classroomId';
const DESCRIPTION = 'description';

export const Examinationmanager = () => {
    const { idClassRoom } = useParams();
    const navigate = useNavigate();
    const [chooseQuestionByQuestionGr, setChooseQuestionByQr] = useState([]);
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
    const [checkExamStart, setCheckExamStart] = useState([]);
    const [isEnded, setIsEnded] = useState(false);
    const [isShowRamdomQuestion, setIsShowRandomQuestion] = useState(false);
    const [isShowManualQuestion, setIsShowManualQuestion] = useState(false);
    const [questionsSelect, setQuestionsSelect] = useState([]);

    const initialValue = {
        [ID_EXAM]: '',
        [START_DATE]: '',
        [EXAM_NAME]: '',
        [END_DATE]: '',
        [EXAM_TEST_TIME]: '',
        [DESCRIPTION]: ''
    };
    const yupObject = yup.object().shape({
        [START_DATE]: yup
            .string()
            .required("The start date of exam is required."),
        [END_DATE]: yup
            .string()
            .required("The end date of exam is required."),
        [EXAM_NAME]: yup
            .string()
            .required("The name of exam is required."),
        [EXAM_TEST_TIME]: yup
            .string()
            .required("The testing time of exam is required."),
        [DESCRIPTION]: yup
            .string()
            .required("The description of exam is required."),
    });
    const handleClickDelete = (item) => {
        setIsDelete(true);
        setExamSelect(item);
    }

    const handleClose = () => {
        if (isEdit)
            setIsEdit(false);
        if (isAdd)
            setIsAdd(false);
        if (isDelete)
            setIsDelete(false);
        setQuestionsSelect([]);
        setChooseQuestionByQr([]);
    }

    const handleShowStudentScore = (item) => {
        navigate(`/admin/score/${item.id}`);
    }

    const handleCloseShowChooseRandomQuestion = () => {
        setIsShowRandomQuestion(false);
        setQuestionsSelect([]);
    }

    const handleCloseShowChooseManualQuestion = () => {
        setIsShowManualQuestion(false);
        setChooseQuestionByQr([]);
    }

    const handleOpenManualQuestion = () => {
        setIsShowManualQuestion(true);
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
        body.startDate = convertDateToMiliseconds(body.startDate);
        body.endDate = convertDateToMiliseconds(body.endDate);
        if (isEdit) {
            let { classroomId, ...newBody } = body;
            updateExam(newBody);
        }
        if (isAdd) {
            if (convertDateToMiliseconds(body.startDate) - convertDateToMiliseconds(body.endDate) >= 0) {
                toast.error("Please choose end date must be after start date", toast.POSITION.TOP_RIGHT);
            } else {
                let { id, ...newBody } = body;
                if (questionsSelect.length != 0)
                    newBody = { ...newBody, questionIds: questionsSelect };
                else
                    newBody = { ...newBody, randomQuestions: chooseQuestionByQuestionGr };
                addExamByIdClassroom(newBody);
            }


        }
        if (isDelete)
            deleteExam(body.id);

        setActiveIndex(0);

    }

    const handleOpenRandomQuestion = () => {
        setIsShowRandomQuestion(true);
    }

    const handleClickPage = (index) => {
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

    const checkTimeStart = (list) => {
        list.map((item, index) => {
            let time = item.startDate;
            let timeReal = convertDateToMiliseconds(new Date());
            if (time - timeReal < 0) {
                setCheckExamStart((preValue) => [...preValue, item.id]);
            }
            return 0;
        })

    }

    const handleSearch = (data) => {
        getAllExamOfClassService(idClassRoom, isEnded, undefined, undefined, undefined, undefined, data).then((res) => {
            checkTimeStart(res.content);
            setListAllExam(res.content);
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
            toast.error(`Get Exam fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
            removeCredential();
            navigate(Path.LOGIN);
        });

    }

    const handleClickEdit = (item) => {
        form.clearErrors();
        setIsEdit(true);
        setTimeout(() => {
            setExamSelect(item);
        });
    }

    const updateExam = (body) => {
        updateExamService(body).then((res) => {
            getAllExam();
        }).catch((error) => {
            toast.error(`Update exam fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
        })
    }

    const deleteExam = (id) => {
        deleteExamService(id).then((res) => {
            getAllExam();
        }).catch((error) => {
            toast.error(`Delete exam fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
        })
    }

    const addExamByIdClassroom = (body) => {
        addExamByIdClassroomService(body).then((res) => {
            getAllExam();
        }).catch((error) => {
            toast.error(`Add exam fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
        })
    }

    const getAllExamOfClassroom = async (page, sortType, column, size, search) => {
        getAllExamOfClassService(idClassRoom, isEnded, page, sortType, column, size, search).then((res) => {
            setListAllExam(res.content);
            setIsLast(res.last);
            setIsFirst(res.first);
            checkTimeStart(res.content);
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
            toast.error(`Get Exam fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
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
        setCheckExamStart([]);
        if (idClassRoom)
            getAllExam();
        else {
            navigate(Path.AMCLASSMANAGER);
        }
    }, [isEnded]);

    return (
        <>
            <div className=" p-4 h-full w-full flex-row flex">
                <div className="p-4 dark:border-gray-700">
                    <div className='flex font-bold items-center justify-center pb-3 text-[40px]'>
                        Examination manager
                    </div>
                    <div className="flex items-center justify-start h-auto mb-4 bg-gray-100">
                        <div className=" overflow-auto shadow-md sm:rounded-lg">
                            <div className='p-3 items-center flex gap-4 justify-between mb-[14px]'>
                                <div onClick={() => navigate(-1)}
                                    className='top 0 flex justify-start items-center cursor-pointer w-fit rounded-lg p-5'>
                                    <FontAwesomeIcon className='mr-3' icon={faLeftLong} /> Back to previous page
                                </div>
                                <div className='w-[150px]'>
                                    <Toggle checked={isEnded} handleToggle={setIsEnded} >{isEnded ? 'Finished' : 'On Going'}</Toggle>
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
                                        !isLoading &&
                                        (listAllExam.length !== 0 && (
                                            listAllExam.map(
                                                (item, index) => {

                                                    return (
                                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                                            <th scope="row" className="w-[62px] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                                                {item.id}
                                                            </th>
                                                            <td className="px-6 py-4 w-[300px] ">
                                                                <p onClick={() => { }} className="cursor-pointer font-medium dark:text-blue-500 hover:underline max-w-[200px] line-clamp-1" title={item.testName}>{item.testName}</p>
                                                            </td>
                                                            <td className="px-6 py-4 w-[150px] " >
                                                                <p className=" truncate font-medium  max-w-[150px] line-clamp-1" title={getFormattedDateTimeByMilisecond(item.startDate)}>{getFormattedDateTimeByMilisecond(item.startDate)}</p>
                                                            </td>
                                                            <td className="px-6 py-4 w-[150px] " >
                                                                <p className=" truncate font-medium  max-w-[150px] line-clamp-1" title={getFormattedDateTimeByMilisecond(item.endDate)}>{getFormattedDateTimeByMilisecond(item.endDate)}</p>
                                                            </td>

                                                            <td className="px-6 py-4 w-[150px] " >
                                                                <p className=" truncate font-medium  max-w-[150px] line-clamp-1" title={item.testingTime}>{item.testingTime}</p>
                                                            </td>
                                                            <td className="px-6 py-4 w-[60px]">
                                                                <Menu >
                                                                    <MenuHandler>
                                                                        <Button className='bg-slate-400'>
                                                                            <FontAwesomeIcon icon={faBars} />
                                                                        </Button>
                                                                    </MenuHandler>
                                                                    <MenuList className='rounded-md'>
                                                                        {
                                                                            checkExamStart.indexOf(item.id) > -1 ? <MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { handleShowStudentScore(item) }}>Show student score has joined exam</MenuItem> : (<>
                                                                                <MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { handleClickEdit(item) }}>Edit</MenuItem>
                                                                                <MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { handleClickDelete(item) }} >Delete</MenuItem>
                                                                            </>)
                                                                        }
                                                                    </MenuList>
                                                                </Menu>

                                                            </td>
                                                        </tr>
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
                        </>) : (listAllExam.length === 0 && (
                            <>
                                <div className="grid w-full h-32 mt-5 px-4 bg-white place-content-center">
                                    <div className="text-center">
                                        <h1
                                            className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                                        >
                                            Uh-oh!
                                        </h1>
                                        <p className="mt-4 text-gray-500">We cannot find any exam in this classroom.</p>
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
                                    <p className="text-center text-lg font-medium">Edit exam</p>
                                    <InputField name={EXAM_NAME} label="Exam name" form={form} defaultValue={examSelect.testName} />
                                    <InputField name={DESCRIPTION} label="Description" form={form} defaultValue={examSelect.description || ""} />
                                    <InputField name={ID_EXAM} disabled form={form} defaultValue={examSelect.id} />
                                    <InputField type='number' name={EXAM_TEST_TIME} label="Time test" form={form} defaultValue={examSelect.testingTime} />
                                    <DatePicker name={START_DATE} label="Start date" form={form} defaultValue={setFormatDateYYYYMMDD(examSelect.startDate)} />
                                    <DatePicker name={END_DATE} label="End date" form={form} defaultValue={setFormatDateYYYYMMDD(examSelect.endDate)} />
                                    <ButtonE onClick={() => handleClose()} className="bg-blue-800" type='submit'>Submit</ButtonE>
                                </form>
                            </Modal.Body>
                        </Modal></>)
                }
                {isAdd && (
                    <>
                        <Modal className="bg-opacity-60 z-[101]" show={true} theme={{ 'content': { 'base': 'w-1/2 m-10' } }} popup onClose={() => handleClose()} >
                            <Modal.Header />
                            <Modal.Body>
                                <form onSubmit={form.handleSubmit(submitForm)}
                                    className="relative mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                                >
                                    <p className="text-center text-lg font-medium">Add Exam</p>
                                    <InputField name={EXAM_NAME} label="Exam name" form={form} defaultValue={''} />
                                    <InputField name={DESCRIPTION} label="Description" form={form} defaultValue={''} />
                                    <InputField name={ID_CLASSROOM} disabled form={form} defaultValue={idClassRoom} />
                                    <InputField type='number' name={EXAM_TEST_TIME} label="Time test" form={form} defaultValue={''} />
                                    <DatePicker name={START_DATE} label="Start date" form={form} defaultValue={''} />
                                    <DatePicker name={END_DATE} label="End date" form={form} defaultValue={''} />
                                    <div className='px w-[150px]'>
                                        <Menu placement='bottom-start' >
                                            <MenuHandler>
                                                <Button className='bg-slate-400'>
                                                    Add question
                                                </Button>
                                            </MenuHandler >
                                            <MenuList className='rounded-md z-[102]'>
                                                <MenuItem className='z-[102]rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { handleOpenRandomQuestion() }}>Add random by question group</MenuItem>
                                                <MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { handleOpenManualQuestion() }}>Add manual</MenuItem>


                                            </MenuList>
                                        </Menu>
                                    </div>
                                    <ButtonE onClick={() => handleClose()} className="bg-blue-800" type='submit'>Submit</ButtonE>
                                </form>
                            </Modal.Body>
                        </Modal></>)
                }
                {isDelete && (
                    <>
                        <Modal className="bg-opacity-60 z-[101] " show={true} size="md" popup onClose={() => handleClose()} >
                            <Modal.Header />
                            <Modal.Body>
                                <form onSubmit={form.handleSubmit(submitForm)}
                                    className="relative mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                                >
                                    <InputField name={ID_EXAM} disabled form={form} defaultValue={examSelect.id} />
                                    <p className="text-center text-[20px] font-medium text-yellow-300 uppercase"> Warning </p>
                                    <h1 className='text-[16px] text-center'>Are you sure you want to delete ?</h1>
                                    <div className='invisible py-3'></div>
                                    <div className='flex gap-3'>
                                        <ButtonE className="bg-red-500" type='submit'>Delete</ButtonE>
                                        <ButtonE onClick={() => handleClose()} className="bg-blue-400">Cancel</ButtonE>
                                    </div>
                                </form>
                            </Modal.Body>
                        </Modal></>)
                }
                {isShowRamdomQuestion && (
                    <>
                        <Modal className=" bg-opacity-60 z-[103]" show={true} theme={{ 'content': { 'base': 'w-[1000px]' } }} popup onClose={() => handleCloseShowChooseRandomQuestion()} >
                            <Modal.Header >
                                <h1>Choose question group</h1>
                                <hr className="relative left-0 right-0 my-2 border-black-200 focus-v !outline-none " />
                            </Modal.Header>
                            <Modal.Body className='flex justify-center flex-col'>
                                <div className='flex justify-center'>
                                    <QuestionGroup id={idClassRoom} chooseQuestionGroup={setChooseQuestionByQr} listQuestionGrChoose={chooseQuestionByQuestionGr} />
                                </div>

                                <div className="flex justify-center p-4 ">

                                    <Button

                                        onClick={() => handleCloseShowChooseRandomQuestion()} className="bg-blue-400">Submit</Button>
                                </div>

                            </Modal.Body>
                        </Modal></>)
                }
                {isShowManualQuestion && (
                    <>
                        <Modal className="bg-opacity-60 z-[103]" show={true} theme={{ 'content': { 'base': 'w-[1200px] ' } }} popup onClose={() => handleCloseShowChooseManualQuestion()} >
                            <Modal.Header >
                                <h1>Choose question</h1>
                                <hr className="relative left-0 right-0 my-2 border-black-200 focus-v !outline-none " />
                            </Modal.Header>
                            <Modal.Body>
                                <div className='flex justify-center'>
                                    <Questionmanager idClassroom={idClassRoom} setQuestionsSelect={setQuestionsSelect} idQuestionSelect={questionsSelect} />

                                </div>
                                <div className="flex justify-center p-4">
                                    <Button onClick={() => { handleCloseShowChooseManualQuestion() }} className="bg-blue-400">Submit</Button>
                                </div>

                            </Modal.Body>
                        </Modal></>)
                }

            </div >
        </ >

    )
}
