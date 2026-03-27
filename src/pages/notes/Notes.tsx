import { useCallback, useEffect, useState } from "react";
import { TNote } from "../../interfaces/types";
import NoteCard from "./components/NoteCard";
import CreateNote from "./components/CreateNote";
import CommonModal from "../../components/common/CommonModal";
import { uniqueKeyGenerator } from "../../lib/helper";
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
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const [notes, setNotes] = useState<TNote[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);
  const [initialNote, setInitialNote] = useState<TNote>(initialNotes);

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    if (!showModal) {
      closeModalHandler();
    }
  }, [showModal]);

  const loadNotes = useCallback(() => {
    notesService
      .get<TNote>({ key: "user_id", opt: "==", value: loggedUser?.id ?? "" })
      .then((result) => {
        setNotes(result);
      });
  }, [loggedUser]);

  const closeModalHandler = useCallback(() => {
    setInitialNote(initialNotes);
    setShowModal(false);
  }, [initialNotes]);

  const saveNoteHandler = (note: TNote) => {
    if (note.id) {
      notesService.update({ id: note.id as string, data: note }).then(() => {});
      const notesIndex = notes.findIndex((item) => item.id === note.id);
      if (notesIndex !== -1) {
        const updatedNotes = [...notes];
        updatedNotes[notesIndex] = { ...updatedNotes[notesIndex], ...note };
        setNotes(updatedNotes);
      }
    } else {
      notesService.create({ ...note }).then(() => {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 max-w-[1400px] mx-auto auto-rows-min">
          {notes.map((note) => (
            <NoteCard
              key={note.id || uniqueKeyGenerator()}
              id={note.id as string}
              title={note.title}
              description={note.description}
              labels={note.labels}
              status={note.status}
              color={note.color}
              onClickHandler={editCardHandler}
              onDeleteHandler={deleteNoteHandler}
            />
          ))}
        </div>
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
