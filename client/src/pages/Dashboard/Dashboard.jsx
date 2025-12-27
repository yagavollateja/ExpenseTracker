import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./Dashboard.css";
import Profile from "../../componets/profile/Profile";
const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState({
        remarks: "",
        amount: "",
        type: "",
    });
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(true);

    // ✅ Get token from cookie
    const token = Cookies.get("jwt_token");
    if(!token)window.location.href="/login";
    // ✅ Fetch dashboard data
    useEffect(() => {
        const fetchDashboard = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/users/dashboard",
            {
                method: "GET",
                credentials: "include",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                },
            }
            );

            if (response.status === 401) {
            alert("Session expired or unauthorized. Please login again.");
            Cookies.remove("jwt_token");
            window.location.href = "/login";
            return;
            }

            const data = await response.json();

            if (response.ok) {
            setUser(data.data);
            setTransactions(data.transactions || []);
            } else {
            alert(data.message || "Failed to load dashboard data");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            alert("Error connecting to server.");
        } finally {
            setLoading(false);
        }
        };

        if (token) fetchDashboard();
        else {
        alert("Please login first.");
        window.location.href = "/login";
        }
    }, [token]);

    // ✅ Handle input change (fixes “type cannot change” issue)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Add transaction without reloading the page
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.amount || !formData.remarks || !formData.type) {
        alert("Please fill all fields");
        return;
        }

        try {
        const endpoint =
            formData.type === "income"
            ? "http://localhost:8000/api/transactions/addIncome"
            : "http://localhost:8000/api/transactions/addExpense";

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
            amount: formData.amount,
            remarks: formData.remarks,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("✅ Transaction added successfully!");
            // Add new transaction locally (avoid reload)
            setTransactions((prev) => [
            {
                _id: Date.now(),
                remarks: formData.remarks,
                amount: parseFloat(formData.amount),
                transaction_type: formData.type,
            },
            ...prev,
            ]);
            setFormData({ remarks: "", amount: "", type: "" });
        } else {
            alert(data.message || "Transaction failed");
        }
        } catch (error) {
        console.error("Transaction error:", error);
        alert("Error connecting to server.");
        }
    };
    // inside Dashboard component
    const handleDelete = async (txnId) => {
    if (!txnId) return alert("Invalid id");

    const confirmDelete = window.confirm("Delete this transaction permanently?");
    if (!confirmDelete) return;

    try {
        const res = await fetch(`http://localhost:8000/api/transactions/${txnId}`, {
        method: "DELETE",
        credentials: "include", // send cookie if you're using cookie auth
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
        alert(data.message || "Delete failed");
        return;
        }

        // remove from local state
        setTransactions(prev => prev.filter(t => (t._id || t.id) !== txnId));
        // update balance/UI if data.newBalance present
        if (data.newBalance !== undefined) {
        // update your user state or display
        }

        alert("Transaction deleted");
    } catch (err) {
        console.error("Delete error:", err);
        alert("Server error while deleting");
    }
    };


    const handleToggle = () => setToggle((prev) => !prev);

    if (loading) return <div className="loading">Loading dashboard...</div>;

    const totalIncome = transactions
        .filter((t) => t.transaction_type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpense = transactions
        .filter((t) => t.transaction_type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = totalIncome - totalExpense;

    return (
        <div className="dashboard-container">
        {/* Navbar */}
        <nav className="dash-nav">
            <h2 className="dash-logo">
            💰 Expense<span>Tracker</span>
            </h2>
            <button className="profile-btn" onClick={handleToggle}>
            <i className="fa-regular fa-user"></i>
            </button>
        </nav>

        {toggle && <Profile handleToggle={handleToggle} user={user} />}

        {/* Main Content */}
        <div className="dashboard">
            {/* Summary Cards */}
            <div className="summary-cards">
            <div className="card balance">
                <h3>Balance</h3>
                <p>₹{balance.toFixed(2)}</p>
            </div>
            <div className="card income">
                <h3>Income</h3>
                <p>₹{totalIncome.toFixed(2)}</p>
            </div>
            <div className="card expense">
                <h3>Expense</h3>
                <p>₹{totalExpense.toFixed(2)}</p>
            </div>
            </div>

            {/* Transaction Form */}
            <div className="transaction-form">
            <h2>Add Transaction</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="remarks"
                placeholder="Enter remarks (e.g. Salary, Food)"
                value={formData.remarks}
                onChange={handleChange}
                required
                />
                <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                required
                />
                <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                >
                <option value="">Select Type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                </select>
                <button type="submit" className="btn-primary full-width">
                Add Transaction
                </button>
            </form>
            </div>

            {/* Transactions List */}
            <div className="transactions">
            <h2>Recent Transactions</h2>
            {transactions.length === 0 ? (
                <p className="no-data">No transactions yet.</p>
            ) : (
                <ul>
                {transactions.map((t) => (
                    <li
                    key={t._id}
                    className={
                        t.transaction_type === "income"
                        ? "income-item"
                        : "expense-item"
                    }
                    >
                    <span>{t.remarks}</span>
                    <span className="d-flex align-items-center justify-content-center gap-2">
                        {t.transaction_type === "income" ? "+" : "-"}₹
                        {t.amount.toFixed(2)}
                        <button className="btn bg-danger text-white h-100" onClick={() => handleDelete(t._id || t.id)}>delete</button>
                    </span>
                    </li>
                ))}
                </ul>
            )}
            </div>
        </div>

        <footer className="dash-footer">
            <p>
            © {new Date().getFullYear()} ExpenseTracker | Built by Teja 💚
            </p>
        </footer>
        </div>
    );
};

export default Dashboard;
