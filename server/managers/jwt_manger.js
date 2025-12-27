// const jsonwebtoken = require("jsonwebtoken");

// const jwtManager = (user)=>{
//     const acceesToken = jsonwebtoken.sign(
//         {
//             _id:user.id,
//             name:user.name,
//         },
//         procees.env.jsw_salt;
//     )
//     return acceesToken;
// };
// module.exports = jwtManager;
const jwt = require("jsonwebtoken");

const jwtManager = (user) => {
    const accessToken = jwt.sign(
    {
        _id: user._id,
        name: user.name,
    },
    process.env.JWT_SALT, // make sure this exists in your .env file
    { expiresIn: "1d" }   // optional expiry
    );
    return accessToken;
};

module.exports = jwtManager;
