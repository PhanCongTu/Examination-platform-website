import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { useForm } from 'react-hook-form';
import InputField from '../../../components/form-controls/InputField/InputField';
import Button from '../../../components/form-controls/Button/Button';
import { Modal } from 'flowbite-react';
import Toggle from '../../../components/form-controls/Toggle/Toggle';
import { activeQuestionGroupService, addQuestionGroupService, deleteQuestionGroupService, getAllActivateQuestionGroupService, getAllUnActiveQuestionGroupService, removeCredential, updateQuestionGroupService } from '../../../services/ApiService';
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
    const [isChooseActionActive, setIsChooseActionActive] = useState(false);
    const [valueNumberOfQuestion, setValueNumberOfQuestion] = useState({});

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

    const handleEnterNumberQuestion = (event, item) => {
        let value = event.target.value;
        if (value !== '') {
            console.log(item.totalQuestion, value);
            if (item.totalQuestion < Number(value)) {
                toast.error(`Number question of question group is ${item.totalQuestion}.Please enter again.`, toast.POSITION.TOP_RIGHT);
                event.target.value = '';

            }
            else {
                props.chooseQuestionGroup((preValue) => {
                    const existingQuestionGroup = preValue.find((group) => group.questionGroupId === Number(item.id));
                    if (existingQuestionGroup) {
                        return preValue.map((group) => {
                            if (group.questionGroupId === Number(item.id)) {
                                return {
                                    ...group,
                                    numberOfQuestion: value
                                };
                            }
                            return group;
                        });
                    } else {
                        return [
                            ...preValue,
                            {
                                questionGroupId: Number(item.id),
                                numberOfQuestion: value
                            }
                        ];
                    }
                })
            }

        } else {
            console.log(value);
            props.chooseQuestionGroup((preValue) => preValue.filter((valueS) => valueS.questionGroupId != Number(item.id)))
        }
    }

    const handleClose = () => {
        setIsEdit(false);
        setIsAdd(false);
        setIsDelete(false);
        setIsShowQuestion(false);
        setIsChooseActionActive(false);
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
        if (isChooseActionActive)
            activeQuestionGroupService(body.id).then((res) => {
                toast.success(`Active question group successfully!`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                getAllQuestionGroup();
            }).catch((error) => {
                toast.error(`Active question group fail !`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
        handleClose();
        setActiveIndex(0);
    }

    const handleShowDefaultValue = (id) => {
        console.log("VVVVVVVVVVVVVVVVVV");
        console.log(valueNumberOfQuestion);
        console.log(id);
        const foundItem = valueNumberOfQuestion.find((item) => item.questionGroupId == Number(id));
        if (foundItem) {
            console.log("AAAAAAA ", foundItem);
            return foundItem.numberOfQuestion;
        }
        return null;
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

    const handleClickActive = (item) => {
        console.log("IIII", item);
        setIsChooseActionActive(true);
        setTimeout(() => {
            setQuestionGroupSelect(item);
        });
        console.log(item);
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
            removeCredential();
            navigate(Path.LOGIN);
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
        if (!id) {
            id = props.id;
            size = 6;
            setValueNumberOfQuestion(props.listQuestionGrChoose)
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

                                <div className='w-[200px]'>
                                    <Toggle checked={isModeActive} handleToggle={setIsModeActivate} >{isModeActive ? 'Active' : 'Inactive'}</Toggle>

                                </div>
                                <div className="relative float-right">
                                    <div className="absolute inset-y-0 right-0 flex items-center pl-3 ">
                                        <Button handleOnClick={() => { handleSearch(searchData) }} >
                                            <svg className="w-5 h-5 text-white " aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                        </Button>
                                    </div>
                                    <input onChange={(e) => { setSearchData(e.target.value) }} type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />

                                </div>
                                {
                                    !props.id && <div className='flex gap-4  items-center justify-between'>
                                        <Button className="bg-blue-800" handleOnClick={() => { handleClickAdd() }}>Add question group</Button>
                                    </div>
                                }

                            </div>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>

                                        <th scope="col" className="px-6 py-3 w-[200px]">
                                            ID question group
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-[300px]">
                                            Question group name
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-[300px]">
                                            Question group code
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-[70px]">
                                            Enable
                                        </th>
                                        {
                                            !props.id && <th scope="col" className="px-6 py-3 w-[150px]">
                                                Action
                                            </th>
                                        }
                                        {
                                            props.id && <th scope="col" className="px-6 py-3 w-[300px]">
                                                Number question
                                            </th>
                                        }

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        !isLoading &&
                                        (listQuestionGroup.length !== 0 && (
                                            listQuestionGroup.map(
                                                (item, index) => {

                                                    return (
                                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <th scope="row" className="w-[200px] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                                                {item.id}
                                                            </th>
                                                            <td className="px-6 py-4 w-[300px]">
                                                                <p onClick={() => { if (!props.id) handleShowQuestion(item); }} className="cursor-pointer font-medium dark:text-blue-500 hover:underline" title={item.name}>{item.name}</p>
                                                            </td>
                                                            <td className="px-6 py-4 w-[300px]">

                                                                <p className="cursor-pointer font-medium dark:text-blue-500 " title={item.code}>{item.code}</p>
                                                            </td>
                                                            <td className="px-6 py-4 w-[70px]">
                                                                <div className="flex items-center">
                                                                    {
                                                                        item.isEnable === true ? (<><div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                                                                            Active</>
                                                                        ) : (<><div className="h-2.5 w-2.5 rounded-full bg-red-500 "></div> Passive</>)
                                                                    }
                                                                </div>
                                                            </td>
                                                            {
                                                                !props.id && <td className="px-6 py-4 flex w-[150px]">
                                                                    {
                                                                        isModeActive ? (<>
                                                                            <p onClick={() => { handleClickEdit(item) }} className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</p> &nbsp;/&nbsp;
                                                                            <p onClick={() => { handleClickDelete(item) }} className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</p></>)
                                                                            : (<p onClick={() => { handleClickActive(item) }} className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">Active</p>)
                                                                    }


                                                                </td>
                                                            }
                                                            {
                                                                props.id && <td className="px-6 py-4 w-[300px]">
                                                                    <input
                                                                        className=' border-black-100 border'
                                                                        type="number"
                                                                        onChange={(event) => { handleEnterNumberQuestion(event, item) }}
                                                                        defaultValue={handleShowDefaultValue(item.id)}
                                                                    />
                                                                </td>
                                                            }

                                                        </tr>
                                                    )
                                                }
                                            )))
                                    }
                                </tbody>
                            </table>
                            {
                                isLoading ? (<>
                                    <h1 className='text-sm pl-1'>Loading...</h1>
                                </>) : (listQuestionGroup.length === 0 && (<>
                                    <h1 className='text-sm pl-1'>
                                        Currently there is no question group in the class. Come back later.</h1>
                                </>))
                            }

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
                    <>
                        <Modal className="bg-opacity-60 z-[101]" show={true} theme={{ 'content': { 'base': 'w-1/2 m-10' } }} popup onClose={() => handleClose()} >
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
                    <>
                        <Modal className="bg-opacity-60 z-[101]" show={true} theme={{ 'content': { 'base': 'w-1/2 m-10' } }} popup onClose={() => handleClose()} >
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
                    <>
                        <Modal className="bg-opacity-60 z-[101]" show={true} size="md" popup onClose={() => handleClose()} >
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
                {isChooseActionActive && (
                    <>
                        <Modal className="bg-opacity-60 z-[101]" show={true} size="md" popup onClose={() => handleClose()} >
                            <Modal.Header />
                            <Modal.Body>
                                <form onSubmit={form.handleSubmit(submitForm)}
                                    className="relative mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                                >
                                    <InputField name={ID_QUESTIONGROUP} disabled form={form} defaultValue={questionGroupSelect.id} />
                                    <p className="text-center text-[20px] font-medium text-green-400 uppercase"> Confirm </p>
                                    <h1 className='text-[16px] text-center'>Are you sure you want to active ?</h1>
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
                        <>
                            <Modal className="bg-opacity-60 z-[101] w-auto" show={true} theme={{ 'content': { 'base': 'w-full m-10' } }} popup onClose={() => handleClose()} >
                                <Modal.Header >
                                    <h1>Question of question group</h1>
                                    <hr className="relative left-0 right-0 my-2 border-black-200 focus-v !outline-none " />
                                </Modal.Header>
                                <Modal.Body className='flex justify-center'>
                                    <div className=''>

                                        <Questionmanager id={questionGroupSelect.id} />
                                    </div>
                                </Modal.Body>
                            </Modal></>)
                }
            </div >
        </div >

    )
}
