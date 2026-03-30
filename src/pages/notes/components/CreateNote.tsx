import React, { useCallback, useState, useEffect, useRef } from "react";
import { TNote } from "../../../interfaces/types";
import Icons from "../../../components/icons/Icons";
import CommonModal from "../../../components/common/CommonModal";
import DropDown from "../../../components/common/DropDown";
import labelService from "../../../lib/firebase/services/label.service";
import { ILabel } from "../../../interfaces/interfaces";
import LabelList from "../../label/components/LabelList";
import CreateLabel from "../../label/components/CreateLabel";
import { useLabelHandler } from "../../label/useLabelHandler";

type TModalProps = {
  note: TNote;
  noteHandler: (note: TNote) => void;
  closeModalHandler: () => void;
  userId: string | number;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  isInline?: boolean;
};

export default function CreateNote({
  noteHandler,
  closeModalHandler,
  note,
  userId,
  setShowModal,
  isInline = false,
}: TModalProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notes, setNotes] = useState<TNote>(note);
  const [isExpanded, setIsExpanded] = useState(!isInline);
  const [noteLabels, setNoteLabels] = useState<ILabel[]>([]);
  const { labels, labelName, setLabelName, addLabelHandler, setLabels } =
    useLabelHandler();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNotes(note);
    setNoteLabels(note.labels || []);
    fetchLabel();
  }, [note]);

  const noteSaveHandler = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.preventDefault();
      if (notes.title.trim() || notes.description.trim()) {
        noteHandler({ ...notes, labels: [...noteLabels] });
      }
      setIsExpanded(false);
      setNotes({ ...note, title: "", description: "", labels: [] });
      setNoteLabels([]);
      closeModalHandler();
    },
    [closeModalHandler, notes, noteHandler, noteLabels, note],
  );

  const closeOnlyHandler = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.preventDefault();
      setIsExpanded(false);
      setNotes({ ...note, title: "", description: "", labels: [] });
      setNoteLabels([]);
      closeModalHandler();
    },
    [closeModalHandler, note],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isInline &&
        isExpanded &&
        !dropdownOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        noteSaveHandler();
      }
    };

    if (isInline && isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isInline, isExpanded, dropdownOpen, noteSaveHandler]);

  const fetchLabel = useCallback(() => {
    labelService
      .get<ILabel>({ key: "user_id", opt: "==", value: userId })
      .then((result) => {
        const filteredLabels = result.map((item) => {
          if (
            note.labels?.some((alreadyExist) => alreadyExist.id === item.id)
          ) {
            return { ...item, isChecked: true };
          } else {
            return { ...item, isChecked: false };
          }
        });

        setLabels(filteredLabels);
      });
  }, [userId, note.labels, setLabels]);

  const setLabelHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetId = e.target.id;
    const targetName = e.target.getAttribute("data-name") ?? "";

    const noteLabelIndex = noteLabels.findIndex((item) => item.id === targetId);

    if (noteLabelIndex == -1) {
      setNoteLabels([...noteLabels, { id: targetId, name: targetName }]);
    } else {
      setNoteLabels(noteLabels.filter((label) => label.id != targetId));
    }

    const labelIndex = labels.findIndex((item) => item.id === targetId);

    if (labelIndex !== -1) {
      const updatedLabels = [...labels];
      updatedLabels[labelIndex] = {
        ...updatedLabels[labelIndex],
        isChecked: !updatedLabels[labelIndex].isChecked,
      };
      setLabels(updatedLabels);
    }
  };

  const renderContent = () => (
    <div
      ref={containerRef}
      className={`flex flex-col w-full ${isInline ? "bg-white rounded-lg shadow-md border border-gray-200" : ""}`}
    >
      {isExpanded ? (
        <>
          <div className="px-4 py-3">
            <input
              className="w-full text-lg font-medium text-gray-800 focus:outline-none placeholder-gray-500 bg-transparent"
              type="text"
              placeholder="Title"
              value={notes.title}
              autoFocus
              onChange={(e) => setNotes({ ...notes, title: e.target.value })}
            />
          </div>
          <div className="px-4 py-2">
            <textarea
              className="w-full min-h-[100px] text-gray-700 focus:outline-none placeholder-gray-500 bg-transparent resize-none"
              placeholder="Take a note..."
              value={notes.description}
              onChange={(e) =>
                setNotes({ ...notes, description: e.target.value })
              }
            />
          </div>

          <div className="px-4 py-2 flex flex-wrap gap-2">
            {noteLabels.map((label) => (
              <span
                key={label.id}
                className="inline-flex items-center bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full group cursor-pointer hover:bg-gray-200"
                onClick={() =>
                  setNoteLabels(noteLabels.filter((l) => l.id !== label.id))
                }
              >
                #{label.name}
                <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  ×
                </span>
              </span>
            ))}
          </div>

          <div className="px-2 py-2 flex items-center justify-between border-t border-transparent hover:border-gray-100 transition-colors">
            <div className="flex gap-1">
              <div className="relative">
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <Icons name="DOTS" className="w-5 h-5" />
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 bottom-full mb-2 z-50">
                    <DropDown setShowDropdown={setDropdownOpen}>
                      <ul className="p-2 min-w-[150px] bg-white shadow-xl rounded-lg border border-gray-100">
                        <li className="p-2">
                          <CreateLabel
                            labelName={labelName}
                            setLabelName={setLabelName}
                            addLabelHandler={addLabelHandler}
                          />
                        </li>
                        {labels.map((label) => (
                          <LabelList
                            type="DROPDOWN"
                            isChecked={label.isChecked}
                            key={label.id}
                            label={label}
                            updateLabelHandler={setLabelHandler}
                          />
                        ))}
                      </ul>
                    </DropDown>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded transition-colors"
                type="button"
                onClick={closeOnlyHandler}
              >
                Close
              </button>
              <button
                className="px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded transition-colors flex items-center gap-2"
                type="button"
                onClick={noteSaveHandler}
              >
                <Icons name="TRUE" className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        </>
      ) : (
        <div
          className="px-4 py-3 flex items-center justify-between cursor-text"
          onClick={() => setIsExpanded(true)}
        >
          <span className="text-gray-500 font-medium">Take a note...</span>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
              <Icons name="TRUE" />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (isInline) {
    return (
      <div className="w-full max-w-[600px] mx-auto my-8">{renderContent()}</div>
    );
  }

  return (
    <CommonModal
      setShowModal={setShowModal!}
      onSave={() => noteSaveHandler()}
      onClose={() => closeOnlyHandler()}
      hasBottomButton={false}
    >
      <div className="p-2">{renderContent()}</div>
    </CommonModal>
  );
}
