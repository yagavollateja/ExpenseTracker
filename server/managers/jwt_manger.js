const jwt = require("jsonwebtoken");

const jwtManager = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const accessToken = jwt.sign(
    {
      _id: user._id,
      name: user.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d", // ✅ token valid for 1 day
    }
  );

  return accessToken;
};

module.exports = jwtManager;

