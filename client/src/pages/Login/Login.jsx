import React, { useState,useEffect } from "react";
import Back from "./../../componets/Back";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// import "./Auth.css";
import "./Login.css";
const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const CookieCheck = () => {
        const navigate = useNavigate();

        useEffect(() => {
            const token = Cookies.get("jwt_token"); // ✅ Proper way to read

            if (!token) { // ✅ Works if token is null or undefined
            navigate("/login");
            } else {
            navigate("/dashboard");
            }
        }, [navigate]);
    };
    CookieCheck();
    const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("https://expensetracker-o1xo.onrender.com/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (response.ok && data.token) {
        // ✅ Save the JWT in cookies
        Cookies.set("jwt_token", data.token, { expires: 7, path: "/" });
        // const token = Cookies.get("jwt_token");
        alert("✅ Login successful!");
        window.location.href = "/dashboard";
        } else {
        alert("❌ " + (data.message || "Invalid email or password"));
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("⚠️ Error connecting to server: " + error.message);
    }
    };
    return (
        <div className="auth-container">
        <Back className="Back"/>
        <div className="auth-card">
            
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-subtitle">Log in to continue tracking your expenses</p>

            <form onSubmit={handleLogin} className="auth-form">
            <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={credentials.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
            />

            <button type="submit" onClick={handleLogin} className="btn-primary full-width">
                Login
            </button>
            </form>

            <p className="auth-switch">
            Don’t have an account? <a href="/register">Register</a>
            </p>
        </div>
        </div>
    );
};

export default Login;
