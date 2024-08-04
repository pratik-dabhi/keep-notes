import Icons from "../../../components/icons/Icons";
import { ILabel } from "../../../interfaces/interfaces";

type TLabelListProps = {
    label : ILabel,
    updateLabelHandler : (e:React.ChangeEvent<HTMLInputElement>) => void,
    type : 'DROPDOWN' | 'MODEL'
    isChecked ?: boolean
}

const LabelList = ({label,updateLabelHandler,type,isChecked}:TLabelListProps) => {
  return (
    <>
        {type == "MODEL" ? (
        <li className="flex justify-center mx-4 my-2 gap-2" key={label.id}>
            <span className="group">
                <Icons name="ARROW" className="group-hover:hidden" />
                <Icons name="DELETE" className="text-lg text-red-500 hidden group-hover:inline"/>
            </span>
            <input
                type="text"
                id={`${label.id}`}
                className="outline-none focus:border-b-2 border-dark-500"
                placeholder="Create Label"
                value={label.name}
                onChange={(e) => updateLabelHandler(e)}/>
            <label htmlFor={`${label.id}`}>
                <Icons name="EDIT_PEN" />
            </label>
        </li>) :(
        <li>
            <div className="flex items-center">
                <input id={`${label.id}`} data-name={label.name} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={e=>updateLabelHandler(e)} checked={isChecked}/>
                <label htmlFor={`${label.id}`} className="ms-2 text-sm font-medium text-gray-900">{label.name}</label>
            </div>
        </li>)}
    </>
  );
};

export default LabelList;
