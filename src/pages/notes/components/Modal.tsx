import React, { useCallback, useState, useMemo } from "react";
import { TNote } from "../../../interfaces/types";
import Icons from "../../../components/icons/Icons";
import CommonModal from "../../../components/common/CommonModal";
import DropDown from "../../../components/common/DropDown";
import labelService from "../../../lib/firebase/services/label.service";
import { ILabel } from "../../../interfaces/interfaces";
import { uniqueKeyGenerator } from "../../../lib/helper";


type TModalProps = {
  note: TNote;
  noteHandler: (note: TNote) => void;
  closeModalHandler: () => void;
  userId : string | number;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Modal({ noteHandler , closeModalHandler , note , userId , setShowModal}: TModalProps) {
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notes, setNotes] = useState<TNote>(note);
  const [labels, setLabels] = useState<ILabel[]>([]);
  const [noteLabels, setNoteLabels] = useState<ILabel[]>([]);

  // const closeModalAndResetNotes = useCallback(() => {
  //   setNotes(note);
  //   setShowModal(false);
  //   setDropdownOpen(false);
  // },[]);
  
  // useEffect(() => {
  //   if (!showModal) {
  //     closeModalAndResetNotes();
  //   }
  // }, [showModal, closeModalAndResetNotes]);

  const noteSaveHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      noteHandler({...notes,labels:noteLabels});
      closeModalHandler();
    },
    [closeModalHandler, notes, noteHandler,noteLabels]
  );

  const fetchLabel = useCallback(()=>{
    labelService.get<ILabel>({key:'user_id',opt:'==', value: userId}).then((result) => {
        setLabels(result);
    });
    
  },[])   

  const setLabelHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const updatedLabel = labels.filter(label => label.id != e.target.id);
    setNoteLabels([...noteLabels,{id:e.target.id,name:e.target.getAttribute('data-name') ?? ""}]);
    setLabels(updatedLabel);
  }
  
  const deleteLabelHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
    const updatedNoteLabel = noteLabels.filter(label => label.id != e.currentTarget.id)
    setNoteLabels(updatedNoteLabel);
    setLabels([...labels,{id:e.currentTarget.id, name:e.currentTarget.getAttribute('data-name') ?? ''}])
  }
  

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
              <div className="px-6 pt-4 pb-2">
                {noteLabels.map((label) =>(
                <button id={`${label.id}`} data-name={label.name} className="group inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-gray-400" key={label.id} onClick={(e) => deleteLabelHandler(e)}>
                  <span>#{label.name} </span>
                  <span className="ml-1 hidden group-hover:inline">x</span>
                </button>
                ))}
                
              </div>
            <button type="button" className={`absolute mt-7 ms-4`} onClick={()=>{fetchLabel(),setDropdownOpen(!dropdownOpen)}}>
                <Icons name="LABEL" className = {`transition-transform duration-200`}/>
            </button>
            <button type="button" className={`absolute mt-7 ms-12`}>
                <Icons name="IMAGE" className = {`transition-transform duration-200`}/>
            </button>
            { dropdownOpen && <DropDown setShowDropdown={setDropdownOpen}>
              <ul className="p-3 m-5 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
                {labels.map((label)=>(
                <li key={uniqueKeyGenerator()}>
                  <div className="flex items-center">
                    <input id={`${label.id}`} data-name={label.name} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={e=>setLabelHandler(e)} />
                    <label htmlFor={`${label.id}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label.name}</label>
                  </div>
                </li>
                ))}
              </ul>
            </DropDown> }
            </div>
          </div>
        </CommonModal>
    </>
  );
}