const logout = (req, res) => {
    res.clearCookie("jwt_token"); // if you stored the JWT in a cookie on the server
    res.status(200).json({ message: "Logout successful" });
};
module.exports=logout;