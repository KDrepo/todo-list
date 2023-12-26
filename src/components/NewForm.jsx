import { useState, useEffect } from "react";

export default function NewForm() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  const [item, setItem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!item) return;
    setTodos([...todos, { id: todos.length + 1, text: item }]);
    setItem("");
  }

  function handleDelete(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className='flex flex-col items-center justify-center m-5 bg-zinc-900'>
      <h1 className='font-bold bg-blue-100 rounded-md w-[50%] h=[50%] text-center mt-2'>
        New Form
      </h1>
      <form>
        <label htmlFor='Add to do'></label>
        <input
          className='p-2 m-2 border-2 border-gray-400 rounded-md'
          type='text'
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder='Ad todo'
        />
        <button
          type='submit'
          onClick={handleSubmit}
          className='p-2 m-2 border-2 rounded-md bg-slate-600 '
        >
          Add todo
        </button>
        <ul>
          {todos.length === 0 && (
            <p className='mb-2 font-bold text-center bg-red-100 rounded-md'>
              No todos
            </p>
          )}

          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button
                onClick={() => handleDelete(todo.id)}
                className='p-2 m-2 bg-red-100 border-2 rounded-md'
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}
