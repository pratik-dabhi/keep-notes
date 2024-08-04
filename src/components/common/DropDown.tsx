import React from "react";

type TDropDownProps = {
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
  onSave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Dropdown = ({children,setShowDropdown}:TDropDownProps) => {

  return (
      <div className={`absolute mt-8 start-8 w-1/5 transition-opacity duration-200 opacity-100 min-w-60 bg-white shadow-md rounded-lg p-1 space-y-0.5 mt-2`}>
        <div className="">
          <button className="p-3 ml-auto bg-transparent text-black opacity-70 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => setShowDropdown(false)}>
            <span className="text-white">×</span>
          </button>
        </div>
        <div className="py-2 first:pt-0 last:pb-0">
          {children}
        </div>
      </div>
  );
};

export default Dropdown;
