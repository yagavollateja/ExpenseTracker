// const jsonwebtoken = require("jsonwebtoken");
// const auth = (req,res,next)=>{
    
//     try{
//         const accessToken = req.headers.authorization.replace("Bearer ","");
//         const JWTvefication = jsonwebtoken.verify(accessToken,process.env.jwt_salt);
//         console.log(JWTvefication);
//         req.user = JWTvefication;
//     }catch(e){
//         res.status(401).json({
//             status:"failed",
//             message:"Unauthorized"
//         });
//         return;
//     }
//     next();
// }
// module.exports = auth;
// middleware/auth.js
// middleware/auth.js (dev debug version)
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const cookieToken = req.cookies?.jwt_token || req.cookies?.token;
    const header = req.headers?.authorization;
    const headerToken = header && header.startsWith("Bearer ") ? header.split(" ")[1] : null;
    const token = cookieToken || headerToken;

    console.log("DEBUG token source - cookie:", cookieToken ? true : false, "header:", headerToken ? true : false);

    if (!token) {
      return res.status(401).json({ status: "failed", message: "Unauthorized: token missing" });
    }

    const secret = process.env.JWT_SECRET || process.env.jwt_salt;
    if (!secret) {
      console.error("JWT secret missing in env");
      return res.status(500).json({ status: "error", message: "Server misconfiguration" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      console.error("JWT verify error:", err.message);
      // send exact reason during dev
      return res.status(401).json({ status: "failed", message: "Invalid or expired token: " + err.message });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Auth middleware unexpected error:", err);
    return res.status(401).json({ status: "failed", message: "Unauthorized" });
  }
};
