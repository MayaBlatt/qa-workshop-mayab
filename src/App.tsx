import { useState, useEffect } from 'react';
import './App.css';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((res) => res.json())
      .then((data: Todo[]) => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  if (loading) {
    return (
      <div className="App" data-testid="app-container">
        <p data-testid="loading-indicator">Loading...</p>
      </div>
    );
  }

  return (
    <div className="App" data-testid="app-container">
      <h1 data-testid="app-heading">QA Workshop – Todos</h1>
      <ul className="todo-list" data-testid="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item" data-testid={`todo-item-${todo.id}`}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                data-testid={`todo-checkbox-${todo.id}`}
              />
              <span className={todo.completed ? 'completed' : ''}>
                {todo.title}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
