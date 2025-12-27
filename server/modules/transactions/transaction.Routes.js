const express = require("express");
const auth = require("../../middleware/auth");
const addIncome = require("../transactions/controllers/addIncome");
const addExpense = require("../transactions/controllers/addExpense");
const getTransactions = require("../transactions/controllers/getTransactions");
const deleteTransaction = require("../transactions/controllers/deleteTransaction")
const transactionRoutes = express.Router();

transactionRoutes.use(auth);

transactionRoutes.post("/addIncome",addIncome);
transactionRoutes.post("/addExpense",addExpense);
transactionRoutes.get("/",getTransactions);
transactionRoutes.delete("/:id", deleteTransaction);
module.exports = transactionRoutes;