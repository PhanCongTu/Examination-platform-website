import React, { useEffect, useState } from 'react'
import Button from '../../../components/form-controls/Button/Button';
import InputField from '../../../components/form-controls/InputField/InputField';
import { Modal } from 'flowbite-react';
import Toggle from '../../../components/form-controls/Toggle/Toggle';
import PaginationNav from '../../../components/pagination/PaginationNav';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { addStudentToClassService, getAllActiveStudentService, getAllStudentOfClassService, getAllVerifiedStudentService, removeCredential } from '../../../services/ApiService';
import Path from '../../../utils/Path';
import clsx from 'clsx';

const ID_CLASSROOM = 'classroomId';
const ID_STUDENT = 'studentId';

export const Studentmanager = ({ showByIdClassRoom = true }) => {
  const { idClassRoom } = useParams();
  const [isAddConfirm, setIsAddConfirm] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [searchData, setSearchData] = useState('');
  const [listAllStudent, setlistAllStudent] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [offset, setOffset] = useState(0);
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [studentSelect, setStudentSelect] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const initialValue = {
    [ID_CLASSROOM]: '',
    [ID_STUDENT]: ''
  };

  const handleClose = () => {
    console.log("handleClose", isAdd);

    if (isAdd)
      setIsAdd(false);

    if (isAddConfirm)
      setIsAddConfirm(false);

  }

  const handleClickAdd = () => {
    setIsAdd(true);
  }

  const handleClickAddConfirm = (item) => {
    setIsAddConfirm(true);
    setStudentSelect(item);
  }

  const form = useForm({
    mode: 'onSubmit',
    defaultValues: initialValue,
    criteriaMode: "firstError",
  })

  const submitForm = (body) => {
    handleClose();

    console.log(body);
    if (isAddConfirm)
      addStudentToClass(body);


  }

  const addStudentToClass = (body) => {
    addStudentToClassService(body).then((res) => {
      toast.success('Add student to class successfuly', {
        position: toast.POSITION.TOP_RIGHT
      })
      getAllStudent();
    }).catch((error) => {
      toast.error('Add student to class fail', {
        position: toast.POSITION.TOP_RIGHT
      })
      removeCredential();
      navigate(Path.LOGIN);
    })
  }

  const handleClickPage = (index) => {
    console.log("INDEX ", index);
    setActiveIndex(index);
    getAllStudent(index);
  };

  const handlePrevious = (index) => {

    setActiveIndex(index - 1);
    getAllStudent(index - 1);
  }

  const handleNext = (index) => {

    setActiveIndex(index + 1);
    getAllStudent(index + 1);
  }

  const handleSearch = (data) => {
    console.log("SEARCH");
    if (showByIdClassRoom && idClassRoom)
      getAllStudentOfClassService(idClassRoom, undefined, undefined, undefined, undefined, data).then((res) => {
        setlistAllStudent(res.content);
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
        toast.error(`Search student fail !`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(error);
        removeCredential();
        navigate(Path.LOGIN);
      });
    else if (!showByIdClassRoom && idClassRoom) {
      getAllVerifiedStudentService(undefined, undefined, undefined, undefined, data).then((res) => {
        setlistAllStudent(res.content);
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
        toast.error(`Search verified student fail !`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(error);
        removeCredential();
        navigate(Path.LOGIN);
      });
    }
    else {
      getAllActiveStudentService(undefined, undefined, undefined, undefined, data).then((res) => {
        setlistAllStudent(res.content);
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
        toast.error(`Search student fail !`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(error);
        removeCredential();
        navigate(Path.LOGIN);
      });
    }
  }

  const getAllActiveStudent = async (page, sortType, column, size, search) => {
    getAllActiveStudentService(page, sortType, column, size, search).then((res) => {
      setlistAllStudent(res.content);
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
      toast.error(`Get student fail !`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error);
      removeCredential();
      navigate(Path.LOGIN);
    });

  }

  const getAllStudentOfClass = async (page, sortType, column, size, search) => {
    getAllStudentOfClassService(idClassRoom, page, sortType, column, size, search).then((res) => {
      setlistAllStudent(res.content);
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
      toast.error(`Get student fail !`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error);
      removeCredential();
      navigate(Path.LOGIN);
    });
  }

  const getAllVerifiedStudent = (page, sortType, column, size, search) => {
    getAllVerifiedStudentService(page, sortType, column, size, search).then((res) => {
      setlistAllStudent(res.content);
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
      toast.error(`Get verified student fail !`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error);
      removeCredential();
      navigate(Path.LOGIN);
    });
  }

  const getAllStudent = (page, sortType, column, size, search) => {
    console.log("idClassRoom ", idClassRoom);
    console.log("showByIdClassRoom ", showByIdClassRoom);
    if (showByIdClassRoom && idClassRoom)
      getAllStudentOfClass(page, sortType, column, size, search);
    else if (!showByIdClassRoom && idClassRoom)
      getAllVerifiedStudent(page, sortType, column, size, search);
    else
      getAllActiveStudent(page, sortType, column, size, search);

  }
  const isActive = (index) => {
    return index === activeIndex;
  };

  useEffect(() => {
    document.title = "Student Mananger Admin"
    getAllStudent();
  }, [showByIdClassRoom]);


  return (
    <>
      <div className=" p-4 h-full w-full flex-row flex">
        <div className="p-4 dark:border-gray-700">
          <div className="flex items-center justify-start h-auto mb-4 dark:bg-gray-800">
            <div className=" overflow-auto shadow-md sm:rounded-lg">
              <div className='items-center flex gap-4 justify-between mb-[14px]'>
                {/* <Toggle checked={isModeActive} handleToggle={setIsModeActivate} >{isModeActive ? 'Active' : 'Inactive'}</Toggle> */}
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pl-3 ">
                    <Button handleOnClick={() => { handleSearch(searchData) }} >
                      <svg className="w-5 h-5 text-white dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </Button>
                  </div>
                  <input onChange={(e) => { setSearchData(e.target.value) }} type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                </div>
                <div className='flex gap-4  items-center justify-between'>
                  {idClassRoom && showByIdClassRoom && (<Button className="bg-blue-800" handleOnClick={() => { handleClickAdd() }}>Add student to class</Button>)}

                </div>
              </div>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>

                    <th scope="col" className="px-6 py-3 w-[150px]">
                      ID student
                    </th>
                    <th scope="col" className={clsx("px-6 py-3 w-[300px]", showByIdClassRoom===false && idClassRoom && 'w-[600px]')} >
                      Student name
                    </th>
                    {showByIdClassRoom ? (
                      <>
                        <th scope="col" className="px-6 py-3 w-[200px]">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 w-[200px]">
                          Email Verified
                        </th>
                        <th scope="col" className="px-6 py-3 w-[70px]">
                          Active
                        </th>
                      </>) : (!idClassRoom && (<>
                        <th scope="col" className="px-6 py-3 w-[200px]">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 w-[200px]">
                          Email Verified
                        </th>
                        <th scope="col" className="px-6 py-3 w-[70px]">
                          Active
                        </th>
                      </>))
                    }
                    {showByIdClassRoom===false && idClassRoom && (<th scope="col" className="px-6 py-3 w-[150px]">
                      Action
                    </th>)}
                  </tr>
                </thead>
                <tbody>
                  {
                    isLoading ? 'Loading ...' :
                      (listAllStudent.length !== 0 && (
                        listAllStudent.map(
                          (item, index) => {

                            return (
                              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                <th scope="row" className="w-[150px] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                  {item.userID}
                                </th>
                                <td className={clsx("px-6 py-3 w-[300px]", showByIdClassRoom===false && idClassRoom && 'w-[600px]')}>
                                  <p className="cursor-pointer font-medium dark:text-blue-500 hover:underline max-w-[300px] line-clamp-1" title={item.displayName}>{item.displayName}</p>
                                </td>
                                {showByIdClassRoom ? (<><td className="px-6 py-4 w-[200px] " >
                                  <p className=" truncate font-medium  max-w-[200px] line-clamp-1" title={item.emailAddress}>{item.emailAddress}</p>
                                </td>
                                  <td className="px-6 py-4 w-[200px]">
                                    <div className="flex items-center">
                                      {
                                        item.isEmailAddressVerified === true ? (<><div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                          Verified</>
                                        ) : (<><div className="h-2.5 w-2.5 rounded-full  bg-green-500 mr-2"></div>Unverified</>)
                                      }
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 w-[70px]">
                                    <div className="flex items-center">
                                      {
                                        item.isEnable === true ? (<><div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                          Active</>
                                        ) : (<><div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Passive</>)
                                      }
                                    </div>
                                  </td></>) : (!idClassRoom && (<><td className="px-6 py-4 w-[200px] " >
                                    <p className=" truncate font-medium  max-w-[200px] line-clamp-1" title={item.emailAddress}>{item.emailAddress}</p>
                                  </td>
                                    <td className="px-6 py-4 w-[200px]">
                                      <div className="flex items-center">
                                        {
                                          item.isEmailAddressVerified === true ? (<><div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                            Verified</>
                                          ) : (<><div className="h-2.5 w-2.5 rounded-full  bg-green-500 mr-2"></div>Unverified</>)
                                        }
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 w-[70px]">
                                      <div className="flex items-center">
                                        {
                                          item.isEnable === true ? (<><div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                            Active</>
                                          ) : (<><div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Passive</>)
                                        }
                                      </div>
                                    </td></>))}
                                {showByIdClassRoom===false && idClassRoom && (
                                  <td className="px-6 py-4 flex w-[150px]">
                                    <p onClick={() => { handleClickAddConfirm(item) }} className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">Add</p>

                                  </td>)}
                              </tr>
                            )
                          }
                        )
                      )
                      )
                  }
                </tbody>
              </table>
              {
                isLoading ? (<>
                  <h1 className='text-sm pl-1'>Loading...</h1>
                </>) : (listAllStudent.length === 0 && (<>
                  <h1 className='text-sm pl-1'>Currently there is no student. Come back later.</h1>
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
        {isAdd && (
          <>
            <Modal className="bg-opacity-60 z-[101]" show={true} theme={{ 'content': { 'base': 'w-3/4 ' } }} popup onClose={() => handleClose()} >
              <Modal.Header >
                <div className='flex justify-center mr-[3px]'>
                  <div className='flex uppercase !text-center text-[23px] font-black'>Add student to class</div>
                </div>
                <hr className=" border mx-3 border-gray-300 !outline-none " />
              </Modal.Header>
              <Modal.Body className='flex justify-center w-full'>
                <div className='flex justify-center '>
                  <Studentmanager  showByIdClassRoom={false} />
                </div>
              </Modal.Body>
            </Modal></>)
        }
        {isAddConfirm && (
          <>
            <Modal className="bg-opacity-60  z-[101]" show={true} size="md" popup onClose={() => handleClose()} >
              <Modal.Header />
              <Modal.Body>
                <form onSubmit={form.handleSubmit(submitForm)}
                  className="relative mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                >
                  <InputField name={ID_CLASSROOM} disabled form={form} defaultValue={idClassRoom} />
                  <InputField name={ID_STUDENT} disabled form={form} defaultValue={studentSelect.userID} />
                  <p className="text-center text-[20px] font-medium text-lime-400 uppercase"> Alert </p>
                  <h1 className='text-[16px] text-center'>Are you sure you want to add this student to this class?</h1>
                  <div className='invisible py-3'></div>
                  <div className='flex gap-3'>
                    <Button className="bg-blue-500" type='submit'>Confirm</Button>
                    <Button onClick={() => handleClose()} className="bg-yellow-300">Cancel</Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal></>)
        }
      </div >
    </ >

  )
}
