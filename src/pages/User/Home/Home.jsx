import React, { useEffect } from 'react'
import { Header } from '../../../components/form-controls/Nav/Header.jsx'
import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {
      add,
      eachDayOfInterval,
      endOfMonth,
      format,
      getDay,
      isEqual,
      isSameDay,
      isSameMonth,
      isToday,
      parse,
      startOfToday,
} from 'date-fns'
import { Fragment, useState } from 'react'
import { getRoles, getAccessToken, removeCredential } from '../../../services/ApiService.jsx'
import { ROLE_STUDENT } from '../../../utils/Constant.jsx'
import { getMy2WeeksAroundMCTestService } from '../../../services/UserService.jsx'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Path from '../../../utils/Path.jsx'

function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
}

function Home() {
      // navigater
      const navigate = useNavigate();

      let today = startOfToday()
      let [selectedDay, setSelectedDay] = useState(today)
      let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
      let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

      let [MCTest, setMCTest] = useState([])

      let days = eachDayOfInterval({
            start: firstDayCurrentMonth,
            end: endOfMonth(firstDayCurrentMonth),
      })

      function previousMonth() {
            let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
            setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
      }

      function nextMonth() {
            let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
            setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
      }

      let selectedDayTests = MCTest.filter((test) =>
            isSameDay(new Date(test.startDate), selectedDay)
      )
      let selectedDayEndedTests = MCTest.filter((test) =>
            isSameDay(new Date(test.endDate), selectedDay)
      )
      useEffect(() => {

            getMy2WeeksAroundMCTestService()
                  .then(response => {
                        setMCTest(response)
                  })
                  .catch((error) => {
                        removeCredential();
                        // navigate(Path.LOGIN);
                  })
      }, [])
      return (
            <>
                  <Header />
                  <div className="pt-36">
                        <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-7xl md:px-6">
                              <div className="md:grid md:grid-cols-3 md:divide-x md:divide-gray-200">
                                    <div className="md:pr-14">
                                          <div className="flex items-center">
                                                <h2 className="flex-auto font-semibold text-gray-900">
                                                      {format(firstDayCurrentMonth, 'MMMM yyyy')}
                                                </h2>
                                                <button
                                                      type="button"
                                                      onClick={previousMonth}
                                                      className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                                                >
                                                      <span className="sr-only">Previous month</span>
                                                      <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                                                </button>
                                                <button
                                                      onClick={nextMonth}
                                                      type="button"
                                                      className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                                                >
                                                      <span className="sr-only">Next month</span>
                                                      <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                                                </button>
                                          </div>
                                          <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                                                <div>Sun</div>
                                                <div>Mon</div>
                                                <div>Tue</div>
                                                <div>Wed</div>
                                                <div>Thu</div>
                                                <div>Fri</div>
                                                <div>Sat</div>
                                          </div>
                                          <div className="grid grid-cols-7 mt-2 text-sm">
                                                {days.map((day, dayIdx) => (
                                                      <div
                                                            key={day.toString()}
                                                            className={classNames(
                                                                  dayIdx === 0 && colStartClasses[getDay(day)],
                                                                  'py-1.5'
                                                            )}
                                                      >
                                                            <button
                                                                  type="button"
                                                                  onClick={() => setSelectedDay(day)}
                                                                  className={classNames(
                                                                        isEqual(day, selectedDay) && 'text-white',
                                                                        !isEqual(day, selectedDay) &&
                                                                        isToday(day) &&
                                                                        'text-red-500',
                                                                        !isEqual(day, selectedDay) &&
                                                                        !isToday(day) &&
                                                                        isSameMonth(day, firstDayCurrentMonth) &&
                                                                        'text-gray-900',
                                                                        !isEqual(day, selectedDay) &&
                                                                        !isToday(day) &&
                                                                        !isSameMonth(day, firstDayCurrentMonth) &&
                                                                        'text-gray-400',
                                                                        isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                                                                        isEqual(day, selectedDay) &&
                                                                        !isToday(day) &&
                                                                        'bg-gray-900',
                                                                        !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                                                        (isEqual(day, selectedDay) || isToday(day)) &&
                                                                        'font-semibold',
                                                                        'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                                                  )}
                                                            >
                                                                  <time dateTime={format(day, 'yyyy-MM-dd')}>
                                                                        {format(day, 'd')}
                                                                  </time>
                                                            </button>
                                                            <div className="w-1 h-1 mx-auto mt-1">
                                                                  {MCTest.some((test) =>
                                                                        isSameDay(new Date(test.startDate), day)
                                                                  ) && (
                                                                              <div className="w-1 h-1 rounded-full bg-black"></div>
                                                                        )}
                                                            </div>
                                                            <div className="w-1 h-1 mx-auto mt-1">
                                                                  {MCTest.some((test) =>
                                                                        isSameDay(new Date(test.endDate), day)
                                                                  ) && (
                                                                              <div className="w-1 h-1 rounded-full bg-red-500"></div>
                                                                        )}
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                                    <section className="mt-12 md:mt-0 md:pl-14">
                                          <h2 className="font-semibold text-black  px-3 rounded-lg">
                                                Schedule start exams for{' '}
                                                <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                                                      {format(selectedDay, 'MMM dd, yyy')}
                                                </time>
                                          </h2>
                                          <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                                                {selectedDayTests.length > 0 ? (
                                                      selectedDayTests.map((test) => (
                                                            <Testing Test={test} IsDeadline={false} key={test.id} />
                                                      ))
                                                ) : (
                                                      <p>There are exams for this date.</p>
                                                )}
                                          </ol>
                                    </section>
                                    <section className="mt-12 md:mt-0 md:pl-14">
                                          <h2 className="font-semibold text-red-600 px-3 rounded-lg">
                                                Schedule dutedate exams for{' '}
                                                <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                                                      {format(selectedDay, 'MMM dd, yyy')}
                                                </time>
                                          </h2>
                                          <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                                                {selectedDayEndedTests.length > 0 ? (
                                                      selectedDayEndedTests.map((test) => (
                                                            <Testing Test={test} IsDeadline={true} key={test.id} />
                                                      ))
                                                ) : (
                                                      <p>There are no exam deadlines for this date.</p>
                                                )}
                                          </ol>
                                    </section>
                              </div>

                        </div>

                  </div>
                  )
            </>

      )
}
function Testing({ Test, IsDeadline }) {
      let startDateTime = Test.startDate;
      let endDateTime = Test.endDate;

      return (
            <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
                  <div className="flex-auto">
                        <span className='flex'>
                              <p className="text-gray-900 pr-3">{Test.testName}</p>
                              <p>({Test.testingTime}m)</p>
                        </span>
                        <div className="mt-0.5 flex">
                              <time >
                                    {IsDeadline ? format(startDateTime, `h:mm a ${isSameDay(endDateTime, startDateTime) ? '' : '(dd/MM)'} `) : format(startDateTime, 'h:mm a')}
                              </time>{' '}
                              -{' '}
                              <time >
                                    {!IsDeadline ? format(endDateTime, `h:mm a ${isSameDay(endDateTime, startDateTime) ? '' : '(dd/MM)'} `) : format(endDateTime, 'h:mm a')}
                              </time>
                              {
                                    endDateTime < new Date() ? <p className='pl-3 font-bold text-red-600'>Ended</p> : <></>
                              }

                        </div>
                        <p>Classroom: {Test.className}</p>
                  </div>

                  <Menu
                        as="div"
                        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
                  >
                        <div>
                              <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                                    <span className="sr-only">Open options</span>
                                    <DotsVerticalIcon className="w-6 h-6" aria-hidden="true" />
                              </Menu.Button>
                        </div>

                        <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                        >
                              <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                          <Menu.Item>
                                                {({ active }) => (
                                                      <NavLink
                                                            to={Path.PREPARE_TEST.replace(':testId', Test.id)}
                                                            className={classNames(
                                                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                  'block px-4 py-2 text-sm'
                                                            )}
                                                      >
                                                            Go to this exam

                                                      </NavLink>
                                                )}
                                          </Menu.Item>
                                          <Menu.Item>
                                                {({ active }) => (
                                                      <NavLink
                                                            to={Path.CLASSROOM_DETAIL.replace(':classroomId', Test.classroomId)}
                                                            className={classNames(
                                                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                  'block px-4 py-2 text-sm'
                                                            )}
                                                      >
                                                            Go to classromm
                                                      </NavLink>
                                                )}
                                          </Menu.Item>
                                    </div>
                              </Menu.Items>
                        </Transition>
                  </Menu>
            </li>
      )
}

let colStartClasses = [
      '',
      'col-start-2',
      'col-start-3',
      'col-start-4',
      'col-start-5',
      'col-start-6',
      'col-start-7',
]
export default Home
