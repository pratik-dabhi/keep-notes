import { useState } from "react"
import Search from "../../components/common/Search"
import { TNote } from "../../interfaces/types"
import Cards from "./components/Cards"
import Modal, { TInitialNote } from "./components/Modal"
import { uniqueKeyGenerator } from "../../lib/helper"

const Notes = () => {
  const initialNotes : TNote[] = [{
    id: 1,
    title: "delectus aut autem",
    description: "delectus aut autem",
    status: false,
    sort:1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    title: "quis ut nam facilis et officia qui",
    description : "Lorem ipsum dolor sit amet, consectetur",
    status: false,
    sort: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    title: "fugiat veniam minus",
    description : "Lorem ipsum dolor sit amet, consectetur",
    status: false,
    sort: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    title: "et porro tempora",
    description : "Lorem ipsum dolor sit amet, consectetur",
    status: true,
    sort: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    description : "Lorem ipsum dolor sit amet, consectetur",
    status: false,
    sort: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6,
    title: "qui ullam ratione quibusdam voluptatem quia omnis",
    description : "Lorem ipsum dolor sit amet, consectetur",
    status: false,
    sort: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 7,
    title: "illo expedita consequatur quia in",
    description : "Lorem ipsum dolor sit amet, consectetur",
    status: false,
    sort: 7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 8,
    title: "quo adipisci enim quam ut ab",
    description : "Lorem ipsum dolor sit amet, consectetur",
    status: true,
    sort: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 9,
    title: "molestiae perspiciatis ipsa",
    description : "Lorem ipsum dolor sit amet, consectetur",
    status: false,
    sort: 9,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 10,
    title: "illo est ratione doloremque quia maiores aut",
    description : "Lorem ipsum dolor sit amet, consectetur",
    status: true,
    sort: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  },
]

const [notes,setNotes] = useState<TNote[]>(initialNotes);

const addNotes = (note:TInitialNote) => {
  setNotes([...notes,{...note,id:notes.length + 1}])
}

  return (
    <div className="flex flex-col w-full mx-auto px-4">
        <div className="flex justify-between mt-1">
          <Search placeholder="Notes" />
          <Modal noteHandler={addNotes} />
        </div>
        <div className="flex gap-1 flex-wrap justify-center">
          {notes.map((note) =>(
            <Cards sort={note.sort} key={uniqueKeyGenerator()} title={note.title} description={note.description} status={note.status}/>
          ))}
        </div>
    </div>
  )
}

export default Notes