// src/api/fetchData.js
import Cookies from "js-cookie";

export const fetchUserAndTransactions = async () => {
  const token = Cookies.get("jwt_token");

  if (!token) throw new Error("⚠️ No token found. Please login again.");

  const [userRes, transactionsRes] = await Promise.all([
    fetch("http://localhost:8000/api/users/me", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }),
    fetch("http://localhost:8000/api/transactions", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }),
  ]);

  const userData = await userRes.json();
  const transactionData = await transactionsRes.json();

  if (!userRes.ok) throw new Error(userData.message || "Failed to fetch user");
  if (!transactionsRes.ok) throw new Error(transactionData.message || "Failed to fetch transactions");

  return { userData, transactionData };
};
