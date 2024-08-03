import { useCallback, useEffect, useState } from "react";
import { ILabel } from "../../interfaces/interfaces";
import useAuth from "../../hooks/useAuth";
import labelService from "../../lib/firebase/services/label.service";


export const useLabelHandler = () => {

    const [labels, setLabels] = useState<ILabel[]>([])
    const [labelName, setLabelName] = useState('')
    const {loggedUser} = useAuth();

    useEffect(() => loadLabel(),[])

    const loadLabel = useCallback(()=>{
        labelService.get<ILabel>({key:'user_id',opt:'==', value: loggedUser?.id ?? ""}).then((result) => {
            setLabels(result);
        });
    },[loggedUser])   

    const addLableHandler = () => {
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

    return {labels, labelName, setLabelName, addLableHandler,updateLabelHandler};
}