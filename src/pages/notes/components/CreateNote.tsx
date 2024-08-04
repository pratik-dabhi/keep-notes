import React, { useCallback, useState, useMemo, useEffect } from "react";
import { TNote } from "../../../interfaces/types";
import Icons from "../../../components/icons/Icons";
import CommonModal from "../../../components/common/CommonModal";
import DropDown from "../../../components/common/DropDown";
import labelService from "../../../lib/firebase/services/label.service";
import { ILabel } from "../../../interfaces/interfaces";
import { uniqueKeyGenerator } from "../../../lib/helper";
import LabelList from "../../label/components/LabelList";
import CreateLabel from "../../label/components/CreateLabel";
import { useLabelHandler } from "../../label/useLabelHandler";


type TModalProps = {
  note: TNote;
  noteHandler: (note: TNote) => void;
  closeModalHandler: () => void;
  userId : string | number;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateNote({ noteHandler , closeModalHandler , note , userId , setShowModal}: TModalProps) {
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notes, setNotes] = useState<TNote>(note);
  const [labels, setLabels] = useState<ILabel[]>([]);
  const [noteLabels, setNoteLabels] = useState<ILabel[]>([]);

  useEffect(() => {
    setNoteLabels(note.labels);
    fetchLabel();
  }, [note]);

  const noteSaveHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      noteHandler({...notes,labels:[...noteLabels]});
      closeModalHandler();
    },
    [closeModalHandler, notes, noteHandler,noteLabels]
  );

  const fetchLabel = useCallback(()=>{
    labelService.get<ILabel>({key:'user_id',opt:'==', value: userId}).then((result) => {
      const filteredLabels = result.map(item => {
        if (note.labels.some(alreadyExist => alreadyExist.id === item.id)) {
          return { ...item, isChecked : true };
        } else {
          return { ...item, isChecked: false };
        }
      });
      
      setLabels(filteredLabels);
    });
  },[])   

  const setLabelHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    
    const noteLabelIndex = noteLabels.findIndex(item => item.id === e.target.id);

    if(noteLabelIndex == -1){
      setNoteLabels([...noteLabels,{id:e.target.id,name:e.target.getAttribute('data-name') ?? ""}]);
    }else{
      const updatedNoteLabel = noteLabels.filter(label => label.id != e.target.id)
      setNoteLabels(updatedNoteLabel);
    }
    
    const labelIndex = labels.findIndex(item => item.id === e.target.id);

    if (labelIndex !== -1) {
      const updatedLabels = [...labels];
      updatedLabels[labelIndex] = { ...updatedLabels[labelIndex], isChecked: !updatedLabels[labelIndex].isChecked };
      setLabels(updatedLabels);
    }
    
  }
  
  const deleteLabelHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
    const updatedNoteLabel = noteLabels.filter(label => label.id != e.currentTarget.getAttribute('data-id'))
    setNoteLabels(updatedNoteLabel);

    const labelIndex = labels.findIndex(item => item.id === e.currentTarget.getAttribute('data-id'));

    if (labelIndex !== -1) {
      const updatedLabels = [...labels];
      updatedLabels[labelIndex] = { ...updatedLabels[labelIndex], isChecked: false };
      setLabels(updatedLabels);
    }

  }

  const {labelName,setLabelName,addLableHandler} = useLabelHandler();

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
                <button data-id={`${label.id}`} data-name={label.name} className="group inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-gray-400" key={label.id} onClick={(e) => deleteLabelHandler(e)}>
                  <span>#{label.name} </span>
                  <span className="ml-1 hidden group-hover:inline">x</span>
                </button>
                ))}
                
              </div>
            <button type="button" className={`absolute mt-7 ms-4`} onClick={()=>setDropdownOpen(!dropdownOpen)}>
                <Icons name="LABEL" className = {`transition-transform duration-200`}/>
            </button>
            <button type="button" className={`absolute mt-7 ms-12`}>
                <Icons name="IMAGE" className = {`transition-transform duration-200`}/>
            </button>
            { dropdownOpen && <DropDown setShowDropdown={setDropdownOpen}>
              <ul className="p-3 m-5 space-y-3 text-sm text-gray-700" aria-labelledby="dropdownCheckboxButton">
                <li className="flex justify-center pl-1 mx-4 my-4 gap-2">
                  <CreateLabel labelName={labelName} setLabelName={setLabelName} addLableHandler={addLableHandler} />
                </li>
              {labels.map((label) => (
                <LabelList type="DROPDOWN" isChecked={label.isChecked} key={label.id} label={label} updateLabelHandler={setLabelHandler} />
              ))}
              </ul>
            </DropDown> }
            </div>
          </div>
        </CommonModal>
    </>
  );
}