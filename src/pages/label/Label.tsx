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
      <h1 className="text-gray-800 font-medium text-[16px] my-1 py-2 px-4 block appearance-none">
        Edit labels
      </h1>
    ),
    [],
  );

  return (
    <>
      {showModal && (
        <CommonModal
          setShowModal={setShowModal}
          header={header}
          width={"!w-[300px]"}
        >
          <div className="pb-2">
            <ul className="text-sm font-medium text-gray-900 bg-white">
              <li className="flex justify-center px-2 py-1 mx-2 mb-2 gap-2">
                <CreateLabel
                  labelName={labelName}
                  setLabelName={setLabelName}
                  addLabelHandler={addLabelHandler}
                />
              </li>
              <div className="max-h-[250px] overflow-y-auto">
                {labels.map((label) => (
                  <LabelList
                    type="MODEL"
                    key={label.id}
                    label={label}
                    updateLabelHandler={updateLabelHandler}
                    deleteLabelHandler={deleteLabelHandler}
                  />
                ))}
              </div>
            </ul>
          </div>
        </CommonModal>
      )}
    </>
  );
};

export default Label;
