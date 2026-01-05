import React, { useEffect, useState } from "react";

const HomeData = ({setIslogin}) => {
  const [message, setMessage] = useState("");  // Store backend data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);     // Error state

    useEffect(() => {
    // Fetch data from backend using GET
fetch("https://expensetracker-o1xo.onrender.com/home")
    .then(response => {
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
    })
    .then(data => {
    setMessage(data.message); // Extract 'data' field from backend response
    setLoading(false);
    })
    .catch(err => {
    setError(err.message);
    setLoading(false);
    });
}, []);
if (loading) return <p>Loading message...</p>;
if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

return (
<div style={{ textAlign: "center", marginTop: "40px" }}>
    <h2>Backend Message 👇</h2>
    <p style={{ fontSize: "18px", color: "blue" }}>{message}</p>
    <button onClick={setIslogin(true)}>Logout</button>
</div>
);
};

export default HomeData;
