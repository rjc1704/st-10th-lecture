import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTodos } from "../redux/slices/todoSlice.js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!title && !contents) {
      alert("내용이나 제목을 입력해주세요.");
    }
    const newTodo = {
      id: uuidv4(),
      title,
      contents,
      isDone: false,
      createdAt: Date.now(),
    };
    await axios.post(`http://localhost:5055/todos`, newTodo);
    const { data: todos } = await axios.get(
      `http://localhost:5055/todos?_sort=-createdAt`,
    );
    dispatch(setTodos(todos));
  };

  return (
    <form onSubmit={onSubmit}>
      <label>제목: </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>내용: </label>
      <input
        type="text"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <button type={"submit"}>추가</button>
    </form>
  );
}
