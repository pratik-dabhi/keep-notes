import React, { useCallback, useState, useEffect, useMemo } from "react";
import { TNote } from "../../../interfaces/types";
import Icons from "../../../components/icons/Icons";
import CommonModal from "../../../components/common/CommonModal";

export type TInitialNote = Omit<TNote, 'id'>;

type TModalProps = {
  noteHandler: (note: TInitialNote) => void;
};

const initialNotes: TInitialNote = {
  title: "",
  description: "",
  status: false,
  sort: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function Modal({ noteHandler }: TModalProps) {
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState<TInitialNote>(initialNotes);

  const closeModalAndResetNotes = useCallback(() => {
    setNotes(initialNotes);
    setShowModal(false);
  }, []);

  useEffect(() => {
    if (!showModal) {
      closeModalAndResetNotes();
    }
  }, [showModal, closeModalAndResetNotes]);

  const noteSaveHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      noteHandler(notes);
      closeModalAndResetNotes();
    },
    [closeModalAndResetNotes, notes, noteHandler]
  );

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
  ), [notes.title]);

  return (
    <>
      <button
        className="flex gap-2 bg-slate-800 text-white active:bg-slate-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <Icons name="PEN" />
        Note
      </button>

      {showModal && (
        <CommonModal
          header={header}
          setShowModal={setShowModal}
          onSave={noteSaveHandler}
        >
          <div className="relative flex-auto">
            <div className="mt-1">
              <textarea
                className="min-h-[150px] text-gray-700 focus:outline-none focus:shadow-outline  border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                placeholder="Take a note"
                value={notes.description}
                onChange={(e) => setNotes({ ...notes, description: e.target.value })}
              />
            </div>
          </div>
        </CommonModal>
      )}
    </>
  );
}