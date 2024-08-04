import React, { useMemo } from 'react'
import CommonModal from '../../components/common/CommonModal'
import LabelList from './components/LabelList';
import CreateLabel from './components/CreateLabel';
import { useLabelHandler } from './useLabelHandler';

type TLabelProps = {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Label = ({showModal,setShowModal}:TLabelProps) => {

    const {labels, labelName, setLabelName, addLableHandler,updateLabelHandler} = useLabelHandler();    

    const header = useMemo(() => (
        <h1 className="text-gray-700 my-2 py-2 px-4 block appearance-none"> Add Label</h1>
    ), []);

return (
    <>
        {showModal && 
        <CommonModal setShowModal={setShowModal} header={header} width={'!w-[325px]'}>
            <div>
                <ul className="text-sm font-medium text-gray-900 bg-white">
                    <li className="flex justify-center pl-1 mx-4 my-4 gap-2">
                        <CreateLabel labelName={labelName} setLabelName={setLabelName} addLableHandler={addLableHandler} />
                    </li>
                    {labels.map((label) => (
                        <LabelList type='MODEL' key={label.id} label={label} updateLabelHandler={updateLabelHandler} />
                    ))}
                </ul>
            </div>
        </CommonModal>}
    </>
  )
}

export default Label