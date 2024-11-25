import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { logout } from "../redux/slices/authSlice";
import { setTodos } from "../redux/slices/todoSlice";

export default function Main() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  useEffect(() => {
    const getTodos = async () => {
      const { data } = await axios.get(
        `http://localhost:5055/todos?_sort=-createdAt`,
      );
      dispatch(setTodos(data));
    };
    getTodos();
  }, []);
  return (
    <>
      <h1>회원제 투두리스트</h1>
      <button onClick={() => dispatch(logout())}>로그아웃</button>
      <TodoForm />
      <TodoList isDone={false} todos={todos} />
      <TodoList isDone={true} todos={todos} />
    </>
  );
}
