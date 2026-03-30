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
      <button
        type="button"
        className="p-1 text-gray-500 shrink-0 rounded-full hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-200 transition-colors flex items-center justify-center w-9 h-9 cursor-pointer"
        aria-label={isFocused ? "Clear label name" : "Add label"}
        title={isFocused ? "Clear" : "Add"}
        onClick={() => {
          if (isFocused) setLabelName("");
        }}
      >
        {isFocused ? (
          <Icons name="CLOSE" />
        ) : (
          <span className="text-xl font-light mb-1">+</span>
        )}
      </button>
      <input
        type="text"
        className={`flex-1 min-w-0 mx-3 bg-transparent transition-all py-2 rounded-lg placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${isFocused ? "border border-gray-200" : "border border-transparent group-hover:border-gray-200"}`}
        placeholder="Create new label"
        value={labelName}
        onChange={(e) => setLabelName(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
      />
      <button
        onClick={addLabelHandler}
        className={`p-1 flex shrink-0 items-center justify-center w-9 h-9 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-200 ${labelName ? "text-gray-700 hover:bg-gray-100 cursor-pointer" : "text-gray-300 cursor-default"}`}
        aria-label="Save label"
        disabled={!labelName}
      >
        <Icons name="TRUE" />
      </button>
    </div>
  );
};

export default CreateLabel;
