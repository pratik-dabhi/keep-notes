import {useCallback, useEffect, useState } from "react"
import Search from "../../components/common/Search"
import { TNote } from "../../interfaces/types"
import Cards from "./components/Cards"
import Modal, { TInitialNote } from "./components/Modal"
import { uniqueKeyGenerator } from "../../lib/helper"
import notesService from "../../lib/firebase/services/notes.service"

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
  setNotes([...notes,{...note,id:notes.length + 1}])
}

  return (
    <div className="flex flex-col w-full mx-auto px-4">
        <div className="flex justify-between mt-1">
          <Search placeholder="Notes" />
          <Modal noteHandler={addNotes} />
        </div>
        <div className="grid grid-rows-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {notes.map((note) =>(
            <Cards sort={note.sort} key={uniqueKeyGenerator()} title={note.title} description={note.description} status={note.status}/>
          ))}
        </div>
    </div>
  )
}

export default Notes