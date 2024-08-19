import React, { useState } from 'react';
import Modal from 'react-modal';
import { FiCheckCircle, FiEdit, FiTrash, FiCopy } from 'react-icons/fi';
import { Todo } from "../types/Todo.ts";

interface TodoListProps {
    todos: Todo[];
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
    updateTodo: (todo: Todo) => void;
    copyTodo: (text: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo, updateTodo, copyTodo }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
    const [newText, setNewText] = useState('');

    const openModal = (todo: Todo) => {
        setCurrentTodo(todo);
        setNewText(todo.text);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleUpdate = () => {
        if (currentTodo) {
            updateTodo({
                ...currentTodo,
                text: newText,
                updatedAt: new Date().toISOString()
            });
            closeModal();
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modified Date</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {todos.length > 0 ? (
                    todos.map(todo => (
                        <tr key={todo.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className={`${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'} text-sm font-medium`}>
                                    {todo.text}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(todo.createdAt).toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(todo.updatedAt).toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                <div className="flex justify-center space-x-4">
                                    <button
                                        className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 dark:hover:bg-green-400 focus:outline-none focus:ring focus:ring-green-300"
                                        onClick={() => openModal(todo)}
                                        aria-label="Update Task"
                                    >
                                        <FiEdit size={16} />
                                    </button>
                                    <button
                                        className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
                                        onClick={() => copyTodo(todo.text)}
                                        aria-label="Copy Task"
                                    >
                                        <FiCopy size={16} />
                                    </button>
                                    <button
                                        className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300"
                                        onClick={() => deleteTodo(todo.id)}
                                        aria-label="Delete Task"
                                    >
                                        <FiTrash size={16} />
                                    </button>
                                    <button
                                        className={`p-2 rounded-full ${todo.completed ? 'bg-gray-300 dark:bg-gray-600' : 'bg-green-500'} text-white hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-200`}
                                        onClick={() => toggleTodo(todo.id)}
                                        aria-label={todo.completed ? "Mark Incomplete" : "Mark Complete"}
                                    >
                                        <FiCheckCircle size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={4} className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">No tasks found.</td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* Modal for updating todo */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Update Task"
                className="fixed inset-0 flex items-center justify-center z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Update Task</h2>
                    <input
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Task description"
                    />
                    <div className="mt-4 flex justify-end space-x-4">
                        <button
                            onClick={handleUpdate}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Update
                        </button>
                        <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-300 text-gray-900 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default TodoList;
