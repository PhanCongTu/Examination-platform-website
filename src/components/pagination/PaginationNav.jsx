import clsx from 'clsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PaginationNav = ({ pageNumbers, handlePrevious, handleNext, activeIndex, handleClickPage, offset, numberOfElements, totalElements, isFirst, isLast, isActive }) => {
  function getSubarray(arr, i) {
    const n = arr.length;
    let start_index, end_index;
    console.log("SSSSNN ", n)
    if (n <= 5) {
      start_index = 0;
      end_index = n - 1;
    } else {
      start_index = Math.max(i - 2, 0);
      end_index = Math.min(i + 2, n - 1);

      if (end_index - start_index + 1 < 5) {
        start_index = Math.max(end_index - 4, 0);
        end_index = Math.min(start_index + 4, n - 1);
      }
    }
    console.log("III ", i);
    console.log("START ", start_index);
    console.log("END ", end_index);
    const subarray = arr.slice(start_index, end_index + 1);
    console.log(subarray);
    return subarray;
  }
  return (<nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
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

        getSubarray(pageNumbers, activeIndex).map((item, index) => {


          return (
            <>
              <li>
                <Link key={index} onClick={() => handleClickPage(item - 1)} className={clsx("flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white", isActive(item - 1) && '!bg-slate-500 text-white pointer-events-none ')}>{item}</Link>
              </li>
            </>
          )
        })

      }

      <li>
        <Link onClick={() => { handleNext(activeIndex) }} className={clsx("flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white", isLast && "pointer-events-none opacity-50 ")}>Next</Link>
      </li>
    </ul>
  </nav>);
};

export default PaginationNav;