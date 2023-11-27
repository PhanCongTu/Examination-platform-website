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
    input
} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { addQuestionByQuestionGroupService, deleteQuestionService, getAllActiveQuestionService, getAllInActiveQuestionService, removeCredential, updateQuestionService } from '../../../services/ApiService';
import Path from '../../../utils/Path';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { createRoot } from 'react-dom/client';
const CONTENT_QUESTION = 'content';
const QUESTION_GROUP_ID = 'questionGroupId';
const ANSWER1 = 'answer1';
const ANSWER2 = 'answer2';
const ANSWER3 = 'answer3';
const ANSWER4 = 'answer4';
const ID_QUESTION = 'id';
export const Questionmanager = (props) => {
    const navigate = useNavigate();
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
    const [numberOfElements, setNumberOfElements] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [questionSelect, setQuestionSelect] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isDelete, setIsDelete] = useState(false);
    const [isToggle, setIsToggle] = useState(false);
    const [isModeActive, setIsModeActivate] = useState(true);
    const [answer, setAnswer] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);

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
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'options';
            input.value = answer;
            const updatedListAnswer = [...listAnswer];
            updatedListAnswer.push(answer);
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


    }

    const handleInputAnswer = (event) => {
        setAnswer(event.target.value);
    }

    const isChecked = (itemId) => {
        // const filteredItems = listClassDelete.filter((item) => item === itemId);
        // console.log(filteredItems.length > 0);
        // return filteredItems.length > 0;
    };

    const handleCheckboxChange = (event, id, isAll) => {
        if (isAll) {
            // setListClassDelete(listAllQuestion.map((item, index) => {
            //     return item.id;
            // }));
        } else {
            const isChecked = event.target.checked;

            if (isChecked) {
                //setListClassDelete((prevSelected) => [...prevSelected, id]);
            } else {
                // setListClassDelete((prevSelected) =>
                //     prevSelected.filter((value) => value !== id)
                // );
            }
        }

    };

    const handleClickDelete = (item) => {
        setIsDelete(true);
        setQuestionSelect(item);
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
        setAnswer('');
        setSelectedOption('');
        setClickCount(1);
        setListAnswer([]);
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
        const newBody = {
            content: body.content,
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
        console.log("New body", newBody);
        if (isEdit) {
            let { questionGroupId, ...newBodys } = newBody;
            newBodys.id = body.id;
            updateQuestionService(newBodys).then((res) => {
                toast.success('Edit question successfuly', { position: toast.POSITION.TOP_RIGHT });
                getAllQuestion();
            }).catch((error) => {
                toast.error('Edit question fail', { position: toast.POSITION.TOP_RIGHT });
            })
        }

        if (isAdd)
            addQuestionByQuestionGroupService(newBody).then((res) => {
                toast.success('Add question successfuly', { position: toast.POSITION.TOP_RIGHT });
                getAllQuestion();
            }).catch((error) => {
                toast.error('Add question fail', { position: toast.POSITION.TOP_RIGHT });
            })

        if (isDelete)
        deleteQuestionService(body.id).then((res) => {
            toast.success('Delete question successfuly', { position: toast.POSITION.TOP_RIGHT });
            getAllQuestion();
        }).catch((error) => {
            toast.error('Delete question fail', { position: toast.POSITION.TOP_RIGHT });
        })

        setActiveIndex(0);

    }

    const handleClickPage = (index) => {
        console.log("INDEX ", index);
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
        console.log("SEARCH");
        if (isModeActive)
            getAllActiveQuestionService(props.id, undefined, undefined, undefined, undefined, data).then((res) => {
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
                console.log("numberOfElements", res.numberOfElements);
                setIsLoading(false);
            }).catch((error) => {
                setIsLoading(false);
                toast.error(`Search question active fail !`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                console.log(error);
                removeCredential();
                navigate(Path.LOGIN);
            });
        else
            getAllInActiveQuestionService(props.id, undefined, undefined, undefined, undefined, data).then((res) => {
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
                console.log("numberOfElements", res.numberOfElements);
                setIsLoading(false);
            }).catch((error) => {
                setIsLoading(false);
                toast.error(`Search question inactive fail !`, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                console.log(error);
                removeCredential();
                navigate(Path.LOGIN);
            });
    }

    const handleClickEdit = (item) => {
        console.log("IIII", item);
        setIsEdit(true);
        setTimeout(() => {
            setQuestionSelect(item);
        });
        console.log(item);
    }

    const getAllInActiveQuestion = async (page, sortType, column, size, search) => {
        getAllInActiveQuestionService(props.id, page, sortType, column, size, search).then((res) => {
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
            console.log("numberOfElements", res.numberOfElements);
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            toast.error(`Get question inactive fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
            console.log(error);
            removeCredential();
            navigate(Path.LOGIN);
        });
    }
    const getAllActiveQuestion = async (page, sortType, column, size, search) => {
        getAllActiveQuestionService(props.id, page, sortType, column, size, search).then((res) => {
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
            console.log("numberOfElements", res.numberOfElements);
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            toast.error(`Get question active fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
            console.log(error);
            removeCredential();
            navigate(Path.LOGIN);
        });
    }

    const getAllQuestion = (page, sortType, column, size, search) => {
        if (isModeActive)
            getAllActiveQuestion(page, sortType, column, size, search);
        else
            getAllInActiveQuestion(page, sortType, column, size, search);
    }

    const isActive = (index) => {
        return index === activeIndex;
    };

    useEffect(() => {

        if (props.id)
            getAllQuestion();
        else
            navigate(Path.AMCLASSMANAGER);
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
                                <div className='flex gap-4  items-center justify-between'>
                                    <Button className="bg-blue-800" handleOnClick={() => { handleClickAdd() }}>Add question</Button>

                                </div>
                            </div>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="p-4">
                                            <div className="flex items-center">
                                                <input onChange={() => handleCheckboxChange(undefined, undefined, true)} id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            ID question
                                        </th>
                                        <th scope="col" className="px-6 py-3 min-w-[200px] m-w-[200px]" >
                                            Question
                                        </th>
                                        <th scope="col" className="px-6 py-3 min-w-[200px] m-w-[200px]">
                                            First answer
                                        </th>
                                        <th scope="col" className="px-6 py-3 min-w-[200px] m-w-[200px]">
                                            Second answer
                                        </th>
                                        <th scope="col" className="px-6 py-3 min-w-[200px] m-w-[200px]">
                                            Third answer
                                        </th>
                                        <th scope="col" className="px-6 py-3 min-w-[200px] m-w-[200px]">
                                            Fourth answer
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        isLoading ? 'Loading ...' :
                                            (listAllQuestion.length !== 0 ? (
                                                listAllQuestion.map(
                                                    (item, index) => {

                                                        return (
                                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                                <td className="w-4 p-4">
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
                                                                <th scope="row" className="w-[62px] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                                                    {item.id}
                                                                </th>
                                                                <td className="px-6 py-4 w-[300px] ">
                                                                    <p onClick={() => { }} className="cursor-pointer font-medium dark:text-blue-500 hover:underline max-w-[200px] line-clamp-1" title={item.content}>{item.content}</p>
                                                                </td>
                                                                <td className="px-6 py-4 w-[150px] " >
                                                                    <p className=" truncate font-medium  max-w-[200px] line-clamp-1" title={item.firstAnswer}>{item.firstAnswer}</p>
                                                                </td>
                                                                <td className="px-6 py-4 w-[150px] " >
                                                                    <p className=" truncate font-medium  max-w-[200px] line-clamp-1" title={item.secondAnswer}>{item.secondAnswer}</p>
                                                                </td>
                                                                <td className="px-6 py-4 w-[150px] " >
                                                                    <p className=" truncate font-medium  max-w-[200px] line-clamp-1" title={item.thirdAnswer}>{item.thirdAnswer}</p>
                                                                </td>

                                                                <td className="px-6 py-4 w-[150px] " >
                                                                    <p className=" truncate font-medium  max-w-[200px] line-clamp-1" title={item.fourthAnswer}>{item.fourthAnswer}</p>
                                                                </td>

                                                                <td className="px-6 py-4 w-[60px]">
                                                                    <Menu >
                                                                        <MenuHandler>
                                                                            <ButtonMenu className='bg-slate-400'>
                                                                                <FontAwesomeIcon icon={faBars} />
                                                                            </ButtonMenu>
                                                                        </MenuHandler>
                                                                        <MenuList className='rounded-md z-[102]'>
                                                                            <MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { handleClickEdit(item) }}>Edit</MenuItem>
                                                                            <MenuItem className='rounded-sm hover:bg-slate-200 flex justify-start p-2' onClick={() => { handleClickDelete(item) }} >Delete</MenuItem>

                                                                        </MenuList>
                                                                    </Menu>

                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                )) : (<>
                                                    <h1 className='text-sm'>Currently there is no question. Come back later.</h1>
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
                        <Modal className="top-0 left-0 right-0 z-[101] m-auto w-96" show={true} size="md" popup onClose={() => handleClose()} >
                            <Modal.Header />
                            <Modal.Body>
                                <form onSubmit={form.handleSubmit(submitForm)}
                                    className="relative mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                                >
                                    <p className="text-center text-lg font-medium">Edit question</p>
                                    <InputField name={CONTENT_QUESTION} label="Question" form={form} defaultValue={questionSelect.content} />
                                    <InputField name='id' disabled form={form} defaultValue={props.id} />
                                    <InputField name={ANSWER1} label="First Answer" form={form} defaultValue={questionSelect.firstAnswer}
                                        children={<><input
                                            className=' absolute mt-0 mb-0 mr-1 top-[25%] right-0  w-6 h-1/2'
                                            type="checkbox"
                                            name="options"
                                            value={questionSelect.firstAnswer}
                                            checked={selectedOption === questionSelect.firstAnswer}
                                            onChange={handleOptionChange}
                                        /></>} />
                                    <InputField name={ANSWER2} label="Second Answer" form={form} defaultValue={questionSelect.secondAnswer} 
                                    children={<><input
                                        className=' absolute mt-0 mb-0 mr-1 top-[25%] right-0  w-6 h-1/2'
                                        type="checkbox"
                                        name="options"
                                        value={questionSelect.secondAnswer}
                                        checked={selectedOption === questionSelect.secondAnswer}
                                        onChange={handleOptionChange}
                                    /></>}/>
                                    <InputField name={ANSWER3} label="Third Answer" form={form} defaultValue={questionSelect.thirdAnswer} 
                                    children={<><input
                                        className=' absolute mt-0 mb-0 mr-1 top-[25%] right-0  w-6 h-1/2'
                                        type="checkbox"
                                        name="options"
                                        value={questionSelect.thirdAnswer}
                                        checked={selectedOption === questionSelect.thirdAnswer}
                                        onChange={handleOptionChange}
                                    /></>}/>
                                    <InputField name={ANSWER4} label="Fourth Answer" form={form} defaultValue={questionSelect.fourthAnswer} 
                                    children={<><input
                                        className=' absolute mt-0 mb-0 mr-1 top-[25%] right-0  w-6 h-1/2'
                                        type="checkbox"
                                        name="options"
                                        value={questionSelect.fourthAnswer}
                                        checked={selectedOption === questionSelect.fourthAnswer}
                                        onChange={handleOptionChange}
                                    /></>}/>
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
                                    <p className="text-center text-lg font-medium">Add question</p>
                                    <InputField name={QUESTION_GROUP_ID} disabled form={form} defaultValue={props.id} />
                                    <InputField name={ANSWER1} disabled form={form} defaultValue={listAnswer[0] || ''} />
                                    <InputField name={ANSWER2} disabled form={form} defaultValue={listAnswer[1] || ''} />
                                    <InputField name={ANSWER3} disabled form={form} defaultValue={listAnswer[2] || ''} />
                                    <InputField name={ANSWER4} disabled form={form} defaultValue={listAnswer[3] || ''} />
                                    <InputField name={CONTENT_QUESTION} label="Question" form={form} defaultValue={''} />
                                    <div>
                                        <label className='block pb-1 text-sm font-medium text-gray-700'>
                                            Answer
                                        </label>
                                        <div className={clsx('relative flex justify-center ')}>

                                            <input value={answer} onChange={(event) => { handleInputAnswer(event) }} type="text" className={clsx('text-opacity-50 border-2 border-gray-500/75  rounded-lg p-4 pe-12 text-sm shadow-sm w-full h-full', clickCount <= 4 ? '' : 'pointer-events-none opacity-50')} placeholder='Enter answer'>

                                            </input>
                                            <button onClick={(event) => { handleAddAnswer(event) }} className={clsx('border-2 border-blue-200 rounded-lg bg-green-200 text-xs', clickCount <= 4 ? '' : 'pointer-events-none opacity-50')} >Add answer</button>
                                        </div>
                                    </div>
                                    <div ref={showAnswer} className='showAnswer flex flex-col' >
                                    </div>
                                    <Button onClick={() => handleClose()} className={clsx(clickCount <= 4 ? 'pointer-events-none opacity-50 bg-blue-800' : "bg-blue-800")} type='submit'>Submit</Button>
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


            </div >
        </ >

    )
}
