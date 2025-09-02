import type { Todo } from '../model/Todo';

type Props = {
    todo: Todo;
    onUpdate: (todo: Todo) => void;
    onDelete: () => void;
  };
  
const TodoItem = ({ todo, onUpdate, onDelete }: Props) => {
return (
    <div className="border p-4 rounded flex justify-between items-center mb-2">
    <div>
        <h3 className="text-lg font-bold">{todo.title}</h3>
        <p className="text-gray-600">{todo.description}</p>
    </div>
    <div className="flex gap-2">
        <button onClick={() => onUpdate(todo)} className="text-blue-500">Edit</button>
        <button onClick={onDelete} className="text-red-500">Delete</button>
    </div>
    </div>
);
};

export default TodoItem;
  