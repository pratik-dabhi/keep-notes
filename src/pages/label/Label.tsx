import React, { useMemo } from "react";
import CommonModal from "../../components/common/CommonModal";
import LabelList from "./components/LabelList";
import CreateLabel from "./components/CreateLabel";
import { useLabelHandler } from "./useLabelHandler";

type TLabelProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Label = ({ showModal, setShowModal }: TLabelProps) => {
  const {
    labels,
    labelName,
    setLabelName,
    addLabelHandler,
    updateLabelHandler,
    deleteLabelHandler,
  } = useLabelHandler();

  const header = useMemo(
    () => (
      <div className="w-full px-5 py-4">
        <div className="mt-1 flex items-start justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold text-gray-900 leading-tight">
              Edit labels
            </h1>
          </div>
        </div>
      </div>
    ),
    [],
  );

  return (
    <>
      {showModal && (
        <CommonModal
          setShowModal={setShowModal}
          header={header}
          onClose={() => setShowModal(false)}
          width={"w-[320px] sm:w-[360px] md:w-[420px] lg:w-[480px] max-w-full"}
        >
          <div className="pb-3 pt-1 px-1">
            <ul className="text-sm font-medium text-gray-900 max-h-[300px] overflow-y-auto px-1 pb-1 space-y-1">
              <li className="sticky top-0 z-10 bg-white/95 backdrop-blur px-2 py-1 shadow-sm rounded-lg">
                <CreateLabel
                  labelName={labelName}
                  setLabelName={setLabelName}
                  addLabelHandler={addLabelHandler}
                />
              </li>

              {labels.length > 0 ? (
                labels.map((label) => (
                  <LabelList
                    type="MODEL"
                    key={label.id}
                    label={label}
                    updateLabelHandler={updateLabelHandler}
                    deleteLabelHandler={deleteLabelHandler}
                  />
                ))
              ) : (
                <li className="px-5 py-8 text-center text-gray-600 bg-white/70 rounded-lg">
                  <div className="inline-flex flex-col items-center gap-2">
                    <span className="text-2xl">🏷️</span>
                    <p className="text-sm font-semibold text-gray-800">
                      No labels yet
                    </p>
                    <p className="text-xs text-gray-500 max-w-[220px]">
                      Create your first label to keep notes organized.
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </CommonModal>
      )}
    </>
  );
};

export default Label;
