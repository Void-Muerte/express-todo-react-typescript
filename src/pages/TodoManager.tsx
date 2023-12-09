import TodoHome from "../components/managers/Todo";
// import Todo from "../components/managers/Todo";
import { TodoProvider } from "../context/todoContext";

const TodoManager = () => {
  return (
    <TodoProvider>
        <TodoHome />
    </TodoProvider>
  )
}

export default TodoManager;