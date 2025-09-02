
import { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/api';
import type { Todo } from '../model/Todo';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('loggedIn')) {
      navigate('/login');
    } else {
      fetchTodos();
    }
  }, []);

  const fetchTodos = async () => {
    const userId = Number(localStorage.getItem('userId'));
    const res = await getTodos(userId);
    setTodos(res.data);
  };

  const handleCreateOrUpdate = async () => {
    const userId = Number(localStorage.getItem('userId'));

    if (!userId) {
      setError('User not authenticated');
      return;
    }

    setIsLoading(true);
    try {
      if (editId !== null) {
        await updateTodo(editId, { title, description });
        setEditId(null);
      } else {
        await createTodo(title, description, userId);
      }

      setTitle('');
      setDescription('');
      fetchTodos();
    } catch (error) {
      console.error('Failed to save todo', error);
      setError('Check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditId(todo.id!);
    setTitle(todo.title);
    setDescription(todo.description || '');
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    fetchTodos();
  };

  const handleToggleComplete = async (todo: Todo) => {
    await updateTodo(todo.id!, {
      ...todo,
      completed: !todo.completed,
    });
    fetchTodos();
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 text-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Todos</h2>
        <button
          onClick={handleLogout}
          style={{ cursor: 'pointer' }}
          className="text-sm text-red-400 hover:text-red-500 underline transition"
        >
          Logout
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <Input
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
        <Button
            onClick={handleCreateOrUpdate}
            disabled={isLoading}
            className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded transition"
        >
            {isLoading ? 'Saving...' : editId !== null ? 'Update Todo' : 'Add Todo'}
        </Button>

        {error && <p className="text-red-500 text-sm mt-2 mb-3">{error}</p>}
    </div>


      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="border border-gray-700 p-4 rounded-lg shadow-sm flex justify-between items-start hover:shadow-md transition"
          >
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo)}
                className="h-5 w-5 text-indigo-400 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500 mt-1"
              />
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    todo.completed ? 'line-through text-gray-500' : 'text-black'
                  }`}
                >
                  {todo.title}
                </h3>
                <p
                  className={`text-sm ${
                    todo.completed
                      ? 'line-through text-gray-500'
                      : 'text-gray-800'
                  }`}
                >
                  {todo.description}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0 sm:items-center">
              <button
                onClick={() => handleEdit(todo)}
                style={{ cursor: 'pointer' }}
                disabled={todo.completed}
                className={`text-sm font-medium ${
                  todo.completed
                    ? 'text-gray-500 cursor-not-allowed'
                    : 'text-indigo-400 hover:text-indigo-300'
                } transition`}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo.id!)}
                style={{ cursor: 'pointer' }}
                className="text-sm text-red-400 hover:text-red-300 transition font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
