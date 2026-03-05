import React from "react";
import "./Start.css";
import Cookies from "js-cookie"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
function Start() {
    const navigate = useNavigate();
    const moveToSignUp = ()=>{
        navigate("/register")
    }
    const moveToLogin = ()=>{
        navigate("/login");
    }
    const moveToMoreInfo = ()=>{
        navigate("/moreInfo");
    }
    const CookieCheck = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("jwt_token"); // ✅ Proper way to read

        if (!token) { // ✅ Works if token is null or undefined
        navigate("/");
        } else {
        navigate("/dashboard");
        }
    }, [navigate]);
    };
    CookieCheck();
    return (
        <div className="landing-container">
            <nav className="navbar">
                <h2 className="logo">💰 Expense<span>Tracker</span></h2>
                <div className="nav-links">
                    <a href="#features">Features</a>
                    <a href="#about-section">About</a>
                    <a href="#" onClick={moveToSignUp}>SignUp</a>
                    <a href="#" onClick={moveToLogin}>Login</a>
                </div>
            </nav>

            <header className="hero">
                <div className="hero-text">
                    <h1>Track Your Expenses Effortlessly</h1>
                    <p>
                        Manage your spending, set budgets, and visualize your financial
                        goals — all in one beautiful dashboard.
                    </p>
                    <div className="hero-buttons">
                        <button className="btn-primary" onClick={moveToLogin}>Start Tracking</button>
                        <button className="btn-secondary" onClick={moveToMoreInfo}>Learn More</button>
                    </div>
                </div>
                <div className="hero-img">
                    <img
                        src="https://res.cloudinary.com/dmn4kh4js/image/upload/v1772693542/illustrateExpense_ezp7xd.png"
                        alt="Expense Illustration"
                    />
                </div>
            </header>

            <section id="features" className="features">
                <h2>📊 Why Choose Our Tracker?</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <h3>Real-Time Insights</h3>
                        <p>Instantly see where your money goes with interactive charts.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Smart Budgeting</h3>
                        <p>Set limits and stay on top of your monthly goals easily.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Secure & Private</h3>
                        <p>Your data stays safe with strong encryption and privacy-first design.</p>
                    </div>
                </div>
            </section>
            <section className="about-section" id="about-section">
                <div className="about-content">
                    <h2 className="about-title">About Smart Expense Tracker</h2>
                    <p className="about-description">
                    Smart Expense Tracker is your personal finance assistant — helping you record, analyze, and manage your daily spending effortlessly. 
                    Our goal is to simplify money management by offering clear insights into where your money goes.
                    </p>

                    <div className="about-features">
                        <div className="feature-card">
                            <i className="fa-solid fa-chart-line feature-icon"></i>
                            <h3>Track Expenses</h3>
                            <p>Easily categorize and monitor your expenses with a single click.</p>
                        </div>

                        <div className="feature-card">
                            <i className="fa-solid fa-piggy-bank feature-icon"></i>
                            <h3>Set Budgets</h3>
                            <p>Stay on top of your finances by setting monthly saving goals.</p>
                        </div>

                        <div className="feature-card">
                            <i className="fa-solid fa-shield-halved feature-icon"></i>
                            <h3>Secure & Private</h3>
                            <p>Your data stays safe with our end-to-end encrypted storage.</p>
                        </div>
                    </div>
                    <button className="btn-primary" onClick={moveToLogin}>Get Started</button>
                </div>
            </section>
            <footer className="footer">
                <p>© {new Date().getFullYear()} ExpenseTracker. Built with ❤️ by Teja</p>
            </footer>
        </div>
    );
}

export default Start;
