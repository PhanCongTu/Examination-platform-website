import React, { useEffect, useRef, useState } from 'react'
import Button from '../../../components/form-controls/Button/Button';
import { Modal, Toast } from 'flowbite-react';
import Toggle from '../../../components/form-controls/Toggle/Toggle';
import InputField from '../../../components/form-controls/InputField/InputField';
import PaginationNav from '../../../components/pagination/PaginationNav';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button as ButtonMenu,

} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { activeQuestionService, addQuestionByQuestionGroupService, deleteQuestionService, getAllActiveQuestionByIdClassroomService, getAllActiveQuestionByQuestionGrIDService, getAllInActiveQuestionByIdClassroomService, getAllInActiveQuestionByQuestionGrIDService, removeCredential, updateQuestionService } from '../../../services/ApiService';
import Path from '../../../utils/Path';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
const CONTENT_QUESTION = 'content';
const QUESTION_GROUP_ID = 'questionGroupId';
const ANSWER1 = 'answer1';
const ANSWER2 = 'answer2';
const ANSWER3 = 'answer3';
const ANSWER4 = 'answer4';
const ID_QUESTION = 'id';
export const Questionmanager = (props) => {
    const navigate = useNavigate();
    const [contentQuestion, setContentQuestion] = useState('');
    const [listAnswer, setListAnswer] = useState([]);
    const [clickCount, setClickCount] = useState(1);
    const [isQuestionGroupOpen, setIsQuestionGroupOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [searchData, setSearchData] = useState('');
    const [listAllQuestion, setListAllQuestion] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFirst, setIsFirst] = useState(false);
    const [isLast, setIsLast] = useState(false);
    const [offset, setOffset] = useState(0);
    const [size, setSize] = useState(6);
    const [numberOfElements, setNumberOfElements] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [questionSelect, setQuestionSelect] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isDelete, setIsDelete] = useState(false);
    const [isChooseTrue, setChooseTrue] = useState(false);
    const [isModeActive, setIsModeActivate] = useState(true);
    const [answer, setAnswer] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [listCheckBox, setListCheckBox] = useState([]);
    const [isAllCheckBox, setIsAllCheckBox] = useState(true);
    const [isChooseActive, setIsChooseActive] = useState(false);

    const handleInputContent = (event) => {
        setContentQuestion(event.target.value);
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setChooseTrue(true);
    };

    const showAnswer = useRef(null);

    const initialValue = {
        [CONTENT_QUESTION]: '',
        [QUESTION_GROUP_ID]: '',
        [ID_QUESTION]: '',
        [ANSWER1]: '',
        [ANSWER2]: '',
        [ANSWER3]: '',
        [ANSWER4]: '',
    };
    const handleAddAnswer = (event) => {
        event.preventDefault();
        if (answer === '') {
            toast.error('Please enter answer', { position: toast.POSITION.TOP_RIGHT })
        }
        else {
            const updatedListAnswer = [...listAnswer];
            if (listAnswer.length === 0) {
                updatedListAnswer.push(answer);
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'options';
                input.value = answer;
                input.className = 'mr-[5px]';
                label.className = 'flex items-center'
                setListAnswer(updatedListAnswer);
                input.checked = selectedOption === input.value;
                input.addEventListener('change', handleOptionChange);
                // Object.assign(input, form.register('asnwer' + clickCount));
                label.appendChild(input);
                label.appendChild(document.createTextNode(answer));
                showAnswer.current.appendChild(label);
                setClickCount(clickCount + 1);
                setAnswer('');
            }
            else {
                if (updatedListAnswer.indexOf(answer) === -1) {
                    updatedListAnswer.push(answer);
                    const label = document.createElement('label');
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.name = 'options';
                    input.value = answer;
                    input.className = 'mr-[5px]';
                    label.className = 'flex items-center'
                    setListAnswer(updatedListAnswer);
                    input.checked = selectedOption === input.value;
                    input.addEventListener('change', (event) => handleOptionChange(event));
                    label.appendChild(input);
                    label.appendChild(document.createTextNode(answer));
                    showAnswer.current.appendChild(label);
                    setClickCount(clickCount + 1);
                    setAnswer('');
                }
                else {
                    toast.error('Please enter an answer different from the one already given', toast.POSITION.TOP_RIGHT);
                }
            }

        }


    }

    const handleInputAnswer = (event) => {
        setAnswer(event.target.value);
    }

    const isChecked = (itemId) => {
        const filteredItems = listCheckBox.filter((item) => item === itemId);
        return filteredItems.length > 0;
    };

    const handleCheckboxChange = (event, id, isAll) => {
        if (isAll === true) {
            setListCheckBox(listAllQuestion.map((item, index) => {
                return item.id;
            }));
            if (props.setQuestionsSelect) {
                props.setQuestionsSelect(listAllQuestion.map((item, index) => {
                    return item.id;
                }))
            }
            setIsAllCheckBox(!isAll);
        } else if (isAll === false) {
            setListCheckBox([]);
            if (props.setQuestionsSelect) {
                props.setQuestionsSelect([]);
            }
            setIsAllCheckBox(!isAll);
        }
        else {
            const isChecked = event.target.checked;

            if (isChecked) {
                setListCheckBox((prevSelected) => [...prevSelected, id]);
                if (props.setQuestionsSelect) {
                    props.setQuestionsSelect([...listCheckBox, id]
                    )
                }
            } else {
                setListCheckBox((prevSelected) =>
                    prevSelected.filter((value) => value !== id)
                );
                if (props.setQuestionsSelect) {
                    props.setQuestionsSelect(listCheckBox.filter((value) => value !== id))
                }
            }
        }

    };

    const handleClickDelete = (item) => {
        setIsDelete(true);
        setQuestionSelect(item);
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
        setAnswer('');
        setSelectedOption('');
        setClickCount(1);
        setListAnswer([]);
        setChooseTrue(false);
    }

    const handleClickAdd = () => {
        setIsAdd(true);
    }

    const form = useForm({
        mode: 'onSubmit',
        defaultValues: initialValue,
        criteriaMode: "firstError"
    })

    // const { defaultValue,on ...otherProps } = form.register(CONTENT_QUESTION);

    const submitForm = (body) => {
        handleClose();
        const newBody = {
            content: contentQuestion,
            firstAnswer: {
                answerContent: body.answer1
            },
            secondAnswer: {
                answerContent: body.answer2,

            },
            thirdAnswer: {
                answerContent: body.answer3,
            },
            fourthAnswer: {
                answerContent: body.answer4
            },
            questionGroupId: body.questionGroupId
        }

        if (isEdit) {
            switch (selectedOption) {
                case 'firstAnswer':
                    newBody.firstAnswer.isCorrect = true;
                    break;
                case 'secondAnswer':
                    newBody.secondAnswer.isCorrect = true;
                    break;
                case 'thirdAnswer':
                    newBody.thirdAnswer.isCorrect = true;
                    break;
                default:
                    newBody.fourthAnswer.isCorrect = true;
                    break;
            }
            let { questionGroupId, ...newBodys } = newBody;
            newBodys.id = body.id;
            updateQuestionService(newBodys).then((res) => {
                getAllQuestion();
                toast.success('Edit question successfuly', { position: toast.POSITION.TOP_RIGHT });
            }).catch((error) => {
                toast.error('Edit question fail', { position: toast.POSITION.TOP_RIGHT });
            })
        }

        if (isAdd) {

            listAnswer.map((item, index) => {
                if (selectedOption === item) {
                    switch (index) {
                        case 0:
                            newBody.firstAnswer.isCorrect = true;
                            break;
                        case 1:
                            newBody.secondAnswer.isCorrect = true;
                            break;
                        case 2:
                            newBody.thirdAnswer.isCorrect = true;
                            break;
                        default:
                            newBody.fourthAnswer.isCorrect = true;
                            break;
                    }
                }
            })
            addQuestionByQuestionGroupService(newBody).then((res) => {
                getAllQuestion();
                toast.success('Add question successfuly', { position: toast.POSITION.TOP_RIGHT });
            }).catch((error) => {
                toast.error('Add question fail', { position: toast.POSITION.TOP_RIGHT });
            })
        }

        if (isDelete)
            deleteQuestionService(body.id).then((res) => {
                getAllQuestion();
                toast.success('Delete question successfuly', { position: toast.POSITION.TOP_RIGHT });
            }).catch((error) => {
                toast.error('Delete question fail', { position: toast.POSITION.TOP_RIGHT });
            })
        if (isChooseActive)
            activeQuestionService(body.id).then((res) => {
                getAllQuestion();
                toast.success('Active question successfuly', { position: toast.POSITION.TOP_RIGHT });
            }).catch((error) => {
                toast.error('Active question fail', { position: toast.POSITION.TOP_RIGHT });
            })
        setActiveIndex(0);

    }

    const handleClickPage = (index) => {
        setActiveIndex(index);
        getAllQuestion(index);
    };

    const handlePrevious = (index) => {

        setActiveIndex(index - 1);
        getAllQuestion(index - 1);
    }

    const handleNext = (index) => {

        setActiveIndex(index + 1);
        getAllQuestion(index + 1);
    }

    const handleSearch = (data) => {
        if (props.idClassroom)
            if (isModeActive)
                getAllActiveQuestionByIdClassroomService(props.idClassroom, undefined, undefined, undefined, size, data).then((res) => {
                    setListAllQuestion(res.content);
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
                    toast.error(`Search question active fail !`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    removeCredential();
                    navigate(Path.LOGIN);
                })
            else
                getAllInActiveQuestionByIdClassroomService(props.idClassroom, undefined, undefined, undefined, size, data).then((res) => {
                    setListAllQuestion(res.content);
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
                    toast.error(`Get question inactive fail !`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    removeCredential();
                    navigate(Path.LOGIN);
                })
        else
            if (isModeActive)
                getAllActiveQuestionByQuestionGrIDService(props.id, undefined, undefined, undefined, size, data).then((res) => {
                    setListAllQuestion(res.content);
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
                    toast.error(`Search question active fail !`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    removeCredential();
                    navigate(Path.LOGIN);
                });
            else
                getAllInActiveQuestionByQuestionGrIDService(props.id, undefined, undefined, undefined, size, data).then((res) => {
                    setListAllQuestion(res.content);
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
                    toast.error(`Search question inactive fail !`, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    removeCredential();
                    navigate(Path.LOGIN);
                });
    }

    const handleClickActive = (item) => {

        setIsChooseActive(true);
        setTimeout(() => {
            setQuestionSelect(item);
        });
    }

    const handleClickEdit = (item) => {
        setContentQuestion(item.content);
        setIsEdit(true);
        setQuestionSelect(item);
    }

    const getAllInActiveQuestionByQuestionGrID = async (page, sortType, column, size, search) => {
        getAllInActiveQuestionByQuestionGrIDService(props.id, page, sortType, column, size, search).then((res) => {
            setListAllQuestion(res.content);
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
            toast.error(`Get question inactive fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
            removeCredential();
            navigate(Path.LOGIN);
        });
    }

    const getAllActiveQuestionByQuestionGrID = async (page, sortType, column, size, search) => {
        getAllActiveQuestionByQuestionGrIDService(props.id, page, sortType, column, size, search).then((res) => {
            setListAllQuestion(res.content);
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
            toast.error(`Get question active fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
            removeCredential();
            navigate(Path.LOGIN);
        });
    }

    const getAllActiveQuestionByIdClassroom = async (page, sortType, column, size, search) => {
        getAllActiveQuestionByIdClassroomService(props.idClassroom, page, sortType, column, size, search).then((res) => {
            setListAllQuestion(res.content);
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
            toast.error(`Get question active fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
            removeCredential();
            navigate(Path.LOGIN);
        });
    }

    const getAllInActiveQuestionByIdClassroom = async (page, sortType, column, size, search) => {
        getAllInActiveQuestionByIdClassroomService(props.idClassroom, page, sortType, column, size, search).then((res) => {
            setListAllQuestion(res.content);
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
            toast.error(`Get question inactive fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
            removeCredential();
            navigate(Path.LOGIN);
        });
    }

    const getAllQuestion = (page, sortType, column, size, search) => {
        if (props.idQuestionSelect)
            setListCheckBox(props.idQuestionSelect);
        if (props.idClassroom)
            if (isModeActive)
                getAllActiveQuestionByIdClassroom(page, sortType, column, size = 6, search);
            else
                getAllInActiveQuestionByIdClassroom(page, sortType, column, size = 6, search);
        else
            if (isModeActive)
                getAllActiveQuestionByQuestionGrID(page, sortType, column, size = 6, search);
            else
                getAllInActiveQuestionByQuestionGrID(page, sortType, column, size = 6, search);
    }

    const isActive = (index) => {
        return index === activeIndex;
    };

    useEffect(() => {

        if (props.id || props.idClassroom)
            getAllQuestion();
        else
            navigate(Path.AMCLASSMANAGER);
    }, [isModeActive]);


    return (
        <>
            <div className=" p-1 h-full w-full flex-row flex min-h-[600px]">
                <div className="p-4 dark:border-gray-700 w-full">
                    <div className="flex items-center justify-start h-auto mb-4 bg-gray-100">
                        <div className="w-full overflow-auto shadow-md sm:rounded-lg">
                            <div className='p-3 items-center flex gap-4 justify-between mb-[14px]'>
                                <div className='w-[150px]'>
                                    <Toggle checked={isModeActive} handleToggle={setIsModeActivate} >{isModeActive ? 'Active' : 'Inactive'}</Toggle>
                                </div>

                                <div className="relative float-right">
                                    <div className="absolute inset-y-0 right-0 flex items-center pl-3 ">
                                        <Button handleOnClick={() => { handleSearch(searchData) }} >
                                            <svg className="w-5 h-5 text-white dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                        </Button>
                                    </div>
                                    <input onChange={(e) => { setSearchData(e.target.value) }} type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />

                                </div>
                                {props.id &&
                                    <div className='flex gap-4  items-center justify-between'>

                                        <Button className="bg-blue-800" handleOnClick={() => { handleClickAdd() }}>Add question</Button>

                                    </div>
                                }

                            </div>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="p-4 w-4">
                                            <div className="flex items-center">
                                                <input onChange={() => handleCheckboxChange(undefined, undefined, isAllCheckBox)} id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-[70px]">
                                            ID question
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-[300px] " >
                                            Question
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-[150px]">
                                            First answer
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-[150px]">
                                            Second answer
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-[150px]">
                                            Third answer
                                        </th>
                                        <th scope="col" className="px-6 py-3 w-[150px]">
                                            Fourth answer
                                        </th>
                                        {
                                            props.id && (<th scope="col" className="px-6 py-3 w-[70px]">
                                                Action
                                            </th>)
                                        }


                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        !isLoading &&
                                        (listAllQuestion.length !== 0 && (
                                            listAllQuestion.map(
                                                (item, index) => {

                                                    return (
                                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <td className="w-4 p-4 ">
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
                                                            </td>
                                                            <th scope="row" className="w-[150px] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                                                {item.id}
                                                            </th>
                                                            <td className="px-6 py-4 w-[300px] ">
                                                                <p onClick={() => { }} className="cursor-pointer font-medium dark:text-blue-500 hover:underline max-w-[300px] line-clamp-1" title={item.content}>{item.content}</p>
                                                            </td>
                                                            <td className="px-6 py-4 w-[150px] " >
                                                                <p className=" truncate font-medium  max-w-[150px] line-clamp-1" title={item.firstAnswer}>{item.firstAnswer}</p>
                                                            </td>
                                                            <td className="px-6 py-4 w-[150px] " >
                                                                <p className=" truncate font-medium  max-w-[150px] line-clamp-1" title={item.secondAnswer}>{item.secondAnswer}</p>
                                                            </td>
                                                            <td className="px-6 py-4 w-[150px] " >
                                                                <p className=" truncate font-medium  max-w-[150px] line-clamp-1" title={item.thirdAnswer}>{item.thirdAnswer}</p>
                                                            </td>

                                                            <td className="px-6 py-4 w-[150px] " >
                                                                <p className=" truncate font-medium  max-w-[150px] line-clamp-1" title={item.fourthAnswer}>{item.fourthAnswer}</p>
                                                            </td>
                                                            {
                                                                props.id && (<td className="px-6 py-4 w-[60px]">
                                                                    <Menu >
                                                                        <MenuHandler>
                                                                            <ButtonMenu className='bg-slate-400'>
                                                                                <FontAwesomeIcon icon={faBars} />
                                                                            </ButtonMenu>
                                                                        </MenuHandler>

                                                                        {
                                                                            isModeActive ? (<MenuList className='rounded-md z-[105]'> <MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { handleClickEdit(item) }}>Edit</MenuItem>
                                                                                <MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { handleClickDelete(item) }} >Delete</MenuItem></MenuList>)
                                                                                : (<MenuList className='rounded-md z-[105]'><MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { handleClickActive(item) }} >Active</MenuItem></MenuList>)
                                                                        }



                                                                    </Menu>

                                                                </td>)
                                                            }

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
                        </>) : (listAllQuestion.length === 0 && (<>
                            <div className="grid w-full h-32 mt-5 px-4 bg-white place-content-center">
                                <div className="text-center">
                                    <h1
                                        className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                                    >
                                        Uh-oh!
                                    </h1>
                                    <p className="mt-4 text-gray-500">We cannot find any question.</p>
                                </div>
                            </div>
                        </>))
                    }
                </div>
                {isEdit && (
                    <>
                        <Modal className="bg-opacity-60 z-[105] m-auto" show={true} theme={{ 'content': { 'base': 'w-1/2 m-10' } }} popup onClose={() => handleClose()} >
                            <Modal.Header />
                            <Modal.Body>
                                <form onSubmit={form.handleSubmit(submitForm)}
                                    className="relative mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                                >

                                    <p className="text-center text-lg font-medium">Edit question</p>
                                    <label htmlFor={CONTENT_QUESTION} className="block pb-1 text-sm font-medium text-gray-700">Question</label>
                                    <textarea className='border-2 resize-none outline-none border-gray-500/75 w-full rounded-lg p-4 pe-12 text-sm ' defaultValue={questionSelect.content} onChange={(event) => { handleInputContent(event) }} ></textarea>
                                    {/* <InputField name={CONTENT_QUESTION} label="Question" form={form} defaultValue={questionSelect.content} /> */}
                                    <InputField name='id' disabled form={form} defaultValue={questionSelect.id} />
                                    <InputField name={ANSWER1} label="First Answer" form={form} defaultValue={questionSelect.firstAnswer}
                                        children={<><input
                                            className=' absolute mt-0 mb-0 mr-1 top-[25%] right-0  w-6 h-1/2'
                                            type="radio"
                                            name="options"
                                            value={'firstAnswer'}
                                            checked={selectedOption === 'firstAnswer'}
                                            onChange={(event) => handleOptionChange(event)}
                                        /></>} />
                                    <InputField name={ANSWER2} label="Second Answer" form={form} defaultValue={questionSelect.secondAnswer}
                                        children={<><input
                                            className=' absolute mt-0 mb-0 mr-1 top-[25%] right-0  w-6 h-1/2'
                                            type="radio"
                                            name="options"
                                            value={'secondAnswer'}
                                            checked={selectedOption === 'secondAnswer'}
                                            onChange={(event) => handleOptionChange(event)}
                                        /></>} />
                                    <InputField name={ANSWER3} label="Third Answer" form={form} defaultValue={questionSelect.thirdAnswer}
                                        children={<><input
                                            className=' absolute mt-0 mb-0 mr-1 top-[25%] right-0  w-6 h-1/2'
                                            type="radio"
                                            name="options"
                                            value={'thirdAnswer'}
                                            checked={selectedOption === 'thirdAnswer'}
                                            onChange={(event) => handleOptionChange(event)}
                                        /></>} />
                                    <InputField name={ANSWER4} label="Fourth Answer" form={form} defaultValue={questionSelect.fourthAnswer}
                                        children={<><input
                                            className=' absolute mt-0 mb-0 mr-1 top-[25%] right-0  w-6 h-1/2'
                                            type="radio"
                                            name="options"
                                            value={'fourthAnswer'}
                                            checked={selectedOption === 'fourthAnswer'}
                                            onChange={(event) => handleOptionChange(event)}
                                        /></>} />
                                    <Button onClick={() => handleClose()} className={clsx((!isChooseTrue) ? 'pointer-events-none opacity-50 bg-blue-800' : "bg-blue-800")} type='submit'>Submit</Button>
                                </form>
                            </Modal.Body>
                        </Modal></>)
                }
                {isAdd && (
                    <>
                        <Modal className="bg-opacity-60 z-[105] " show={true} theme={{ 'content': { 'base': 'w-1/2 m-10' } }} popup onClose={() => handleClose()} >
                            <Modal.Header />
                            <Modal.Body>
                                <form onSubmit={form.handleSubmit(submitForm)}
                                    className="relative mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                                >
                                    <p className="text-center text-lg font-medium">Add question</p>
                                    <InputField name={QUESTION_GROUP_ID} disabled form={form} defaultValue={props.id} />
                                    <InputField name={ANSWER1} disabled form={form} defaultValue={listAnswer[0] || ''} />
                                    <InputField name={ANSWER2} disabled form={form} defaultValue={listAnswer[1] || ''} />
                                    <InputField name={ANSWER3} disabled form={form} defaultValue={listAnswer[2] || ''} />
                                    <InputField name={ANSWER4} disabled form={form} defaultValue={listAnswer[3] || ''} />
                                    <label htmlFor={CONTENT_QUESTION} className="block pb-1 text-sm font-medium text-gray-700">Question</label>
                                    <textarea className='border-2 resize-none outline-none border-gray-500/75 w-full rounded-lg p-4 pe-12 text-sm ' onChange={(event) => { handleInputContent(event) }} defaultValue={''}></textarea>
                                    <div>
                                        <label className='block pb-1 text-sm font-medium text-gray-700'>
                                            Answer
                                        </label>
                                        <div className={clsx('relative flex justify-center ')}>

                                            <input value={answer} onChange={(event) => { handleInputAnswer(event) }} type="text" className={clsx('text-opacity-50 border-2 border-gray-500/75  rounded-lg p-4 pe-12 text-sm shadow-sm w-full h-full', clickCount <= 4 ? '' : 'pointer-events-none opacity-50')} placeholder='Enter answer'>

                                            </input>
                                            <button onClick={(event) => { handleAddAnswer(event) }} className={clsx('border-2 m-1 border-blue-200 rounded-lg bg-green-200 text-xs', clickCount <= 4 ? '' : 'pointer-events-none opacity-50')} >Add answer</button>
                                        </div>
                                    </div>
                                    <div ref={showAnswer} className='showAnswer flex flex-col' >
                                    </div>
                                    <Button onClick={() => handleClose()} className={clsx((clickCount <= 4 || !isChooseTrue) ? 'pointer-events-none opacity-50 bg-blue-800' : "bg-blue-800")} type='submit'>Submit</Button>
                                </form>
                            </Modal.Body>
                        </Modal></>)
                }
                {isDelete && (
                    <>
                        <Modal className="bg-opacity-60 z-[105] " show={true} size="md" popup onClose={() => handleClose()} >
                            <Modal.Header />
                            <Modal.Body>
                                <form onSubmit={form.handleSubmit(submitForm)}
                                    className="relative mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                                >
                                    <InputField name={ID_QUESTION} disabled form={form} defaultValue={questionSelect.id} />
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
                {isChooseActive && (
                    <>
                        <Modal className="bg-opacity-60 z-[105] " show={true} size="md" popup onClose={() => handleClose()} >
                            <Modal.Header />
                            <Modal.Body>
                                <form onSubmit={form.handleSubmit(submitForm)}
                                    className="relative mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                                >
                                    <InputField name={ID_QUESTION} disabled form={form} defaultValue={questionSelect.id} />
                                    <p className="text-center text-[20px] font-medium text-yellow-300 uppercase"> Confirm </p>
                                    <h1 className='text-[16px] text-center'>Are you sure you want to active ?</h1>
                                    <div className='invisible py-3'></div>
                                    <div className='flex gap-3'>
                                        <Button className="bg-red-500" type='submit'>Confirm</Button>
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
