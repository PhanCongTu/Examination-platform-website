import React, { useEffect, useState } from 'react'
import { addActiveClassService, getAllActiveClassService, updateActiveClassService } from '../../services/ApiService'
import { toast } from 'react-toastify';
import { Link, NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { useForm } from 'react-hook-form';
import InputField from '../../components/form-controls/InputField/InputField';
import Button from '../../components/form-controls/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ModalCustom } from '../../components/modal/Modal';

const CLASS_CODE = 'classCode';
const CLASS_NAME = 'className';
const IS_PRIVATE = 'isPrivate';
const ID_CLASS = 'id';

export const Classmanager = () => {
    const [isAdd,setIsAdd]=useState(false);
    const [searchData,setSearchData]=useState('');
    const [listAllClassActive, setlistAllClassActive] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFirst, setIsFirst] = useState(false);
    const [isLast, setIsLast] = useState(false);
    const [offset, setOffset] = useState(0);
    const [numberOfElements, setNumberOfElements] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [classSelect, setClassSelect] = useState({});
    const [isLoading,setIsLoading]=useState(true);
    const initialValue = {
        [CLASS_CODE]: '',
        [CLASS_NAME]: '',
        [IS_PRIVATE]: '',
        [ID_CLASS]: ''
    };

    const handleClose = () => {
        setIsEdit(false);
        setIsAdd(false);
    }

    const handleClickAdd=()=>{
        console.log("ADDD");
        setIsAdd(true);
    }
    const form = useForm({
        mode: 'onSubmit',
        defaultValues: initialValue,
        criteriaMode: "firstError",
    })

    const submitForm = (body) => {
        if(isEdit)
        updateActiveClassService(body).then((res) => {
            console.log("Response: " + res);
            toast.success(`Update class successfully!`, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }).catch((error) => {
            toast.error(`Update class fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
        })
        if(isAdd)
        addActiveClassService(body).then((res) => {
            console.log("Response: " + res);
            toast.success(`Add class successfully!`, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }).catch((error) => {
            toast.error(`Add class fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
        })
        handleClose();
    }

    const handleClickPage = (index) => {
        setActiveIndex(index);
        getAllActiveClass(index);
    };

    const handlePrevious = (index) => {
        setActiveIndex(index - 1);
        getAllActiveClass(index - 1);
    }

    const handleNext = (index) => {
        setActiveIndex(index + 1);
        getAllActiveClass(index + 1);
    }

    const handleSearch = (data) => {
        console.log("SEARCH");
        getAllActiveClassService(undefined, undefined, undefined, undefined, data).then((res) => {
            console.log(isActive(0));
            setlistAllClassActive(res.content);
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
            console.log(listAllClassActive);
            setOffset(res.pageable.offset);
            setNumberOfElements(res.numberOfElements);
            console.log("numberOfElements", res.numberOfElements);
        }).catch((error) => {
            toast.error(`Search fail !`, {
                position: toast.POSITION.TOP_RIGHT,
            });
        })
    }

    const handleClickEdit = (indexx) => {
        console.log("IIII", indexx);
        setIsEdit(true);
        setTimeout(() => {
            setClassSelect(listAllClassActive[indexx]);
        });
        console.log(listAllClassActive[indexx]);
    }

    const getAllActiveClass = (page, sortType, column, size, search) => {
        getAllActiveClassService(page, sortType, column, size, search).then((res) => {
            // toast.success(`Get class success !`, {
            //     position: toast.POSITION.TOP_RIGHT,
            // });
            
            console.log(isActive(0));
            setlistAllClassActive(res.content);
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
            console.log(listAllClassActive);
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

    const isActive = (index) => {
        return index === activeIndex;
    };

    useEffect(() => {

        getAllActiveClass();
    }, []);


    return (
        <div>
            <div className=" relative p-4 h-96 sm:ml-64 flex-row flex">
                <div className="p-4 dark:border-gray-700">
                    <div className="flex items-center justify-start h-auto mb-4 dark:bg-gray-800">
                        {/* <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                            </svg>
                        </p> */}


                        <div className=" overflow-auto shadow-md sm:rounded-lg">
                            <div className='items-center flex gap-4 justify-between mb-[14px]'>
                                <button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
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
                                </div>


                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 flex items-center pl-3 ">
                                        <Button handleOnClick={()=>{handleSearch(searchData)}} >
                                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                        </Button>
                                    </div>
                                    <input onChange={(e) => {setSearchData(e.target.value)}} type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />

                                </div>
                                <div className='flex gap-4  items-center justify-between'>
                                    <Button className="bg-blue-800" handleOnClick={()=>{handleClickAdd()}}>Add</Button>
                                    <Button className="bg-red-500">Delete</Button>
                                </div>
                            </div>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="p-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            ID class
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Class name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
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
                                        isLoading ? 'Loading ...':
                                        (listAllClassActive.length !== 0 ? (
                                            listAllClassActive.map(
                                                (item, index) => {

                                                    return (
                                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <td className="w-4 p-4">
                                                                <div className="flex items-center">
                                                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                                                </div>
                                                            </td>
                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                                                {item.id}
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                {item.className}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {item.classCode}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center">
                                                                    {
                                                                        item.isEnable === true ? (<><div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                                                            Active</>
                                                                        ) : (<><div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Passive</>)
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center">
                                                                    {
                                                                        item.isPrivate == true ? (<><div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                                                            Private</>
                                                                        ) : (<><div className="h-2.5 w-2.5 rounded-full  bg-green-500 mr-2"></div> Public</>)
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <p onClick={() => { handleClickEdit(index) }} className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</p>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            )) : (<>
                                                <h1 className='text-red-600'>Get list class fail !!! Please check connection again.</h1>
                                            </>)) 
                                    }
                                    {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Apple MacBook Pro 17"
                                        </th>
                                        <td className="px-6 py-4">
                                            Silver
                                        </td>
                                        <td className="px-6 py-4">
                                            Laptop
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                                Active
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Private
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        </td>
                                    </tr> */}

                                </tbody>
                            </table>
                            <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing
                                    <span className="font-semibold text-gray-900 dark:text-white">&nbsp; {offset + 1}-{offset + numberOfElements}</span>
                                    &nbsp; of &nbsp;
                                    <span className="font-semibold text-gray-900 dark:text-white">{totalElements}</span></span>
                                <ul className="inline-flex -space-x-px text-sm h-8">
                                    <li>
                                        <Link onClick={() => { handlePrevious(activeIndex) }} className={clsx("flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white", isFirst && "pointer-events-none opacity-50")}>Previous</Link>
                                    </li>
                                    {
                                        pageNumbers.length !== 0 &&
                                        pageNumbers.map((item, index) => {

                                            return (
                                                <>
                                                    <li>
                                                        <Link key={index} onClick={() => handleClickPage(index)} className={clsx("flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white", isActive(index) && '!bg-slate-600 text-white pointer-events-none ')}>{index + 1}</Link>
                                                    </li>
                                                </>
                                            )
                                        })


                                    }

                                    <li>
                                        <Link onClick={() => { handleNext(activeIndex) }} className={clsx("flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white", isLast && "pointer-events-none opacity-50 ")}>Next</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500">
                                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                </svg>
                            </p>
                        </div>
                    </div> */}
                </div>
                {/* <div className="  bg-slate-100 p-4 dark:border-gray-700 flex-1">
                    { */}
                {(<ModalCustom openModal={isEdit ? isEdit: isAdd} children={
                    <form onSubmit={form.handleSubmit(submitForm)}
                        className="relative mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                    >
                        <p className="text-center text-lg font-medium">{isEdit? 'Edit class':'Add class'}</p>
                        {/* <FontAwesomeIcon className="absolute top-1 right-1 h-8" onClick={() => { handleClose() }} icon={faXmark} /> */}
                        <InputField name={ID_CLASS} disabled form={form} defaultValue={classSelect.id} />
                        <InputField name={CLASS_CODE} label="Class code" form={form} defaultValue={classSelect.classCode} />
                        <InputField name={CLASS_NAME} label="Class name" form={form} defaultValue={classSelect.className} />
                        <InputField name={IS_PRIVATE} label="Private" form={form} defaultValue={classSelect.isPrivate} />
                        {/* {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>} */}
                        <Button className="bg-blue-800" type='submit'>Submit</Button>
                    </form>} onClose={handleClose}></ModalCustom>)}


                {/* </div> */}
            </div >
        </div >

    )
}
