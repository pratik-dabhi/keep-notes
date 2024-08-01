import React, { useCallback, useEffect, useMemo, useState } from 'react'
import CommonModal from '../../components/common/CommonModal'
import Icons from '../../components/icons/Icons';
import { ILabel } from '../../interfaces/interfaces';
import labelService from '../../lib/firebase/services/label.service';
import useAuth from '../../hooks/useAuth';

type TLabelProps = {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Label = ({showModal,setShowModal}:TLabelProps) => {

const [labels, setLabels] = useState<ILabel[]>([])
const [labelName, setLabelName] = useState('')
const {loggedUser} = useAuth();

useEffect(() => loadLabel(),[])

const loadLabel = useCallback(()=>{
    labelService.get<ILabel>({key:'user_id',opt:'==', value: loggedUser?.id ?? ""}).then((result) => {
        setLabels(result);
    });
},[loggedUser])   

const addLableHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(labelName){
        labelService.create({name:labelName,user_id:loggedUser?.id}).then((result) => {
            setLabels([...labels,{name:labelName,id:result.id}]);
        });
        setLabelName('');
    }
}

const updateLabelHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const updatedLabels = labels.map(label =>
      label.id === id ? { ...label, name: value } : label
    );
    setLabels(updatedLabels);
    setTimeout(() => {
        labelService.update({id:id,data:{name:value}}).then((result) => {
            console.log("label updated in firebase!" , result);
        });
    }, 1000);
  };

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
                        <span>
                            <Icons name='PEN'/>
                        </span>
                        <input type='text' className="outline-none" placeholder='Create Label' value={labelName}  onChange={(e)=>setLabelName(e.target.value)}/>
                        <button onClick={addLableHandler} className='pl-1'>
                            <Icons name='TRUE'/>
                        </button>
                    </li>
                    {labels.map((label) => (
                        <li className="flex justify-center mx-4 my-2 gap-2" key={label.id}>
                            <span className='hover:hidden'>
                                <Icons name='ARROW'/>
                            </span>
                            <span className='hidden hover:block'>
                                <Icons name='ARROW'/>
                            </span>
                            <input type='text' id={`${label.id}`} className="outline-none focus:border-b-2 border-dark-500" placeholder='Create Label' value={label.name} onChange={(e) => updateLabelHandler(e)}/>
                            <label htmlFor={`${label.id}`}>
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