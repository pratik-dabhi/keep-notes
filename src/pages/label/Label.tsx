import React, { useMemo, useState } from 'react'
import CommonModal from '../../components/common/CommonModal'
import Icons from '../../components/icons/Icons';
import { ILabel } from '../../interfaces/interfaces';
import { uniqueKeyGenerator } from '../../lib/helper';

type TLabelProps = {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Label = ({showModal,setShowModal}:TLabelProps) => {

const intialLabels:ILabel[] = [
    {
        id:1,
        name: 'Hobby',
    },
    {
        id:2,
        name: 'Password',
    },
    {
        id:3,
        name: 'Personal',
    }
]

const [labels, setLabels] = useState<ILabel[]>(intialLabels)

type TLabel = {
    name: string
}

const [label, setLabel] = useState<TLabel>({
name: '',
})

const addLableHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLabels([...labels,{...label,id:labels.length + 1}]);
    setLabel({name:''});
}

const header = useMemo(() => (
    <h1 className="text-gray-700 my-2 py-2 px-4 block appearance-none"> Add Label</h1>
  ), []);

return (
    <>
        {showModal && 
        <CommonModal setShowModal={setShowModal} header={header} width={'!w-[300px]'}>
            <div>
                <ul className="text-sm font-medium text-gray-900 bg-white">
                    <li className="flex justify-center pl-1 mx-4 my-4 gap-2">
                        <span>
                            <Icons name='PEN'/>
                        </span>
                        <input type='text' className="outline-none" placeholder='Create Label' value={label.name}  onChange={(e)=>setLabel({...label,name:e.target.value})}/>
                        <button onClick={addLableHandler} className='pl-1'>
                            <Icons name='TRUE'/>
                        </button>
                    </li>
                    {labels.map((label,index) =>(
                        <li className="flex justify-center mx-4 my-2 gap-2" key={uniqueKeyGenerator()}>
                            <span className='hover:hidden'>
                                <Icons name='ARROW'/>
                            </span>
                            <span className='hidden hover:block'>
                                <Icons name='ARROW'/>
                            </span>
                            <input type='text' id={`${index}`} className="outline-none focus:border-b-2 border-dark-500" placeholder='Create Label' value={label.name} onChange={(e)=>console.log(e.target.value)} />
                            <label htmlFor={`${index}`}>
                                <Icons name='EDIT_PEN'/>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </CommonModal>}
    </>
  )
}

export default Label