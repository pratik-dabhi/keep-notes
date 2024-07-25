import React, { useCallback, useState } from "react";
import { TNote } from "../../../interfaces/types";

export type TInitialNote = Omit<TNote, 'id'>;

type TModalProps = {
  noteHandler: (note:TInitialNote)=> void
}

const initialNotes: TInitialNote = {
  title: "",
  description: "",
  status: false,
  sort: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function Modal({noteHandler}:TModalProps) {

  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState<TInitialNote>(initialNotes);

  const closeModalAndResetNotes = useCallback(() => {
    setShowModal(false);
    setNotes(initialNotes);
  }, []);

  const noteCloseHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      closeModalAndResetNotes();
    },
    [closeModalAndResetNotes]
  );

  const noteSaveHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      closeModalAndResetNotes();
      noteHandler(notes);
    },
    [closeModalAndResetNotes, notes]
  );

  return (
    <>
      <button className="bg-slate-800 text-white active:bg-slate-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"onClick={() => setShowModal(true)}>
        Note
      </button>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col md:w-[500px] lg:w-[700px] bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between border-b border-solid border-blueGray-200 rounded-t">
                <div className="mt-4">
                  <input
                    className="text-gray-700 focus:outline-none focus:shadow-outline md:w-[450px] lg:w-[650px] py-2 px-4 block appearance-none"
                    type="text"
                    placeholder="Title"
                    value={notes.title}
                    onChange={(e) => setNotes({...notes,title:e.target.value})}
                  />
                </div>
                  <button className="p-3 ml-auto bg-transparent border-0 text-black opacity-70 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => setShowModal(false)}>
                    <span className="">
                      ×
                    </span>
                  </button>
                </div>
                
                <div className="relative flex-auto">
                  <div className="mt-1">
                    <textarea
                      className="min-h-[150px] text-gray-700 focus:outline-none focus:shadow-outline  border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                      placeholder="Take a note"
                      value={notes.description}
                      onChange={(e) => setNotes({...notes,description:e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                  <button className="text-slate bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-slate-300 dark:hover:bg-slate-400 dark:focus:ring-slate-400 dark:border-slate-400" type="button" onClick={(e) => noteCloseHandler(e)}>
                    Close
                  </button>
                  <button className="text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" type="button" onClick={(e) => noteSaveHandler(e)} >
                    Save
                  </button>
                </div>

              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}