import React, { useEffect, useState } from 'react'
import PaginationNav from '../../../components/pagination/PaginationNav';
import Button from '../../../components/form-controls/Button/Button';
import { toast } from 'react-toastify';
import { getAllStudentScoreByIDExamService, getFormattedDateTimeByMilisecond, removeCredential } from '../../../services/ApiService';
import Path from '../../../utils/Path';

import { useNavigate, useParams } from 'react-router-dom';

export const Scoremanager = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState('');
  const [listAllScore, setListAllScore] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [offset, setOffset] = useState(0);
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { idExam } = useParams();

  const handleClickPage = (index) => {
    console.log("INDEX ", index);
    setActiveIndex(index);
    getAllScore(index);
  };

  const handlePrevious = (index) => {
    setActiveIndex(index - 1);
    getAllScore(index - 1);
  }

  const handleNext = (index) => {
    setActiveIndex(index + 1);
    getAllScore(index + 1);
  }

  const handleSearch = (data) => {
    console.log("SEARCH");
    getAllStudentScoreByIDExamService(idExam, undefined, undefined, undefined, undefined, data).then((res) => {
      setListAllScore(res.content);
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
      toast.error(`Get score fail !`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error);
      removeCredential();
      navigate(Path.LOGIN);
    });

  }

  const getAllStudentSocreByIdExam = async (page, sortType, column, size, search) => {
    getAllStudentScoreByIDExamService(idExam, page, sortType, column, size, search).then((res) => {
      setListAllScore(res.content);
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
      toast.error(`Get score fail !`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error);
      removeCredential();
      navigate(Path.LOGIN);
    });
  }

  const getAllScore = (page, sortType, column, size, search) => {
    getAllStudentSocreByIdExam(page, sortType, column, size, search);
  }

  const isActive = (index) => {
    return index === activeIndex;
  };

  useEffect(() => {
    document.title = "Score Mananger Admin"
    if (!idExam) {
      navigate(Path.AMCLASSMANAGER);
    } else
      getAllScore();
  }, []);


  return (
    <>
      <div className=" p-4 h-full w-full flex-row flex">
        <div className="p-4 dark:border-gray-700">
          <div className="flex items-center justify-start h-auto mb-4 dark:bg-gray-800">

            <div className=" overflow-auto shadow-md sm:rounded-lg">
              <div className='items-center flex gap-4 justify-between mb-[14px]'>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pl-3 ">
                    <Button handleOnClick={() => { handleSearch(searchData) }} >
                      <svg className="w-5 h-5 text-white dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </Button>
                  </div>
                  <input onChange={(e) => { setSearchData(e.target.value) }} type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />

                </div>

              </div>


              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ID score
                    </th>
                    <th scope="col" className="px-6 py-3 min-w-[200px] m-w-[200px]" >
                      Student name
                    </th>
                    <th scope="col" className="px-6 py-3 min-w-[200px] m-w-[200px]">
                      Summit date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Lated
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    isLoading ? 'Loading ...' :
                      (listAllScore.length !== 0 ? (
                        listAllScore.map(
                          (item, index) => {

                            return (
                              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                <th scope="row" className="w-[62px] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                  {item.id}
                                </th>
                                <td className="px-6 py-4 w-[300px] ">
                                  <p onClick={() => { }} className="cursor-pointer font-medium dark:text-blue-500 hover:underline max-w-[200px] line-clamp-1" title={item.studentDisplayName}>{item.studentDisplayName}</p>
                                </td>
                                <td className="px-6 py-4 w-[300px] " >
                                  <p className=" truncate font-medium  max-w-[200px] line-clamp-1" title={getFormattedDateTimeByMilisecond(item.submittedDate)}>{getFormattedDateTimeByMilisecond(item.submittedDate)}</p>
                                </td>
                                <td className="px-6 py-4 w-[62px]">
                                  <div className="flex items-center">
                                    {
                                      item.isLate === false ? (<><div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                        Early</>
                                      ) : (<><div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2">Late</div> </>)
                                    }
                                  </div>
                                </td>

                              </tr>
                            )
                          }
                        )) : (<>
                          <h1 className='text-sm'>Currently there is no score. Come back later.</h1>
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
      </div>

    </ >
  )
}
