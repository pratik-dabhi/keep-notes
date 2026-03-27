import useSidebar from "../../../hooks/useSidebar";
import { TNote } from "../../../interfaces/types";
import Icons from "../../../components/icons/Icons";

type TNoteProps = Omit<TNote, "user_id" | "createdAt" | "updatedAt"> & {
  onClickHandler: (id: string) => void;
  onDeleteHandler: (id: string) => void;
};

const NoteCard = ({
  title,
  description,
  id,
  labels,
  onClickHandler,
  onDeleteHandler,
  color,
}: TNoteProps) => {
  const { isVisible } = useSidebar();

  return (
    <div
      className="group relative flex flex-col bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-default h-fit"
      style={{ backgroundColor: color || "white" }}
      id={`${id}`}
      onClick={(e) => !isVisible && onClickHandler(e.currentTarget.id)}
    >
      {title && (
        <div className="font-medium text-lg mb-2 text-gray-800 break-words">
          {title}
        </div>
      )}

      <div className="text-gray-600 text-sm whitespace-pre-wrap break-words mb-4">
        {description}
      </div>

      <div className="flex flex-wrap gap-1 mb-2">
        {labels.map((label) => (
          <span
            className="inline-block bg-gray-100/80 border border-gray-200 rounded px-2 py-0.5 text-[10px] font-medium text-gray-500"
            key={label.id}
          >
            {label.name}
          </span>
        ))}
      </div>

      {/* Hover Actions */}
      <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
          title="Delete"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteHandler(id as string);
          }}
        >
          <Icons name="DELETE" className="w-4 h-4" />
        </button>
        <button
          className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
          title="Edit"
          onClick={(e) => {
            e.stopPropagation();
            onClickHandler(id as string);
          }}
        >
          <Icons name="EDIT_PEN" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
