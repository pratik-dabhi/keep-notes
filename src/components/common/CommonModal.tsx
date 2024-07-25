import React from "react";

type TModalProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  header?: React.ReactNode;
  children?: React.ReactNode;
  onSave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function CommonModal({setShowModal,header,children,onSave}: TModalProps) {

  const closeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col md:w-[500px] lg:w-[700px] bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between border-b border-solid border-blueGray-200 rounded-t">
              {header}
              <button
                className="p-3 ml-auto bg-transparent border-0 text-black opacity-70 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="">×</span>
              </button>
            </div>

            <div className="relative flex-auto">{children}</div>

            <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-slate bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400 dark:border-slate-400"
                type="button"
                onClick={closeHandler}
              >
                Close
              </button>
              <button
                className="text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                type="button"
                onClick={onSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
