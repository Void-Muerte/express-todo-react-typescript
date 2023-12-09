import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../api/axios';
import { useTodo } from '../context/todoContext';
import { MType } from '../enums/enumList';
import { Message } from '../interfaces/interfaceList';
import { Todo } from '../types/typeList';


interface DeleteInt{
    isDeleting:boolean;
    deleteTodo:deleteTodo;
    deleteMessage:Message|null;
}
type UseDeleteTodo = ()=>DeleteInt;
type deleteTodo = (id:number)=>Promise<void>

const useDeleteTodo:UseDeleteTodo = () => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [deleteMessage, setDeleteMessage] = useState<Message|null>(null);
    const {dispatch} = useTodo();

    useEffect(()=>{
        if(deleteMessage){
            const timer = setTimeout(()=>setDeleteMessage(null),2000);
            return ()=>clearTimeout(timer);
        }
    },[deleteMessage])

    const deleteTodo = async(id:number)=>{
        try {
            setIsDeleting(true);
            const {data:{todo}} = await axiosInstance.delete<{todo:Todo}>(`/${id}`);
            dispatch&&dispatch({type:'DELETE_TODO', payload:todo})
        } catch (error) {
            if(axios.isAxiosError(error)){
                if(error.response){
                    const {data:{msg}} = error.response;
                    setDeleteMessage({type:MType.fail, msg})
                }else if(error.request){
                    setDeleteMessage({type:MType.fail, msg:'Error Connecting to server'});
                }else{
                    setDeleteMessage({type:MType.fail, msg:error.message})
                }
            }else{
                setDeleteMessage({type:MType.fail, msg:"Unknown error encountered!"});
            }
        }finally{
            setIsDeleting(false);
        }
    }
  return {isDeleting, deleteMessage, deleteTodo}
}

export default useDeleteTodo