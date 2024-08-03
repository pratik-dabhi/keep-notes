import React from 'react'
import Icons from '../../../components/icons/Icons'

type TCreateLabelProps = {
    labelName : string,
    setLabelName : React.Dispatch<React.SetStateAction<string>>,
    addLableHandler : () => void,
}

const CreateLabel = ({labelName,setLabelName,addLableHandler}:TCreateLabelProps) => {
  return (
    <>
        <span><Icons name='PEN'/></span>
        <input type='text' className="outline-none" placeholder='Create Label' value={labelName}  onChange={(e)=>setLabelName(e.target.value)}/>
        <button onClick={addLableHandler} className='pl-1'>
            <Icons name='TRUE'/>
        </button>
    </>
  )
}

export default CreateLabel