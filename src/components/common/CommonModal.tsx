import React from "react";

type TModalProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  header?: React.ReactNode;
  children?: React.ReactNode;
  onSave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClose?: () => void;
  width?: string;
  hasBottomButton?: boolean;
  saveLabel?: string;
  closeLabel?: string;
  isSaveDanger?: boolean;
};

export default function CommonModal({
  setShowModal,
  header,
  children,
  onSave,
  onClose,
  width,
  hasBottomButton,
  saveLabel = "Save",
  closeLabel = "Close",
  isSaveDanger = false,
}: TModalProps) {
  const closeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onClose) {
      onClose();
    } else {
      setShowModal(false);
    }
  };

  const backdropClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      if (onClose) {
        onClose();
      } else {
        setShowModal(false);
      }
    }
  };

  return (
    <>
      <div
        className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/50`}
        onClick={backdropClickHandler}
      >
        <div
          className="relative w-auto my-6 mx-auto max-w-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`border-0 rounded-lg shadow-lg relative flex flex-col w-[90vw] md:w-[500px] lg:w-[700px] bg-white outline-none focus:outline-none ${width}`}
          >
            <div className="flex items-start justify-between border-b border-solid border-blueGray-200 rounded-t">
              {header}
              <button
                className="p-3 ml-auto bg-transparent border-0 text-black opacity-70 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={closeHandler}
              >
                <span className="">×</span>
              </button>
            </div>

            <div className="relative flex-auto">{children}</div>

            {hasBottomButton && (
              <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-slate bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 transition-colors"
                  type="button"
                  onClick={closeHandler}
                >
                  {closeLabel}
                </button>
                <button
                  className={`text-white focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 transition-colors ${
                    isSaveDanger
                      ? "bg-red-600 hover:bg-red-700 focus:ring-red-300"
                      : "bg-gray-700 hover:bg-gray-900 focus:ring-gray-300"
                  }`}
                  type="button"
                  onClick={onSave}
                >
                  {saveLabel}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
