import React from 'react'
import Menu from '../../icons/Menu'

const Sidebar = () => {
  return (
    <>
    <div className="mx-6 flex w-16 flex-col items-center space-y-10 py-6">
        <div className="flex items-center justify-center rounded-md bg-white p-4 text-blue-600">
            <Menu/>
            <label htmlFor="">Text</label>
        </div>
        <div className="space-y-48 rounded-md bg-white">
            <ul>
                <li className="group p-5 flex g-3">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-[45px] w-[45px] cursor-pointer text-gray-500 transition-all hover:text-blue-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
                        </svg>
                    </span>
                    <label htmlFor="" className='hidden group-hover:block font-mono'>Text abc</label>
                </li>
            </ul>
        </div>
    </div>
    </>
  )
}

export default Sidebar