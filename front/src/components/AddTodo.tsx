import React, { useState } from 'react';

interface AddTodoProps {
    addTodo: (text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
    const [text, setText] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            addTodo(text);
            setText('');
        }
    };

    return (
        <div className="flex flex-col items-center space-y-6">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
            <img 
    src='./logo.png' 
    height={40} 
    width={70} 
    style={{ 
        filter: 'none', // You can adjust or add a filter if needed
        transform: 'scale(1.1)', // Adjust the value to zoom in (1.0 is the original size, 1.1 is 10% zoomed in)
        transition: 'transform 0.3s ease' // Smooth transition for scaling
    }} 
    alt="Logo"
/>
                <h1 className="text-3xl font-bold text-white">Todo App</h1>
            </div>
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center p-6 bg-gradient-to-r from-blue-600 to-purple-800 rounded-lg shadow-lg space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-3xl">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a new todo..."
                    className="flex-grow w-full sm:w-auto bg-white dark:bg-gray-800 border-none p-4 rounded-md focus:outline-none focus:ring-4 focus:ring-purple-500 text-lg"
                />
                <button type="submit" className="w-full sm:w-auto p-4 bg-purple-700 text-white rounded-md shadow-md hover:bg-purple-800 transition-all duration-300 text-lg">
                    Add Todo
                </button>
            </form>
        </div>
    );
};

export default AddTodo;
