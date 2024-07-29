import {useCallback, useEffect, useState } from "react"
import Search from "../../components/common/Search"
import { TNote } from "../../interfaces/types"
import Cards from "./components/Cards"
import Modal, { TInitialNote } from "./components/Modal"
import { uniqueKeyGenerator } from "../../lib/helper"
import notesService from "../../lib/firebase/services/notes.service"
import useSidebar from "../../hooks/useSidebar"
import Icons from "../../components/icons/Icons"

const Notes = () => {

const [notes,setNotes] = useState<TNote[]>([]);

useEffect(()=>{
  loadNotes();
},[])

const loadNotes = useCallback(()=>{
  notesService.getAll<TNote>().then((result) => {
    setNotes(result);
  });
},[])

const addNotes = (note:TInitialNote) => {
  notesService.create({...note}).then((result) => {console.log("note added in firebase!" , result);});
  setNotes([...notes,{...note,id:notes.length + 1}])
}

const { isVisible, setVisible } = useSidebar();

  return (
    <div className="flex flex-col w-full mx-auto px-4"  >
        <div className="flex justify-between mt-1">
          <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className={`inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`} onClick={()=>setVisible(!isVisible)}>
              <Icons name="MENU" />
          </button>
          <Search placeholder="Notes" />
          <Modal noteHandler={addNotes} />
        </div>
        <div className="grid grid-rows-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" onClick={()=>isVisible && setVisible(!isVisible)}>
          {notes.map((note) =>(
            <Cards sort={note.sort} key={uniqueKeyGenerator()} title={note.title} description={note.description} status={note.status}/>
          ))}
        </div>
    </div>
  )
}

export default Notes