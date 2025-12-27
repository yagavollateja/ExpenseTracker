// const express = require("express");
// const register = require("./controllers/register");
// const login = require("./controllers/login");
// const usersDashboard = require("./controllers/usersDashboard");
// const auth = require("../../middleware/auth");
// const logout = require("./controllers/logout");
// const userRoutes = express.Router();
// //Routes..
// userRoutes.post("/register",register);
// userRoutes.post("/login",login);
// userRoutes.use(auth);
// userRoutes.get("/dashboard",auth,usersDashboard);
// userRoutes.post("/logout",logout);
// module.exports = userRoutes;
const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const usersDashboard = require("./controllers/usersDashboard");
const logout = require("./controllers/logout");
const auth = require("../../middleware/auth");

const userRoutes = express.Router();

// Public routes
userRoutes.post("/register", register);
userRoutes.post("/login", login);

// Protected routes
userRoutes.use(auth);
userRoutes.get("/dashboard", usersDashboard);
userRoutes.post("/logout", logout);

module.exports = userRoutes;
