import React from 'react';
import './dash.css';
import { FiArrowLeft } from "react-icons/fi";
import navbar from "../../components/Navbar.tsx";
import {useNavigate} from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

export default function DashPage() {
    const navigate = useNavigate();
    const {isLoading, user} = useAuth0();






    return (
        <div className="dashboard-fullpage">
            <div className="profile-card">
                <button
                    onClick={() => navigate("/")}
                    className="back-button"
                >
                    <FiArrowLeft size={20} className="back-icon" />
                    Back
                </button>
                <img src={user? user.picture : ""} alt="Profile" className="profile-image" />
                <h1 className="user-name">{user ? user.name : " "}</h1>
                <p className="user-nickname">@{user? user.nickname : " "}</p>
                <p className="user-email">{user? user.email: ""}</p>
                <p className="email-verified">
                    {user?  user.email_verified ? 'Email Verified' : 'Email Not Verified' : "Loading..."}
                </p>
                <p className="last-updated">Last Updated: {new Date(user?  user.updated_at : "123").toLocaleString()}</p>
            </div>
        </div>
    );
}
