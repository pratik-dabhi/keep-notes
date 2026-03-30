import React, { useState } from "react";
import Icons from "../../../components/icons/Icons";
import { ILabel } from "../../../interfaces/interfaces";

type TLabelListProps = {
  label: ILabel;
  updateLabelHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteLabelHandler?: (id: string | number) => void;
  type: "DROPDOWN" | "MODEL";
  isChecked?: boolean;
};

const LabelList = ({
  label,
  updateLabelHandler,
  deleteLabelHandler,
  type,
  isChecked,
}: TLabelListProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      {type === "MODEL" ? (
        <li
          className="flex items-center mx-2 my-1 px-3 py-2 rounded-xl border border-transparent hover:border-gray-200 hover:bg-gray-50 shadow-sm group transition"
          key={label.id}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            type="button"
            className="p-1 flex shrink-0 items-center justify-center w-9 h-9 text-gray-500 rounded-full hover:bg-red-50 hover:text-red-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-200 transition-colors"
            title="Delete label"
            aria-label={`Delete label ${label.name}`}
            onClick={() => deleteLabelHandler && deleteLabelHandler(label.id)}
          >
            {isHovered || isFocused ? (
              <Icons name="DELETE" className="text-current" />
            ) : (
              <Icons name="LABEL" className="" />
            )}
          </button>
          <input
            type="text"
            id={`${label.id}`}
            className={`flex-1 min-w-0 mx-3 bg-transparent py-2 rounded-lg transition-all placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${isFocused ? "border border-gray-200" : "border border-transparent group-hover:border-gray-200"}`}
            placeholder="Enter label name"
            value={label.name}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => updateLabelHandler(e)}
          />
          <label
            htmlFor={`${label.id}`}
            className="p-1 flex shrink-0 items-center justify-center w-9 h-9 text-gray-500 rounded-full hover:bg-gray-100 cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-300"
            title="Save label"
            aria-label={`Save label ${label.name}`}
          >
            {isFocused ? <Icons name="TRUE" /> : <Icons name="EDIT_PEN" />}
          </label>
        </li>
      ) : (
        <li>
          <div className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors">
            <input
              id={`${label.id}`}
              data-name={label.name}
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-200"
              onChange={(e) => updateLabelHandler(e)}
              checked={isChecked}
            />
            <label
              htmlFor={`${label.id}`}
              className="ms-3 text-sm font-medium text-gray-700 cursor-pointer flex-1"
            >
              {label.name}
            </label>
          </div>
        </li>
      )}
    </>
  );
};

export default LabelList;
