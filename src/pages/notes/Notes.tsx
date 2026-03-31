import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { TNote } from "../../interfaces/types";
import NoteCard from "./components/NoteCard";
import CreateNote from "./components/CreateNote";
import CommonModal from "../../components/common/CommonModal";
import notesService from "../../lib/firebase/services/notes.service";
import useSidebar from "../../hooks/useSidebar";
import useAuth from "../../hooks/useAuth";

const Notes = () => {
  const { loggedUser } = useAuth();

  const initialNotes: TNote = {
    title: "",
    description: "",
    status: false,
    user_id: loggedUser?.id ?? "",
    labels: [],
    orderIndex: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const [notes, setNotes] = useState<TNote[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);
  const [initialNote, setInitialNote] = useState<TNote>(initialNotes);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const loadNotes = useCallback(() => {
    notesService
      .get<TNote>({ key: "user_id", opt: "==", value: loggedUser?.id ?? "" })
      .then((result) => {
        const normalizedNotes = result
          .map((note, index) => ({
            ...note,
            orderIndex:
              typeof note.orderIndex === "number" ? note.orderIndex : index,
          }))
          .sort(
            (firstNote, secondNote) =>
              (firstNote.orderIndex ?? 0) - (secondNote.orderIndex ?? 0),
          );

        setNotes(normalizedNotes);
      });
  }, [loggedUser]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!showModal) {
      closeModalHandler();
    }
  }, [showModal]);

  const closeModalHandler = useCallback(() => {
    setInitialNote(initialNotes);
    setShowModal(false);
  }, [initialNotes]);

  const getNextOrderIndex = useCallback(() => {
    if (!notes.length) return 0;
    const maxOrder = Math.max(
      ...notes.map((item) =>
        typeof item.orderIndex === "number" ? item.orderIndex : 0,
      ),
    );
    return maxOrder + 1;
  }, [notes]);

  const saveNoteHandler = (note: TNote) => {
    const existingNote = note.id
      ? notes.find((item) => item.id === note.id)
      : undefined;

    const computedOrderIndex =
      typeof note.orderIndex === "number"
        ? note.orderIndex
        : (existingNote?.orderIndex ?? getNextOrderIndex());

    const noteWithOrder: TNote = { ...note, orderIndex: computedOrderIndex };

    if (noteWithOrder.id) {
      notesService
        .update({ id: noteWithOrder.id as string, data: noteWithOrder })
        .then(() => {});
      const notesIndex = notes.findIndex(
        (item) => item.id === noteWithOrder.id,
      );
      if (notesIndex !== -1) {
        const updatedNotes = [...notes];
        updatedNotes[notesIndex] = {
          ...updatedNotes[notesIndex],
          ...noteWithOrder,
        };
        setNotes(updatedNotes);
      }
    } else {
      notesService.create({ ...noteWithOrder }).then(() => {
        loadNotes();
      });
    }
    closeModalHandler();
  };

  const editCardHandler = (id: string) => {
    const editedNote = notes.find((note) => note.id == id);
    if (editedNote) {
      setInitialNote({ ...editedNote });
      setShowModal(true);
    }
  };

  const deleteNoteHandler = (id: string) => {
    setDeletingNoteId(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteHandler = () => {
    if (deletingNoteId) {
      notesService.delete(deletingNoteId).then(() => {
        setNotes(notes.filter((note) => note.id !== deletingNoteId));
        setShowDeleteModal(false);
        setDeletingNoteId(null);
      });
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) return;

    const previousOrder = new Map(
      notes.map((note) => [String(note.id), note.orderIndex]),
    );

    const reorderedNotes = Array.from(notes);
    const [movedNote] = reorderedNotes.splice(source.index, 1);
    reorderedNotes.splice(destination.index, 0, movedNote);

    const normalizedNotes = reorderedNotes.map((note, index) =>
      note.orderIndex === index ? note : { ...note, orderIndex: index },
    );

    setNotes(normalizedNotes);

    const changedNotes = normalizedNotes.filter(
      (note) => previousOrder.get(String(note.id)) !== note.orderIndex,
    );

    Promise.all(
      changedNotes.map((note) =>
        notesService.update({
          id: note.id as string,
          data: { orderIndex: note.orderIndex },
        }),
      ),
    ).catch((error) => console.error("Failed to persist order", error));
  };

  const onSearchHandler = (slug: string) => {
    setTimeout(() => {
      if (slug) {
        const searchedNotes = notes.filter(
          (note) =>
            note.title.toLowerCase().includes(slug.toLowerCase()) ||
            note.description.toLowerCase().includes(slug.toLowerCase()),
        );
        setNotes(searchedNotes);
      } else {
        loadNotes();
      }
    }, 500);
  };

  useEffect(() => {
    const handleSearch = (e: any) => {
      onSearchHandler(e.detail);
    };
    window.addEventListener("app-search", handleSearch);
    return () => window.removeEventListener("app-search", handleSearch);
  }, [notes, onSearchHandler]);

  const { isVisible, setVisible } = useSidebar();

  // Masonry row unit (smaller = finer height granularity).
  const gridRowHeight = 8; // px per implicit grid row

  return (
    <div className="flex flex-col w-full min-h-full bg-white">
      <div
        className="flex-1 overflow-y-auto pt-4"
        onClick={() => isVisible && setVisible(!isVisible)}
      >
        {/* Inline Create Note area */}
        <div className="flex justify-center px-4">
          <CreateNote
            isInline={true}
            note={initialNotes}
            noteHandler={saveNoteHandler}
            closeModalHandler={closeModalHandler}
            userId={loggedUser?.id ?? ""}
          />
        </div>

        {/* Notes Grid */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="notes"
            direction={isMobile ? "vertical" : "horizontal"}
          >
            {(provided) => (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 max-w-[1400px] mx-auto"
                style={{
                  gridAutoRows: `${gridRowHeight}px`,
                  gridAutoFlow: "row dense",
                }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {notes.map((note, index) => (
                  <MasonryDraggableCard
                    key={note.id as string}
                    note={note}
                    index={index}
                    gridRowHeight={gridRowHeight}
                    editCardHandler={editCardHandler}
                    deleteNoteHandler={deleteNoteHandler}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Modal for editing existing note */}
      {showModal && (
        <CreateNote
          note={initialNote}
          noteHandler={saveNoteHandler}
          closeModalHandler={closeModalHandler}
          setShowModal={setShowModal}
          userId={loggedUser?.id ?? ""}
        />
      )}

      {/* Deletion Confirmation Modal */}
      {showDeleteModal && (
        <CommonModal
          setShowModal={setShowDeleteModal}
          header={
            <h3 className="text-lg font-medium p-4 text-gray-800">
              Delete note?
            </h3>
          }
          onSave={confirmDeleteHandler}
          hasBottomButton={true}
          saveLabel="Remove"
          closeLabel="Cancel"
          isSaveDanger={true}
          width="md:w-[400px]"
        >
          <div className="p-4 text-gray-600">
            Are you sure you want to delete this note? This action cannot be
            undone.
          </div>
        </CommonModal>
      )}
    </div>
  );
};

export default Notes;

type MasonryCardProps = {
  note: TNote;
  index: number;
  gridRowHeight: number;
  editCardHandler: (id: string) => void;
  deleteNoteHandler: (id: string) => void;
};

const MasonryDraggableCard = ({
  note,
  index,
  gridRowHeight,
  editCardHandler,
  deleteNoteHandler,
}: MasonryCardProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [rowSpan, setRowSpan] = useState(1);
  const [gridGapPx, setGridGapPx] = useState(16); // Tailwind gap-4 default

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const updateSpan = () => {
      // Measure the natural content height, independent of the grid sizing.
      const height = el.scrollHeight;
      const parent = wrapperRef.current?.parentElement;
      const gap = parent
        ? parseFloat(getComputedStyle(parent).rowGap) || gridGapPx
        : gridGapPx;
      if (gap !== gridGapPx) {
        setGridGapPx(gap);
      }
      const span = Math.max(
        1,
        Math.ceil((height + gap) / (gridRowHeight + gap)),
      );
      setRowSpan(span);
    };

    updateSpan();
    const resizeObserver = new ResizeObserver(updateSpan);
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, [gridRowHeight, gridGapPx]);

  return (
    <Draggable draggableId={String(note.id)} index={index}>
      {(draggableProvided) => (
        <div
          ref={(node) => {
            draggableProvided.innerRef(node);
            wrapperRef.current = node;
          }}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          style={{
            ...draggableProvided.draggableProps.style,
            gridRowEnd: `span ${rowSpan}`,
          }}
          className="h-full"
        >
          <div ref={measureRef}>
            <NoteCard
              id={note.id as string}
              title={note.title}
              description={note.description}
              labels={note.labels}
              status={note.status}
              color={note.color}
              onClickHandler={editCardHandler}
              onDeleteHandler={deleteNoteHandler}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};
