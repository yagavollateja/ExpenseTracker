require("express-async-errors");
const express = require("express");
const mongoose = require('mongoose');
const errorHandler = require("./handlers/errorHandler");
const userRoutes = require("./modules/users/users.routes");
const transactionRoutes = require("./modules/transactions/transaction.Routes");
const cors = require("cors");

const app = express();
require("dotenv").config();
mongoose.connect(process.env.mongo_connection,{})
.then(() => {
    console.log("Connection to mongodb succuessfully!");
}).catch(() => {
    console.log("Connection to mangodb failed!");
});
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // your React (Vite) frontend
    credentials: true, // if using cookies/JWT
}));
//models initializations 
require("./models/users.model");
require("./models/transations.model");

//Routes...
app.use("/api/users",userRoutes);
app.use("/api/transactions",transactionRoutes);
//end of all routes....
app.use(errorHandler);
app.listen(8000,()=>{
    console.log("Server is started successfully");
})
//npm install nodemailer-for sending mails-mailtrap.com website