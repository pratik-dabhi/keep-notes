import React, { useCallback, useState, useEffect, useMemo } from "react";
import { TNote } from "../../../interfaces/types";
import Icons from "../../../components/icons/Icons";
import CommonModal from "../../../components/common/CommonModal";
import DropDown from "../../../components/common/DropDown";
import labelService from "../../../lib/firebase/services/label.service";
import { ILabel } from "../../../interfaces/interfaces";
import { uniqueKeyGenerator } from "../../../lib/helper";

export type TInitialNote = Omit<TNote, 'id'>;

type TModalProps = {
  noteHandler: (note: TInitialNote) => void;
  userId : string | number;
};

export default function Modal({ noteHandler , userId}: TModalProps) {

  const initialNotes: TInitialNote = {
    title: "",
    description: "",
    status: false,
    user_id: userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notes, setNotes] = useState<TInitialNote>(initialNotes);
  const [labels, setLabels] = useState<ILabel[]>([]);

  const closeModalAndResetNotes = useCallback(() => {
    setNotes(initialNotes);
    setShowModal(false);
    setDropdownOpen(false);
  },[]);

  useEffect(() => {
    if (!showModal) {
      closeModalAndResetNotes();
    }
  }, [showModal, closeModalAndResetNotes]);

  const noteSaveHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      noteHandler(notes);
      closeModalAndResetNotes();
    },
    [closeModalAndResetNotes, notes, noteHandler]
  );

  const fetchLabel = useCallback(()=>{
    labelService.get<ILabel>({key:'user_id',opt:'==', value: userId}).then((result) => {
        setLabels(result);
    });
},[])   

  const header = useMemo(() => (
    <div className="mt-4">
      <input
        className="text-gray-700 focus:outline-none focus:shadow-outline md:w-[450px] lg:w-[650px] py-2 px-4 block appearance-none"
        type="text"
        placeholder="Title"
        value={notes.title}
        onChange={(e) => setNotes({ ...notes, title: e.target.value })}
      />
    </div>
  ), [notes]);

  return (
    <>
      <button
        className="flex gap-2 bg-slate-800 text-white active:bg-slate-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <Icons name="PEN" />
        Note
      </button>

      {showModal && (
        <CommonModal
          header={header}
          setShowModal={setShowModal}
          onSave={noteSaveHandler}
          hasBottomButton={true}
        >
          <div className="relative flex-auto">
            <div className="mt-1">
              <textarea
                className="min-h-[150px] text-gray-700 focus:outline-none focus:shadow-outline  border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                placeholder="Take a note"
                value={notes.description}
                onChange={(e) => setNotes({ ...notes, description: e.target.value })}
              />
            <button type="button" className={`absolute mt-7 ms-2`} onClick={()=>{fetchLabel(),setDropdownOpen(!dropdownOpen)}}>
                <Icons name="DOTS" className = {`transition-transform duration-200`}/>
            </button>
            { dropdownOpen && <DropDown setShowDropdown={setDropdownOpen}>
              <ul className="p-3 m-5 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
                {labels.map((label)=>(
                <li key={uniqueKeyGenerator()}>
                  <div className="flex items-center">
                    <input id={`${label.id}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label htmlFor={`${label.id}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label.name}</label>
                  </div>
                </li>
                ))}
              </ul>
            </DropDown> }
            </div>
          </div>
        </CommonModal>
      )}
    </>
  );
}