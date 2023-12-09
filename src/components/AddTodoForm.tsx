import React,{ useState } from "react";
import useAddTodo from "../hooks/useAddTodo";
import { MType } from "../enums/enumList";


const AddTodoForm: React.FC = () => {
    const [description, setDescription] = useState<string>('');
    const {isAdding, addTodo, addedMessage} = useAddTodo();

    type ToggleReset = React.MouseEvent<HTMLButtonElement>;
    type ToggleChangeCompleted = React.ChangeEvent<HTMLInputElement>;
    type ToggleSubmit = React.FormEvent<HTMLFormElement>;
    type Submit = (e:ToggleSubmit)=>void;
    type HandleChangeDescription = (e:ToggleChangeCompleted)=>void;
    type HandleReset = (e:ToggleReset)=>void;

    const handleChangeDescription:HandleChangeDescription = (e)=>{
        setDescription(e.target.value);
    }
    const handleReset:HandleReset = (e)=>{
        e.preventDefault();
        setDescription('');
    }
    const handleSubmit:Submit = async(e)=>{
        e.preventDefault();
        await addTodo(description);
        setDescription('');

    }
  return (
    <form onSubmit={handleSubmit} className="rounded-md border-[0.5px] shadow-sm shadow-gray-200 sm:my-14">
        <fieldset className="flex flex-col space-y-4 px-4 pb-5">
            {addedMessage&&<p 
                className={`rounded-md border-x-4 bg-gray-200 py-1.5 text-center ${addedMessage.type===MType.fail?'border-yellow-500':'border-green-500'}`}>{addedMessage?.msg}</p>}
            <legend className="text-center text-3xl font-extrabold text-blue-500">New Todo</legend>
            <section className="flex flex-col space-y-1">
                <span className="text-gray-400">Description</span>
                <input 
                    type="text"
                    value={description}
                    onChange={handleChangeDescription}
                    className="rounded-md border-[0.5px] px-1.5 py-1 focus:outline-blue-400"
                     />
            </section>
            <section className="flex flex-row justify-between">
                <button
                    type="reset"
                    onClick={handleReset}
                    disabled={isAdding}
                    className="rounded-lg px-3 py-1 text-red-400 outline outline-1 outline-red-400 hover:bg-red-400 hover:text-white"
                >
                    Reset
                </button>
                <button
                type="submit"
                disabled={isAdding}
                className="rounded-lg px-3 py-1 text-blue-500 outline outline-1 outline-blue-500 hover:bg-blue-500 hover:text-white">
                    {"Add"}
                </button>
            </section>
        </fieldset>
    </form>
  )
}

export default AddTodoForm;