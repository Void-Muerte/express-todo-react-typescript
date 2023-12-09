import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../api/axios';
import { useTodo } from '../context/todoContext';
import { MType } from '../enums/enumList';
import { Message } from '../interfaces/interfaceList';



const usePurgeTodos = () => {
    const [isPurging, setIsPurging] = useState<boolean>(false);
    const [purgeMessage, setPurgeMessage] = useState<Message | null>(null);
    const {dispatch} = useTodo();

    useEffect(()=>{
        if(purgeMessage){
            const timer = setTimeout(()=>setPurgeMessage(null), 2000);
            
            return ()=>clearTimeout(timer);
        }
    },[purgeMessage]);

    const deleteAll = async()=>{
        try {
            setIsPurging(true);
            const {data:{deleted}} = await axiosInstance.delete<{deleted:boolean}>('/');
            if(deleted){
                dispatch&& dispatch({type:'UNSET_TODOS'})
            }
        } catch (error) {
            if(axios.isAxiosError(error)){
                if(error.response){
                    const {data:{msg}} = error.response;
                    setPurgeMessage({type:MType.fail, msg});
                }else if(error.request){
                    setPurgeMessage({type:MType.fail, msg:"Error connecting to server"});
                }else{
                    setPurgeMessage({type:MType.fail, msg:error.message});
                }
            }else{
                setPurgeMessage({type:MType.fail, msg:"Unknown error occured!"})
            }
        }finally{
            setIsPurging(false);
        }
    }

  return {isPurging, purgeMessage, deleteAll }
}

export default usePurgeTodos;