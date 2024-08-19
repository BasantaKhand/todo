import React from 'react';
import { FiSun, FiMoon, FiList, FiPlus, FiPhone, FiInfo } from 'react-icons/fi';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useNavigate } from 'react-router-dom';
import 'tippy.js/dist/tippy.css'; // Import Tippy.js styles
import Tippy from '@tippyjs/react';
import { DiAsterisk } from "react-icons/di"; // Import Tippy.js for tooltips

interface NavbarProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
    setShowAddTodo: (show: boolean) => void;
    onLoginSuccess: (response: any) => void; // Callback function to handle login success
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode, setShowAddTodo, onLoginSuccess }) => {
    const navigate = useNavigate();
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (
        <nav className="bg-white dark:bg-gray-800 p-4 shadow-md flex justify-between items-center sticky top-0 z-10 flex-wrap">
            <Link to={"/"}>
        
            <div className="text-xl font-bold text-gray-900 dark:text-white mb-2 md:mb-0">
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
            </div>
            </Link>
            <div className="flex items-center space-x-4 flex-wrap gap-3">
                <Tippy content="View Todos">
                    <button
                        className={`p-2 rounded-lg ${!setShowAddTodo ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'}`}
                        onClick={() => setShowAddTodo(false)}
                        aria-label="View Todos"
                    >
                        <FiList size={20} />
                    </button>
                </Tippy>
                <Tippy content="Add Todo">
                    <button
                        className={`p-2 rounded-lg ${setShowAddTodo ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'}`}
                        onClick={() => setShowAddTodo(true)}
                        aria-label="Add TodoService"
                    >
                        <FiPlus size={20} />
                    </button>
                </Tippy>
                <Tippy content={darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}>
                    <button
                        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                        onClick={toggleDarkMode}
                        aria-label={darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
                    >
                        {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                    </button>
                </Tippy>
                <Tippy content="About">
                    <button
                        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                        onClick={() => navigate("/about")}
                        aria-label="About"
                    >
                        <FiInfo size={20} />
                    </button>
                </Tippy>
                <Tippy content="Contact">
                    <button
                        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                        onClick={() => navigate("/contact")}
                        aria-label="Contact"
                    >
                        <FiPhone size={20} />
                    </button>
                </Tippy>

                {isAuthenticated &&

                    <Tippy content="Dash">
                        <button
                            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                            onClick={() => navigate("/dash")}
                            aria-label="Dash"
                        >
                            <DiAsterisk size={20} />
                        </button>
                    </Tippy>
                }

                {!isAuthenticated ? (
                    <Tippy content="Login">
                        <button
                            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                            onClick={() => loginWithRedirect()}
                            aria-label="Login"
                        >
                            <BiLogIn size={20} />
                        </button>
                    </Tippy>
                ) : (
                    <Tippy content="Logout">
                        <button
                            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                            onClick={() => logout()}
                            aria-label="Logout"
                        >
                            <BiLogOut size={20} />
                        </button>
                    </Tippy>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
