import useSidebar from '../../../hooks/useSidebar';
import { TNote } from '../../../interfaces/types'

type TNoteProps = Omit<TNote, 'user_id' | 'createdAt' | 'updatedAt'> & {
  onClickHandler: (id:string) => void;
};

const NoteCard = ({title , description , id , labels , onClickHandler} : TNoteProps) => {

  const {isVisible} = useSidebar();

  return (
    <div className="md:max-w-md rounded overflow-hidden shadow-lg" id={`${id}`} onClick={(e)=>!isVisible && onClickHandler(e.currentTarget.id)}>
    {/* <img className="w-full" src="https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg?format=2500w" alt="Sunset in the mountains" /> */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {labels.map(label =>(
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" key={label.id}>#{label.name}</span>
        ))}
      </div>
  </div>
  )
}

export default NoteCard