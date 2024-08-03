import Icons from "../../../components/icons/Icons";
import { ILabel } from "../../../interfaces/interfaces";

type TLabelListProps = {
    label : ILabel,
    updateLabelHandler : (e:React.ChangeEvent<HTMLInputElement>) => void
}

const LabelList = ({label,updateLabelHandler}:TLabelListProps) => {
  return (
    <>
      <li className="flex justify-center mx-4 my-2 gap-2" key={label.id}>
        <span className="group">
          <Icons name="ARROW" className="group-hover:hidden" />
          <Icons name="DELETE" className="text-lg text-red-500 hidden group-hover:inline"/>
        </span>
        <span className="hidden hover:block">
          <Icons name="ARROW" />
        </span>
        <input
          type="text"
          id={`${label.id}`}
          className="outline-none focus:border-b-2 border-dark-500"
          placeholder="Create Label"
          value={label.name}
          onChange={(e) => updateLabelHandler(e)}
        />
        <label htmlFor={`${label.id}`}>
          <Icons name="EDIT_PEN" />
        </label>
      </li>
    </>
  );
};

export default LabelList;
