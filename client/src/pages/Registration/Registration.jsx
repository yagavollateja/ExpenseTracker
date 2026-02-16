import React, { useState } from "react";
import Back from "./../../componets/Back"
import "./Registration.css";
const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password:"",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("https://expensetracker-o1xo.onrender.com/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
            alert(`✅ Registration Successful, ${formData.name}`);
            window.location.href = "/login";
        } else {
            alert(`❌ ${data.message || "Registration failed mail is alredy registered"}`);
        }

    } catch (error) {
        console.error("Error:", error);
        alert(`⚠️ Error connecting to server: ${error.message}`);
    }
};
    return (
        <div className="auth-container">
        <Back className="BackTo"/>
        <div className="auth-card">
            
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Join ExpenseTracker and manage your finances smartly</p>

            <form onSubmit={handleRegister} className="auth-form">
            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="confirm_password"
                placeholder="Confirm Password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
            />
            <button type="submit" onClick={handleRegister} className="btn-primary full-width">
                Register
            </button>
            </form>

            <p className="auth-switch">
            Already have an account? <a href="/login">Login</a>
            </p>
        </div>
        </div>
    );
};

export default Register;
