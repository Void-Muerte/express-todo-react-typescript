import React from "react";
import { Todo } from "../types/typeList";
import Trash from "./utils/Trash";
import useDeleteTodo from "../hooks/useDeleteTodo";
import { MType } from "../enums/enumList";
import Loading from "./utils/Loading";

const DisplayTodo: React.FC<{ todo: Todo; index: number }> = ({
  todo,
  index,
}) => {
    type deleteEvent = React.MouseEvent<HTMLButtonElement>;
    const {isDeleting, deleteMessage, deleteTodo} = useDeleteTodo();
    const handleDelete = async(e:deleteEvent)=>{
        e.stopPropagation();
        await deleteTodo(todo.id);
    }

  return (
    <section className="m-1.5 flex max-h-max  cursor-pointer flex-row items-center rounded-md border-[1px] px-1.5 py-4 hover:bg-gray-200">
      <span className="mx-0.5 flex h-5 w-5 shrink-0 items-center justify-center  rounded-full bg-black text-white">
        {index}
      </span>
      <p className="grow rounded-md border bg-gray-200 px-2 py-4">
        <span className="mb-2 block w-full border text-center">
          {todo.description}
        </span>
        <span
          className={`block w-full border pe-2 text-end text-sm font-light italic ${
            todo.completed ? "text-green-900" : "text-blue-700"
          }`}
        >
          {todo.completed ? "completed" : "in progress"}
          {deleteMessage?.type===MType.fail&&<p>{deleteMessage.msg}</p>}
        </span>
      </p>
      <section className="px-3 text-xs hover:text-red-500">
        <button
        onClick={handleDelete}
        disabled={isDeleting}>
            {isDeleting?(<Loading />):(<Trash />)}
        </button>
      </section>
    </section>
  );
};

export default DisplayTodo;
