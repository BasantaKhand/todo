import React from 'react';
import './css/Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                        {/* Social Media Icons */}
                    <div className="social-icons">
                        <a href="https://facebook.com" className="social-link">
                            <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                                {/* Facebook Icon SVG */}
                            </svg>
                        </a>
                        <a href="https://twitter.com" className="social-link">
                            <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                                {/* Twitter Icon SVG */}
                            </svg>
                        </a>
                        <a href="https://instagram.com" className="social-link">
                            <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                                {/* Instagram Icon SVG */}
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="footer-bottom">
                    &copy; {new Date().getFullYear()} Todo App. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
