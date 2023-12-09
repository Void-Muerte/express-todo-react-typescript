import { useState, useEffect } from "react";
import { useTodo } from "../../context/todoContext";
import useFetchTodos from "../../hooks/useFetchTodos";
import TodoHeader from "../TodoHeader";
import AddTodoForm from "../AddTodoForm";
import Loading from "../utils/Loading";
import { Todo } from "../../types/typeList";
import usePurgeTodos from "../../hooks/usePurgeTodos";
import { MType } from "../../enums/enumList";
import DisplayTodo from "../TodoList";

const TodoHome = () => {
  const { todos } = useTodo();
  const { isFetching, fetchError, findAllTodos } = useFetchTodos();
  const { isPurging, purgeMessage, deleteAll } = usePurgeTodos();
  const [activeCheckbox, setActiveCheckbox] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] =
    useState<string>("Todo List is empty");
  const [todoList, setTodoList] = useState<Todo[] | []>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      await findAllTodos();
    };
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setTodoList(todos);
  }, [todos]);
  useEffect(() => {
    const tempTodos = filteredTodos();
    setTodoList(tempTodos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCheckbox, todos.length]);

  const handlePurge = async () => {
    await deleteAll();
  };
  const handleCheckboxChange = (checkboxType: string) => {
    if (activeCheckbox === checkboxType) {
      // If the clicked checkbox is already active, deactivate it
      setActiveCheckbox(null);
    } else {
      // Otherwise, activate the clicked checkbox
      setActiveCheckbox(checkboxType);
    }
    setErrorMessage("No Matching Results");
  };
  const filteredTodos = () =>
    todos.filter((todo) => {
      if (activeCheckbox === "completed") {
        return todo.completed === 1; // Include completed todos
      } else if (activeCheckbox === "incomplete") {
        return todo.completed === 0; // Include incomplete todos
      }else{
        return true; // Include all todos when no checkbox is active
      }
    });
  return (
    <div>
      <TodoHeader />
      <section className="mx-auto  flex flex-wrap-reverse justify-around space-x-10  sm:flex-row md:mx-10">
        <main className="flex max-w-[600px] flex-col space-y-4 shadow-gray-200 sm:my-14">
          <section className="flex items-center space-x-5 border-[0.5px] border-gray-200 px-2  py-4 text-sm font-light">
            <label className="flex flex-row items-center space-x-0.5 text-sm font-light">
              <input
                type="checkbox"
                className="disabled:cursor-not-allowed"
                disabled={!todos.length}
                checked={activeCheckbox === "completed"}
                onChange={() => handleCheckboxChange("completed")}
              />
              <span>Completed</span>
            </label>
            <label className="flex flex-row items-center space-x-0.5 text-sm font-light">
              <input
                type="checkbox"
                className="disabled:cursor-not-allowed"
                disabled={!todos.length}
                checked={activeCheckbox === "incomplete"}
                onChange={() => handleCheckboxChange("incomplete")}
              />
              <span>Incomplete</span>
            </label>
            <button
              className="rounded-md px-2 py-1 font-thin text-blue-400 outline outline-[0.5px] outline-blue-400 hover:bg-blue-400 hover:text-white disabled:cursor-not-allowed disabled:bg-gray-50 disabled:outline-offset-1 disabled:outline-gray-50"
              disabled={!todos.length}
              onClick={handlePurge}
            >
              {isPurging ? <Loading /> : "Clear Todo List"}
            </button>
          </section>
          {purgeMessage?.type === MType.fail && <p>{purgeMessage.msg}</p>}
          <div className="flex   flex-col justify-center overflow-y-auto rounded-t-md">
            {isFetching ? (
              <p>
                Fetching Todos <Loading />
              </p>
            ) : (
              <section className="flex w-full flex-col space-y-1.5 py-4">
                {todoList.length !== 0 ? (
                  todoList.map((todo, index) => (
                    <DisplayTodo key={index} index={index} todo={todo} />
                  ))
                ) : (
                  <p>{errorMessage || fetchError}</p>
                )}
              </section>
            )}
          </div>
        </main>
        <aside>
          <AddTodoForm />
        </aside>
      </section>
    </div>
  );
};

export default TodoHome;
