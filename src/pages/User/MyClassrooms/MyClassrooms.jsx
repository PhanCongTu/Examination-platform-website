import React, { useEffect, useState } from 'react'
import {
      Card,
      CardHeader,
      CardBody,
      CardFooter,
      Typography,
      Button,
      Select,
      Option,
} from "@material-tailwind/react";
import { getMyClassroomsService } from '../../../services/UserService';
import Path from '../../../utils/Path';
import { NavLink, useNavigate } from 'react-router-dom';
import { removeCredential } from '../../../services/ApiService';
import { DESCREASE, INSCREASE } from '../../../utils/Constant';
import { Pagination } from '@mui/material';
import classroomAVT from '../../../assets/classroom_avatar.png';
const CLASS_NAME = 'className';
const CLASS_CODE = 'classCode';

function MyClassrooms() {
      const navigate = useNavigate();
      document.title = 'My classrooms';
      const [classrooms, setClassroom] = useState([])

      // Default value to get request
      const [page, setPage] = useState(0);
      const [sortType, setSortType] = useState(INSCREASE);
      const [column, setColumn] = useState(CLASS_NAME);
      const [size, setSize] = useState(12);
      const [search, setSearch] = useState('');
      //////////////////////////////
      const [totalPages, setTotalPages] = useState(0)
      const [totalElements, setTotalElements] = useState(0)
      /////////////////////////////

      const handleSortType = (asc) => {
            setSortType(asc)
      }
      const handleSortBy = (column) => {
            setColumn(column)
      }
      const handlePage = (event, value) => {
            setPage(value - 1)
      }
      const onSearchChange = (searchText) => {
            setSearch(searchText)
      }
      useEffect(() => {
            getClassrooms()
      }, [page, sortType, column])
      const handleSearch = () => {
            getMyClassroomsService(0, sortType, column, size, search)
                  .then((res) => {
                        setClassroom(res.content)
                        setPage(res.number)
                        setTotalPages(res.totalPages)
                        setTotalElements(res.totalElements)
                  })
                  .catch((error) => {
                        removeCredential();
                        navigate(Path.LOGIN);
                  })
      }
      const getClassrooms = () => {

            getMyClassroomsService(page, sortType, column, size, search)
                  .then((res) => {
                        setClassroom(res.content)
                        setPage(res.number)
                        setTotalPages(res.totalPages)
                        setTotalElements(res.totalElements)
                  })
                  .catch((error) => {
                        removeCredential();
                        navigate(Path.LOGIN);
                  })
      }

      return (

            <>
                  <div className='flex justify-center'>

                        <div className='w-[95%]  bg-gray-200 p-5 rounded-lg'>

                              <div className=" flex justify-end">

                                    <p className='flex items-center pr-5 '>Sort by:</p>
                                    <div className="flex items-center pr-5 w-48">

                                          <select onChange={(e) => handleSortBy(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value={CLASS_NAME}>Class name</option>
                                                <option value={CLASS_CODE}>Class code</option>
                                          </select>

                                    </div>
                                    <p className='flex items-center pr-5 '>Sort type:</p>
                                    <div className="flex items-center pr-5 w-48">

                                          <select onChange={(e) => handleSortType(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value={INSCREASE}>Increase</option>
                                                <option value={DESCREASE}>Decrease</option>
                                          </select>

                                    </div>
                                    <label htmlFor="default-search" className="w-auto mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div className="relative w-80">
                                          <input onChange={(e) => onSearchChange(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Class name or class code" required />
                                          <button onClick={() => handleSearch()} className="text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                Search</button>
                                    </div>
                              </div>
                              <div className=" flex justify-start pl-20">
                                    <p className='flex items-center pr-5 '>Found total {totalElements} results</p>
                              </div>
                              <div className='flex justify-start flex-wrap gap-7  px-20 md:px-10 sm:px-32'>
                                    {classrooms?.map((classroom, key) => {
                                          return <Card key={key} className="hover:border-black border-[2px] mt-6 w-72 p-5 rounded-sm ">
                                                <CardHeader color="blue-gray" className=" h-32">
                                                      <img
                                                            className="h-32 w-72"
                                                            src={classroomAVT}
                                                            alt="card-image"
                                                      />
                                                </CardHeader>
                                                <CardBody className='py-2'>
                                                      <Typography variant="h5" color="blue-gray" className="mb-2">
                                                            {classroom.className}
                                                      </Typography>
                                                      <Typography>
                                                            {classroom.classCode}
                                                      </Typography>
                                                </CardBody>
                                                <CardFooter className="pt-0 flex justify-end">

                                                      <NavLink className="bg-black px-5 py-2 rounded-md text-white" to={Path.CLASSROOM_DETAIL.replace(':classroomId', classroom.id)}>Detail</NavLink>

                                                </CardFooter>
                                          </Card>
                                    })}

                                    {classrooms?.length == 0 || classrooms === undefined ?
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
                                          : <></>}
                              </div>
                        </div>

                  </div>
                  <div className='flex justify-center p-5 pb-20'>
                        <Pagination count={totalPages} defaultPage={1} onChange={handlePage} boundaryCount={2} />
                  </div>
            </>

      )
}

export default MyClassrooms