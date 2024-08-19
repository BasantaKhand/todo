import React from 'react';
import { FiTrash, FiEdit, FiCopy } from 'react-icons/fi';
import {Todo} from "../types/Todo.ts";



interface TodoItemProps {
    todo: Todo;
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
    setEditTodo: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo, setEditTodo }) => {
    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(todo.text);
        alert('Todo text copied to clipboard!');
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between">
            <div className={`flex-grow cursor-pointer ${todo.completed ? 'line-through' : ''}`} onClick={() => toggleTodo(todo.id)}>
                {todo.text}
            </div>
            <div className="flex space-x-2">
                <button
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
                    onClick={() => setEditTodo(todo)}
                >
                    <FiEdit />
                </button>
                <button
                    className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-500"
                    onClick={() => deleteTodo(todo.id)}
                >
                    <FiTrash />
                </button>
                <button
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500"
                    onClick={handleCopyToClipboard}
                >
                    <FiCopy />
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
