import React from 'react';
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import './css/AboutPage.css';

export default function AboutPage() {
    const navigate = useNavigate();
    return (
        <div className="container_">
            <div className="gradientOverlay"></div>

            <div className="content">
                <button
                    onClick={() => navigate("/")}
                    className="backButton"
                >
                    <FiArrowLeft size={20} className="mr-2" />
                    Back
                </button>
                <h1 className="title">About Us</h1>
                <p className="description">
                    We are Codehons, where creativity meets innovation. Our passion drives us to
                    create meaningful solutions that leave a lasting impact.
                </p>
                <p className="description">
                    Our mission is to revolutionize the digital space with groundbreaking ideas,
                    putting our clients at the forefront of their industries. We believe in the
                    power of collaboration and relentless pursuit of excellence.
                </p>
            </div>
            <div className="imageContainer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg" alt="About Us" className="image" />
            </div>
        </div>
    );
}
