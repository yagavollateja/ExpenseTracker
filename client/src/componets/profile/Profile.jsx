import React from "react";
import "./Profile.css";
import Cookies from "js-cookie";

const Profile = ({ handleToggle, user }) => {
    const handleLogout = async () => {
        try {
        const token = Cookies.get("jwt_token");

        if (!token) {
            alert("⚠️ No token found, already logged out!");
            window.location.href = "/login";
            return;
        }

        const response = await fetch("http://localhost:8000/api/users/logout", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            Cookies.remove("jwt_token", { path: "/" });
            localStorage.removeItem("user");
            alert("✅ Logout successful!");
            window.location.href = "/login";
        } else {
            alert("❌ " + (data.message || "Logout failed!"));
        }
        } catch (error) {
        console.error("Logout error:", error);
        alert("⚠️ An error occurred while logging out.");
        }
    };

    return (
        <div className="profile-container">
        <div className="profile-card">
            <button className="close-btn" onClick={handleToggle}>x</button>

            <div className="profile-header">
            <img
                src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt="User Avatar"
                className="profile-avatar"
            />
            <h2 className="profile-name">{user?.name || "User"}</h2>
            </div>

            <div className="profile-details">
            <div className="detail-item">
                <span>Email:</span>
                <p>{user?.email || "Not available"}</p>
            </div>
            <div className="detail-item">
                <span>Joined:</span>
                <p>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</p>
            </div>
            </div>

            <div className="profile-actions">
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </div>
        </div>
        </div>
    );
};

export default Profile;
