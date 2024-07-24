import React from 'react'
import Icons from '../icons/Icons'
import { ISearchProps } from '../../interfaces/interfaces'

const Search = ({placeholder}:ISearchProps) => {
  return (
    <div className="max-w-md mx-auto">
        <div className="relative flex items-center w-full h-10 border rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
                <Icons name="SEARCH" />
            </div>
            <input className="peer h-full w-full outline-none text-sm text-gray-700 pr-2" type="text" id="search" placeholder={placeholder} /> 
        </div>
    </div>
  )
}

export default Search