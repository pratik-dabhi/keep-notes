import React, { useState } from "react";
import Icons from "../../../components/icons/Icons";

type TCreateLabelProps = {
  labelName: string;
  setLabelName: React.Dispatch<React.SetStateAction<string>>;
  addLabelHandler: () => void;
};

const CreateLabel = ({
  labelName,
  setLabelName,
  addLabelHandler,
}: TCreateLabelProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex items-center w-full px-2 py-1 group">
      <span
        className="p-1 text-gray-500 shrink-0 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center w-8 h-8 cursor-pointer"
        onClick={() => {
          if (isFocused) setLabelName("");
        }}
      >
        {isFocused ? (
          <Icons name="CLOSE" />
        ) : (
          <span className="text-xl font-light mb-1">+</span>
        )}
      </span>
      <input
        type="text"
        className={`flex-1 min-w-0 mx-2 bg-transparent outline-none transition-all py-1 ${isFocused ? "border-b border-gray-300" : "border-b border-transparent group-hover:border-gray-300"}`}
        placeholder="Create new label"
        value={labelName}
        onChange={(e) => setLabelName(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
      />
      <button
        onClick={addLabelHandler}
        className={`p-1 flex shrink-0 items-center justify-center w-8 h-8 rounded-full transition-colors ${labelName ? "text-gray-700 hover:bg-gray-100 cursor-pointer" : "text-gray-300 cursor-default"}`}
        disabled={!labelName}
      >
        <Icons name="TRUE" />
      </button>
    </div>
  );
};

export default CreateLabel;
