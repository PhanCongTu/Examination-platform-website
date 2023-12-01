import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { useForm } from 'react-hook-form';
import InputField from '../../../components/form-controls/InputField/InputField';
import Button from '../../../components/form-controls/Button/Button';
import { Modal } from 'flowbite-react';
import Toggle from '../../../components/form-controls/Toggle/Toggle';
import { addQuestionGroupService, deleteQuestionGroupService, getAllActivateQuestionGroupService, getAllUnActiveQuestionGroupService, removeCredential, updateQuestionGroupService } from '../../../services/ApiService';
import PaginationNav from '../../../components/pagination/PaginationNav';
import Path from '../../../utils/Path';
import { Questionmanager } from './Questionmanager';

const QUESTIONGROUP_CODE = 'code';
const QUESTIONGROUP_NAME = 'name';
const IS_ENABLE = 'isEnable';
const ID_QUESTIONGROUP = 'id';
const ID_CLASSROOM = 'classroomId';

export const QuestionGroup = (props) => {
    let { id } = useParams();
    const [isShowQuestion, setIsShowQuestion] = useState(false);
    const [isModeActive, setIsModeActivate] = useState(true);
    const [isAdd, setIsAdd] = useState(false);
    const [searchData, setSearchData] = useState('');
    const [listQuestionGroup, setlistQuestionGroup] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFirst, setIsFirst] = useState(false);
    const [isLast, setIsLast] = useState(false);
    const [offset, setOffset] = useState(0);
    const [numberOfElements, setNumberOfElements] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [questionGroupSelect, setQuestionGroupSelect] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isDelete, setIsDelete] = useState(false);
    const navigate = useNavigate();

    const initialValue = {
        [QUESTIONGROUP_CODE]: '',
        [QUESTIONGROUP_NAME]: '',
        [IS_ENABLE]: '',
        [ID_QUESTIONGROUP]: '',
        [ID_CLASSROOM]: ''
    };

    const handleClickDelete = (item) => {
        setIsDelete(true);
        setQuestionGroupSelect(item);
    }

    

    const handleClose = () => {
        setIsEdit(false);
        setIsAdd(false);
        setIsDelete(false);
        setIsShowQuestion(false);
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

    const handleShowQuestion = (item) => {
        setIsShowQuestion(true);
        setQuestionGroupSelect(item);
    }

    const submitForm = (body) => {
        console.log(body);
        if (isEdit)
            updateQuestionGroupService(body).then((res) => {
                toast.success(`Update question group successfully!`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                getAllQuestionGroup();
            }).catch((error) => {
                toast.error(`Update question group fail !`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })

        if (isAdd)
            addQuestionGroupService(body).then((res) => {
                toast.success(`Add question group successfully!`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                getAllQuestionGroup();
            }
            ).catch((error) => {
                toast.error(`Add question group fail !`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
        if (isDelete)
            deleteQuestionGroupService(body).then((res) => {
                toast.success(`Delete question group successfully!`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                getAllQuestionGroup();
            }).catch((error) => {
                toast.error(`Delete question group fail !`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })

        handleClose();
        setActiveIndex(0);
    }

    const handleClickPage = (index) => {
        setActiveIndex(index);
        getAllQuestionGroup(index);
    };

    const handlePrevious = (index) => {
        setActiveIndex(index - 1);
        getAllQuestionGroup(index - 1);
    }

    const handleNext = (index) => {
        setActiveIndex(index + 1);
        getAllQuestionGroup(index + 1);
    }

    const handleSearch = (data) => {
        console.log("SEARCH");
        if (isModeActive)
            getAllActivateQuestionGroupService(id, undefined, undefined, undefined, undefined, data).then((res) => {
                console.log(listQuestionGroup);
                setlistQuestionGroup(res.content);
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
            }
            ).catch((error) => {
                setIsLoading(false);
                toast.error(`Search question group fail !`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
            );
        else
            getAllUnActiveQuestionGroupService(id, undefined, undefined, undefined, undefined, data).then((res) => {
                console.log(listQuestionGroup);
                setlistQuestionGroup(res.content);
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
            }
            ).catch((error) => {
                setIsLoading(false);
                toast.error(`Search question group fail !`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                removeCredential();
                navigate(Path.LOGIN);
            });
    }

    const handleClickEdit = (item) => {
        console.log("IIII", item);
        setIsEdit(true);
        setTimeout(() => {
            setQuestionGroupSelect(item);
        });
        console.log(item);
    }

    const getAllActiveQuestionGroup = (page, sortType, column, size, search) => {
       
        getAllActivateQuestionGroupService(id, page, sortType, column, size, search).then((res) => {
            console.log(listQuestionGroup);
            setlistQuestionGroup(res.content);
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
        }
        ).catch((error) => {
            setIsLoading(false);
            toast.error(`Get question group fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
        );
    }
    const getAllUnActiveQuestionGroup = (page, sortType, column, size, search) => {
        getAllUnActiveQuestionGroupService(id, page, sortType, column, size, search).then((res) => {
            console.log(listQuestionGroup);
            setlistQuestionGroup(res.content);
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
        }
        ).catch((error) => {
            removeCredential();
            navigate(Path.LOGIN);
            setIsLoading(false);
            toast.error(`Get question group fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
        );
    }

    const getAllQuestionGroup = (page, sortType, column, size, search) => {
        if(!id){
            id=props.id;
        }
        if (isModeActive)
            getAllActiveQuestionGroup(page, sortType, column, size, search);
        else
            getAllUnActiveQuestionGroup(page, sortType, column, size, search);
    }

    const isActive = (index) => {
        return index === activeIndex;
    };

    useEffect(() => {
        console.log(id);
        if (id === ':id')
            navigate(Path.AMCLASSMANAGER);
        else
            getAllQuestionGroup();
    }, [isModeActive]);


    return (
        <div>
            <div className=" p-4 h-full w-full flex-row flex">
                <div className="p-4 dark:border-gray-700">
                    <div className="flex items-center justify-start h-auto mb-4 dark:bg-gray-800">
                        <div className=" overflow-auto shadow-md sm:rounded-lg">
                            <div className='items-center flex gap-4 justify-between mb-[14px]'>


                                <Toggle checked={isModeActive} handleToggle={setIsModeActivate} >{isModeActive ? 'Active' : 'Inactive'}</Toggle>
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 flex items-center pl-3 ">
                                        <Button handleOnClick={() => { handleSearch(searchData) }} >
                                            <svg className="w-5 h-5 text-white " aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                        </Button>
                                    </div>
                                    <input onChange={(e) => { setSearchData(e.target.value) }} type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />

                                </div>
                                <div className='flex gap-4  items-center justify-between'>
                                    <Button className="bg-blue-800" handleOnClick={() => { handleClickAdd() }}>Add question group</Button>
                                    {/* <Button className="bg-red-500" handleOnClick={() => { handleClickDelete() }}>Delete</Button> */}
                                </div>
                            </div>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>

                                        <th scope="col" className="px-6 py-3">
                                            ID question group
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Question group name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Question group code
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Enable
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        isLoading ? 'Loading ...' :
                                            (listQuestionGroup.length !== 0 ? (
                                                listQuestionGroup.map(
                                                    (item, index) => {

                                                        return (
                                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                                <th scope="row" className="w-[120px] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                                                    {item.id}
                                                                </th>
                                                                <td className="px-6 py-4 w-[200px]">
                                                                    <p onClick={() => { handleShowQuestion(item) }} className="cursor-pointer font-medium dark:text-blue-500 hover:underline" title={item.name}>{item.name}</p>
                                                                </td>
                                                                <td className="px-6 py-4 w-[200px]">
                                                                 
                                                                    <p  className="cursor-pointer font-medium dark:text-blue-500 " title={item.code}>{item.code}</p>
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
                                                                <td className="px-6 py-4 flex w-[150px]">
                                                                    <p onClick={() => { handleClickEdit(item) }} className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</p> &nbsp;/&nbsp;
                                                                    <p onClick={() => { handleClickDelete(item) }} className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</p>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                )) : (<>
                                                    <h1 className='text-sm'>
                                                        Currently there is no question group in the class. Come back later.</h1>
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
                                    <p className="text-center text-lg font-medium"> Edit Question Group </p>
                                    <InputField name={ID_QUESTIONGROUP} disabled form={form} defaultValue={questionGroupSelect.id} />
                                    <InputField name={QUESTIONGROUP_CODE} label="Question group code" form={form} defaultValue={questionGroupSelect.code} />
                                    <InputField name={QUESTIONGROUP_NAME} label="Question group name" form={form} defaultValue={questionGroupSelect.name} />



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
                                    <p className="text-center text-lg font-medium">Add question group</p>
                                    <InputField name={ID_CLASSROOM} disabled form={form} defaultValue={id} />
                                    <InputField name={QUESTIONGROUP_CODE} label="Question group code" form={form} defaultValue={''} />
                                    <InputField name={QUESTIONGROUP_NAME} label="Question group name" form={form} defaultValue={''} />
                                    <Button onClick={() => handleClose()} className="bg-blue-800" type='submit'>Submit</Button>
                                </form>
                            </Modal.Body>
                        </Modal></>)
                }
                {isDelete && (
                    <><div className='fixed bg-black opacity-60 top-0 right-0 left-0 bottom-0 rounded-none w-full h-full z-[100]'></div>
                        <Modal className="top-1/4 left-0 right-0 z-[101] m-auto w-96" show={true} size="md" popup onClose={() => handleClose()} >
                            <Modal.Header />
                            <Modal.Body>
                                <form onSubmit={form.handleSubmit(submitForm)}
                                    className="relative mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                                >
                                    <InputField name={ID_QUESTIONGROUP} disabled form={form} defaultValue={questionGroupSelect.id} />
                                    <p className="text-center text-[20px] font-medium text-yellow-300 uppercase"> Warning </p>
                                    <h1 className='text-[16px] text-center'>Are you sure you want to delete ?</h1>
                                    <div className='invisible py-3'></div>
                                    <div className='flex gap-3'>
                                        <Button className="bg-blue-400" type='submit'>Confirm</Button>
                                        <Button onClick={() => handleClose()} className=" bg-red-500">Cancel</Button>
                                    </div>
                                </form>
                            </Modal.Body>
                        </Modal></>)
                }
                {
                    isShowQuestion && (
                        <><div className='fixed bg-black opacity-60 top-0 right-0 left-0 bottom-0 rounded-none w-full h-full z-[100]'></div>
                            <Modal className="top-0 left-0 right-0 z-[101] m-auto w-auto" show={true} size="md" popup onClose={() => handleClose()} >
                                <Modal.Header >
                                    <h1>Question of question group</h1>
                                    <hr className="relative left-0 right-0 my-2 border-black-200 focus-v !outline-none " />
                                </Modal.Header>
                                <Modal.Body>
                                    <Questionmanager id={questionGroupSelect.id}/>
                                </Modal.Body>
                            </Modal></>)
                }
            </div >
        </div >

    )
}
