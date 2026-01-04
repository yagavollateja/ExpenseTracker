const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // 1️⃣ Get token from cookie OR header
    const cookieToken = req.cookies?.token || req.cookies?.jwt_token;

    const authHeader = req.headers.authorization;
    const headerToken =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    const token = cookieToken || headerToken;

    console.log(
      "DEBUG token source - cookie:",
      !!cookieToken,
      "header:",
      !!headerToken
    );

    // 2️⃣ Token missing
    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized: token missing",
      });
    }

    // 3️⃣ Secret missing (deployment issue)
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET missing in environment");
      return res.status(500).json({
        status: "error",
        message: "Server misconfiguration",
      });
    }

    // 4️⃣ Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("JWT verify error:", err.message);

      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          status: "failed",
          message: "Session expired. Please login again.",
        });
      }

      return res.status(401).json({
        status: "failed",
        message: "Invalid token",
      });
    }

    // 5️⃣ Attach user & continue
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Auth middleware unexpected error:", err);
    return res.status(401).json({
      status: "failed",
      message: "Unauthorized",
    });
  }
};
