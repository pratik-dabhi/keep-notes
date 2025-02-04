import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Icons from "../../icons/Icons";
import Label from "../../../pages/label/Label";
import { useState } from "react";
import useSidebar from "../../../hooks/useSidebar";
import { toast } from "react-toastify";

const Sidebar = () => {
    
  const Auth = useAuth();
  const { isVisible} = useSidebar();
  
  const [showLabelModal,setShowLabelModal] = useState(false);

  return (
    <>
        <div className={`${isVisible ? 'fixed sm:relative top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0' : 'hidden md:block'} sm:flex flex-col w-64 bg-white h-full border-r`}>
            <div className="flex items-center justify-center h-14 border-b">
                <h1>{import.meta.env.VITE_APP_NAME}</h1>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
                <li className="px-5">
                <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
                </div>
                </li>
                <li>
                <NavLink to={'/notes'} className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-slate-500 pr-6'>
                    <span className="inline-flex justify-center items-center ml-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Notes</span>
                </NavLink>
                </li>
                <li className="px-5">
                <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-500">Labels</div>
                </div>
                </li>
                <li>
                <button type="button" onClick={() => {setShowLabelModal(true)}} className="w-full relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-slate-500 pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                        <Icons name="DOUBLE_ACCOUNT" />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Add Label</span>
                </button>
                </li>
                <li className="px-5">
                <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-500">Settings</div>
                </div>
                </li>
                <li>
                <NavLink to="/profile" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-slate-500 pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                        <Icons name="PROFILE" />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Profile</span>
                </NavLink>
                </li>
                <li>
                <button onClick={() => {Auth.Logout(),toast.success("Logout successfully!")}} className="w-full relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-slate-500 pr-6">
                    <span className="inline-flex justify-center items-center ml-4">
                        <Icons name="LOGOUT" />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
                </button>
                </li>
            </ul>
            </div>
        </div>
        <Label showModal={showLabelModal} setShowModal={setShowLabelModal}/>
    </>
  );
};

export default Sidebar;
