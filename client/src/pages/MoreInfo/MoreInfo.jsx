import React from "react";
import "./MoreInfo.css";
import Back from "./../../componets/Back"
const MoreInfo = () => {
    return (
        <div className="moreinfo-container">
        {/* Hero Section */}
        <Back/>
        <section className="moreinfo-hero">
            <div className="moreinfo-text">
            <h1>About Expense<span>Tracker</span></h1>
            <p>
                ExpenseTracker is your smart personal finance companion that helps you 
                manage income, control spending, and reach your financial goals effortlessly. 
                Designed for simplicity and precision, it empowers users to take charge 
                of their money with clarity and confidence.
            </p>
            </div>
            <div className="moreinfo-img">
            <img
                src="https://res.cloudinary.com/dmn4kh4js/image/upload/v1772693006/myPhoto_qhuo6n.jpg"
                alt="About illustration"
            />
            </div>
        </section>

        {/* Features Section */}
        <section className="moreinfo-features">
            <h2>Our Core Features 🌟</h2>
            <div className="feature-grid">
            <div className="feature-card">
                <h3>💸 Expense Tracking</h3>
                <p>Track every transaction effortlessly and categorize your spending for deeper insights.</p>
            </div>
            <div className="feature-card">
                <h3>📈 Smart Budgeting</h3>
                <p>Set monthly budgets and get real-time feedback to help you stay on top of your goals.</p>
            </div>
            <div className="feature-card">
                <h3>🔒 Data Privacy</h3>
                <p>Your data is protected with robust security standards and private local storage or cloud options.</p>
            </div>
            <div className="feature-card">
                <h3>📊 Visual Reports</h3>
                <p>Interactive charts help you analyze spending trends and make smarter financial decisions.</p>
            </div>
            </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-us">
            <h2>Why Choose ExpenseTracker?</h2>
            <div className="why-grid">
            <div className="why-card">
                <h4>🚀 Intuitive & Fast</h4>
                <p>Built for ease of use with a clean, responsive design that works on any device.</p>
            </div>
            <div className="why-card">
                <h4>🌐 Cloud Sync</h4>
                <p>Access your financial data anywhere, anytime with secure cloud backup support.</p>
            </div>
            <div className="why-card">
                <h4>🧠 AI Insights (Coming Soon)</h4>
                <p>Smart recommendations to optimize your spending and achieve savings goals faster.</p>
            </div>
            </div>
        </section>

        {/* Developer Info */}
        <section className="developer-info">
            <h2>Meet the Developer 👨‍💻</h2>
            <div className="dev-card">
            <img
                src="./../../../public/media/profile.jpg"
                alt="Developer avatar"
            />
            <div>
                <h3>Yagavolla Teja</h3>
                <p>
                A passionate Front-End Developer and Full-Stack learner dedicated to 
                building efficient, responsive, and elegant web experiences. 
                Focused on creating apps that solve real-world problems through 
                simplicity and smart design.
                </p>
            </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="moreinfo-footer">
            <p>© {new Date().getFullYear()} ExpenseTracker | Designed with ❤️ by Teja</p>
        </footer>
        </div>
    );
};

export default MoreInfo;
