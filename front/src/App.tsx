import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import {useAuth0, User} from "@auth0/auth0-react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"
import {todoService} from "./services/todoSevice.ts";
import {Todo} from "./types/Todo.ts";
import useFetchTask from "./hooks/useFetchTask.ts";
import { FaCheckCircle } from 'react-icons/fa';


const App: React.FC = () => {
    const {isAuthenticated, logout, isLoading, user, getAccessTokenSilently} = useAuth0();
    const { allTodos, isLoadingT, setUserId, setIsLoading} = useFetchTask();


    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        if (user && user.email) {
            setUserId(user?.email)
        }
    }, [user]);

    useEffect(() => {
        setTodos((prev) => [...allTodos].reverse())
    }, [allTodos]);

    const [showAddTodo, setShowAddTodo] = useState<boolean>(() => {
        const storedShowAddTodo = localStorage.getItem('showAddTodo');
        return storedShowAddTodo ? JSON.parse(storedShowAddTodo) : true; // Default to true (add todo page)
    });

    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const darkModeSetting = localStorage.getItem('darkMode');
        return darkModeSetting ? JSON.parse(darkModeSetting) : false;
    });

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    };

    // Function to add a new todo
    const addTodo = async (text: string) => {
        try {
        if (!user || !user.email) {
            logout();
            return;
        }
        const newTodo: Todo = {  text, completed: false, userId: user?.email};

        if (!user || !user?.email) {
            logout();
            return;
        }
        const savedTodo = await todoService.createTodo(user?.email, newTodo);
        setTodos(prevTodos => [savedTodo,...prevTodos]);
        toast.success("Task added")
    } catch(error) {
        toast.error(error instanceof Error ? error.message : "Something wrong...")
    }
    };

    // Function to update an existing todo
    const updateTodo = async (updatedTodo: Todo) => {
        try {
            setIsLoading(true)
            const newTodo:Todo = await todoService.updateTask(updatedTodo.id, updatedTodo.text);
            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo.id === newTodo.id ? {...todo, text: newTodo.text} : todo
                )
            );
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    };

    // Function to toggle the completed status of a todo
    const toggleTodo = async (id: number) => {
        try {
            setIsLoading(true)
            const todo = todos.find(todo => todo.id === id);
            await todoService.completedNotComplete(id, !todo.completed);
            // todo.completed

            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo.id === id ? {...todo, completed: !todo.completed} : todo
                )
            );
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    };

    // Function to delete a todo
    const deleteTodo = async (id: number) => {
        try {
            setIsLoading(true)
            await todoService.deleteTodo(id);
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false)
        }
    };

    // Function to copy todo text to clipboard
    const copyTodo = (text: string) => {
        navigator.clipboard.writeText(text);
        alert(`Copied: ${text}`);
    };

    // Effect to update local storage whenever todos changes
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // Effect to update local storage whenever showAddTodo changes
    useEffect(() => {
        localStorage.setItem('showAddTodo', JSON.stringify(showAddTodo));
    }, [showAddTodo]);


    useEffect(() => {
        (async () => {
            if (isAuthenticated && user) {
                console.log(user)
                toast.success(`Welcome, ${user.name}`);
            } else {
                toast.info("Login for more...")
            }
        })()

    }, [isAuthenticated, isLoading, user]);


    const onLoginSuccess = () => {
        alert("hero")
    }



    if (isLoading || isLoadingT) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-900 dark:bg-gray-900">
            <div className="flex flex-col items-center">
                <svg
                    className="animate-spin h-10 w-10 text-indigo-600 dark:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V2a10 10 0 00-10 10h2zm0 0a8 8 0 018-8V2a10 10 0 00-10 10h2zm16 0a8 8 0 01-8 8v2a10 10 0 0010-10h-2zm0 0a8 8 0 01-8 8v2a10 10 0 0010-10h-2zM6 14a8 8 0 008 8v2a10 10 0 01-10-10h2zm12 0a8 8 0 008 8v2a10 10 0 01-10-10h2zm0-6a8 8 0 00-8-8V2a10 10 0 0110 10h-2zm0 0a8 8 0 00-8-8V2a10 10 0 0110 10h-2z"
                    ></path>
                </svg>
                <span className="mt-2 text-lg text-gray-700 dark:text-gray-300">Loading...</span>
            </div>
        </div>
    }



    return (
        <div className={`min-h-screen ${darkMode ? 'dark' : ''} main`}>
            <ToastContainer/>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} setShowAddTodo={setShowAddTodo}
                    onLoginSuccess={onLoginSuccess}/>
            {
                !isAuthenticated &&
                <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
            <div className="text-center bg-gray-800 p-8 rounded-lg shadow-xl max-w-sm mx-4 sm:mx-8 lg:mx-16">
                <img
                    src="https://via.placeholder.com/200x150"
                    alt="Todo App"
                    className="w-full h-auto rounded-lg mb-4"
                />
                <h1 className="text-3xl font-extrabold text-gray-100 mb-3">Welcome to Your Todo App</h1>
                <p className="text-gray-300 text-base mb-4">
                    Manage your tasks efficiently and stay organized with our intuitive and user-friendly Todo App.
                </p>
                <ul className="text-left mb-6 space-y-2">
                    <li className="flex items-center text-gray-200 text-sm">
                        <FaCheckCircle className="text-green-400 mr-2" /> Easy task management
                    </li>
                    <li className="flex items-center text-gray-200 text-sm">
                        <FaCheckCircle className="text-green-400 mr-2" /> Customizable task categories
                    </li>
                    <li className="flex items-center text-gray-200 text-sm">
                        <FaCheckCircle className="text-green-400 mr-2" /> Sync across devices
                    </li>
                </ul>
            </div>
        </div>
            }
            {showAddTodo ? (
                <div className="flex justify-center pt-8 w-full">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-200">
                        <AddTodo addTodo={addTodo}/>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center  w-full">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full ">
                        {
                            isLoadingT ? <svg
                                className="animate-spin h-10 w-10 text-indigo-600 dark:text-indigo-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V2a10 10 0 00-10 10h2zm0 0a8 8 0 018-8V2a10 10 0 00-10 10h2zm16 0a8 8 0 01-8 8v2a10 10 0 0010-10h-2zm0 0a8 8 0 01-8 8v2a10 10 0 0010-10h-2zM6 14a8 8 0 008 8v2a10 10 0 01-10-10h2zm12 0a8 8 0 008 8v2a10 10 0 01-10-10h2zm0-6a8 8 0 00-8-8V2a10 10 0 0110 10h-2zm0 0a8 8 0 00-8-8V2a10 10 0 0110 10h-2z"
                                ></path>
                            </svg> : <TodoList
                                todos={todos}
                                toggleTodo={toggleTodo}
                                deleteTodo={deleteTodo}
                                updateTodo={updateTodo}
                                copyTodo={copyTodo}
                            />
                        }

                    </div>
                </div>
            )}

        </div>
    );
};

export default App;
