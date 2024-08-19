import React from 'react';
import {useNavigate, useNavigation} from "react-router-dom";
import {FiArrowLeft} from "react-icons/fi";

const ContactPage: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
            <div className="container mx-auto">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <FiArrowLeft size={20} className="mr-2"/>
                    Back
                </button>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                    <p className="text-gray-400">We'd love to hear from you! Reach out to us using the information
                        below.</p>
                </div>
                <div
                    className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-12">
                    {/* Contact Information */}
                    <div className="md:w-1/2">
                        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                        <p className="text-gray-400 mb-4">Feel free to get in touch with us via email or phone.</p>
                        <div className="text-gray-400">
                            <p className="mb-2">Email: khandbasanta55@gmail.com</p>
                            <p className="mb-2">Phone: 9806502892</p>
                            <p>Address: Raaniban, kathmandu</p>
                        </div>
                    </div>
                    {/* Social Media Links */}
                    <div className="md:w-1/2">
                        <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
                        <p className="text-gray-400 mb-4">Stay connected with us through social media.</p>
                        <div className="flex space-x-6">
                            <a href="https://facebook.com"
                               className="text-gray-400 hover:text-white transition duration-300">
                                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                                    {/* Facebook Icon SVG */}
                                    <path
                                        d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24h11.496v-9.294H9.691V11.07h3.129V8.327c0-3.1 1.894-4.792 4.659-4.792 1.325 0 2.463.098 2.796.143v3.24h-1.919c-1.506 0-1.797.717-1.797 1.767v2.317h3.593l-.468 3.636h-3.125V24h6.125C23.407 24 24 23.407 24 22.675V1.325C24 .593 23.407 0 22.675 0z"/>
                                </svg>
                            </a>
                            <a href="https://twitter.com"
                               className="text-gray-400 hover:text-white transition duration-300">
                                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                                    {/* Twitter Icon SVG */}
                                    <path
                                        d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.865 9.865 0 01-3.127 1.195 4.917 4.917 0 00-8.384 4.482A13.95 13.95 0 011.671 3.149 4.917 4.917 0 003.195 9.86a4.9 4.9 0 01-2.229-.616v.061a4.917 4.917 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.918 4.918 0 004.6 3.417A9.867 9.867 0 010 21.543a13.95 13.95 0 007.548 2.212c9.055 0 14.009-7.497 14.009-13.986 0-.21-.005-.42-.014-.63A9.936 9.936 0 0024 4.557z"/>
                                </svg>
                            </a>
                            <a href="https://instagram.com"
                               className="text-gray-400 hover:text-white transition duration-300">
                                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                                    {/* Instagram Icon SVG */}
                                    <path
                                        d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.311 3.608 1.287.975.975 1.225 2.242 1.287 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.311 2.633-1.287 3.608-.975.975-2.242 1.225-3.608 1.287-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.311-3.608-1.287-.975-.975-1.225-2.242-1.287-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.311-2.633 1.287-3.608.975-.975 2.242-1.225 3.608-1.287 1.265-.058 1.645-.07 4.849-.07zm0-2.163C8.756 0 8.322 0 7.052.06 5.781.122 4.733.365 3.812 1.287 2.891 2.209 2.648 3.257 2.586 4.528 2.526 5.798 2.516 6.232 2.516 12s.01 6.202.07 7.472c.062 1.271.305 2.319 1.227 3.241.921.922 1.969 1.165 3.241 1.227 1.27.06 1.704.07 7.472.07s6.202-.01 7.472-.07c1.271-.062 2.319-.305 3.241-1.227.922-.921 1.165-1.969 1.227-3.241.06-1.27.07-1.704.07-7.472s-.01-6.202-.07-7.472c-.062-1.271-.305-2.319-1.227-3.241-.921-.922-1.969-1.165-3.241-1.227C15.678 0 15.244 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162 0 3.403 2.759 6.162 6.162 6.162 3.403 0 6.162-2.759 6.162-6.162 0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.207 0-4-1.793-4-4s1.793-4 4-4 4 1.793 4 4-1.793 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.441 0 .796.645 1.441 1.441 1.441.796 0 1.441-.645 1.441-1.441 0-.796-.645-1.441-1.441-1.441z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
