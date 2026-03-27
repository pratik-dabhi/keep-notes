import { useState } from "react";
import Icons from "../icons/Icons";
import { ISearchProps } from "../../interfaces/interfaces";

const Search = ({ placeholder, onSearchHandler }: ISearchProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleClear = () => {
    setSearchValue("");
    onSearchHandler("");
  };

  return (
    <div className="w-full max-w-3xl px-4">
      <div className="relative flex items-center w-full h-12 bg-gray-100 rounded-lg border border-transparent focus-within:bg-white focus-within:shadow-md focus-within:border-gray-200 transition-all duration-200 group">
        <div className="flex items-center justify-center w-12 h-full text-gray-500">
          <Icons name="SEARCH" className="w-5 h-5" />
        </div>
        <input
          className="peer h-full w-full bg-transparent outline-none text-base text-gray-700 font-normal placeholder-gray-500"
          type="text"
          id="search"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            onSearchHandler(e.target.value);
          }}
        />
        {searchValue && (
          <button
            onClick={handleClear}
            className="flex items-center justify-center w-12 h-full text-gray-500 hover:bg-gray-200 rounded-full mr-1 transition-colors"
            title="Clear search"
          >
            <Icons name="CLOSE" className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
