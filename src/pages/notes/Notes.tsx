import {useCallback, useEffect, useState } from "react"
import Search from "../../components/common/Search"
import { TNote } from "../../interfaces/types"
import NoteCard from "./components/NoteCard"
import CreateNote from "./components/CreateNote"
import { uniqueKeyGenerator } from "../../lib/helper"
import notesService from "../../lib/firebase/services/notes.service"
import useSidebar from "../../hooks/useSidebar"
import Icons from "../../components/icons/Icons"
import useAuth from "../../hooks/useAuth"

const Notes = () => {

const {loggedUser} = useAuth();

const initialNotes: TNote = {
    title: "",
    description: "",
    status: false,
    user_id: loggedUser?.id ?? "",
    labels: [],
    createdAt: new Date(),
    updatedAt: new Date(),
};

const [notes,setNotes] = useState<TNote[]>([]);

const [showModal, setShowModal] = useState(false);
const [initialNote, setInitialNote] = useState<TNote>(initialNotes);

useEffect(()=>{
  loadNotes();
},[])

useEffect(() => {
  if (!showModal) {
    closeModalHandler();
  }
}, [showModal])

const loadNotes = useCallback(()=>{
  notesService.get<TNote>({key:'user_id',opt:'==', value: loggedUser?.id ?? ""}).then((result) => {
    setNotes(result);
  });
},[loggedUser])

const closeModalHandler = useCallback(() => {
  setInitialNote(initialNote);
  setShowModal(false);
},[]);

const saveNoteHandler = (note:TNote) => {
  if(note.id){
    notesService.update({id:note.id , data : note}).then((result) => {console.log("note updated in firebase!" , result);});
    const notesIndex = notes.findIndex(item => item.id === note.id);
    if (notesIndex !== -1) {
      const updatedNotes = [...notes];
      updatedNotes[notesIndex] = { ...updatedNotes[notesIndex], ...note};
      setNotes(updatedNotes);
    }
  }else{
    notesService.create({...note}).then((result) => {console.log("note added in firebase!" , result);});
    setNotes([...notes,{...note,id:notes.length + 1}])
  }
  closeModalHandler()
}

const editCardHandler = (id : string) => {
  const editedNote = notes.find(note => note.id == id)
  setInitialNote({...initialNote,id:editedNote?.id, title:editedNote?.title ?? "" , description: editedNote?.description ?? "" , labels:editedNote?.labels ?? []})
  setShowModal(true);
}

const onSearchHandler = (slug:string) => {
  setTimeout(() => {
    if (slug) {
      const searchedNotes = notes.filter(note => note.title.includes(slug) || note.description.includes(slug));
      setNotes(searchedNotes);
    } else {
      loadNotes();
    }
  }, 1000);
}

const { isVisible, setVisible } = useSidebar();

  return (
    <div className="flex flex-col w-full mx-auto px-4"  >
        <div className="flex justify-between mt-1">
          <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className={`inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`} onClick={()=>setVisible(!isVisible)}>
              <Icons name="MENU" />
          </button>
          <Search placeholder="Notes" onSearchHandler={onSearchHandler}  />

          <button className="flex gap-2 bg-slate-800 text-white active:bg-slate-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(true)}>
            <Icons name="PEN" />
            Note
          </button>

          { showModal && <CreateNote noteHandler={saveNoteHandler} closeModalHandler={closeModalHandler} setShowModal={setShowModal} note={initialNote} userId = {loggedUser?.id ?? ""} />}
        </div>
        <div className="grid grid-rows-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" onClick={()=>isVisible && setVisible(!isVisible)}>
          {notes.map((note) =>(
            <NoteCard key={uniqueKeyGenerator()} id={note.id} title={note.title} description={note.description} labels={note.labels} status={note.status} onClickHandler={editCardHandler}/>
          ))}
        </div>
    </div>
  )
}

export default Notes