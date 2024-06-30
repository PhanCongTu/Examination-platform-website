
import React from 'react'

export default function HomeTeacher() {
    return (
        <div className='h-full w-full grid grid-rows-3  bg-red-500'>
            <div className='grid-cols-3 grid gap-2 2-full '>
                <div className=' '>
                    <div className='flex-row flex bg-slate-300 h-20 border border-spacing-3 m-1 rounded-sm '>
                        <h1>Number of classes being taught: </h1>
                        &nbsp;
                        <p> Số lượng</p>
                    </div>
                </div>
                <div className=''>
                <div className='flex-row flex bg-pink-400 h-20 border border-spacing-3 m-1 rounded-sm '>
                        <h1>Number of questions created: </h1>
                        &nbsp;
                        <p> Số lượng</p>
                    </div>
                </div>
                <div className=''>
                <div className='flex-row flex bg-violet-400 h-20 border border-spacing-3 m-1 rounded-sm '>
                        <h1>Number of tests created: </h1>
                        &nbsp;
                        <p> Số lượng</p>
                    </div>
                </div>
            </div>
            <div>

            </div>
            <div></div>
        </div>
    )
}
