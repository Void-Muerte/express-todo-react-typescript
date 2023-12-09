import {useState, useEffect} from 'react';
import axios from 'axios';
import axiosInstance from '../api/axios';
import { useTodo } from '../context/todoContext';
import { Todo } from '../types/typeList';
import { Message } from '../interfaces/interfaceList';
import { MType } from '../enums/enumList';

interface TodoAdding{
    isAdding:boolean;
    addTodo:TodoFunc;
    addedMessage:Message | null;
}


type TodoFunc = (description:string)=>Promise<void>
type AddTodoType = ()=>TodoAdding;

const useAddTodo:AddTodoType = () => {
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [addedMessage, setAddedMessage] = useState<Message|null>(null);
    const {dispatch} = useTodo();

    useEffect(()=>{
        if(addedMessage){
            const timer = setTimeout(()=>setAddedMessage(null),2000);

            return ()=>clearTimeout(timer);
        }
    }, [addedMessage])
    const addTodo:TodoFunc = async(description)=>{
        try {
            setIsAdding(true);
            const {data:{todo}} = await axiosInstance.post<{todo:Todo}>('/', JSON.stringify({description}));
            dispatch&& dispatch({type:'ADD_TODO', payload:todo});
        } catch (error) {
            if(axios.isAxiosError(error)){
                if(error.response){
                    const {data:{msg}} = error.response;
                    setAddedMessage({type:MType.fail, msg});
                }else if(error.request){
                    setAddedMessage({type:MType.fail, msg:"Error connecting to server"});
                }else{
                    setAddedMessage({type:MType.fail,msg:error.message});
                }
            }else{
                setAddedMessage({type:MType.fail, msg:"Unknown error occured!"});
            }
            
        }finally{
            setIsAdding(false);
        }
    }
  return {isAdding, addTodo, addedMessage}
}

export default useAddTodo;
