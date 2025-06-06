import React, { useEffect, useState } from 'react';
import API from '../api';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    API.get('/todos').then(res => setTodos(res.data));
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    const res = await API.post('/todos', { text });
    setTodos([...todos, res.data]);
    setText('');
  };

  const deleteTodo = async (id) => {
    await API.delete(`/todos/${id}`);
    setTodos(todos.filter(t => t._id !== id));
  };

  return (
    <div>
      <form onSubmit={addTodo}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New To-Do" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
