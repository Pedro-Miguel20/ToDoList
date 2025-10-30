import TodoForm from "../components/TodoForm";
import TaskList from "../components/TodoList";

function todo() {
  return (
    <>
        <TodoForm className="none"/>
        <TaskList/>
    </>
  );
}

export default todo;