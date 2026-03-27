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
          className="flex items-center mx-2 my-1 px-2 py-1 group"
          key={label.id}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span
            className="p-1 flex shrink-0 items-center justify-center w-8 h-8 text-gray-500 rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
            title="Delete label"
            onClick={() => deleteLabelHandler && deleteLabelHandler(label.id)}
          >
            {isHovered || isFocused ? (
              <Icons name="DELETE" className="text-gray-600" />
            ) : (
              <Icons name="LABEL" className="" />
            )}
          </span>
          <input
            type="text"
            id={`${label.id}`}
            className={`flex-1 min-w-0 mx-2 bg-transparent outline-none py-1 transition-all ${isFocused ? "border-b border-gray-300" : "border-b border-transparent group-hover:border-gray-300"}`}
            placeholder="Enter label name"
            value={label.name}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => updateLabelHandler(e)}
          />
          <label
            htmlFor={`${label.id}`}
            className="p-1 flex shrink-0 items-center justify-center w-8 h-8 text-gray-500 rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
            title="Edit label"
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
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
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
