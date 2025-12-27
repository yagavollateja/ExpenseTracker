const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const jwtManager = require("./../../../managers/jwt_manger");
const login = async(req,res)=>{
    try{
        const usersModel = mongoose.model("users");
        const {email,password} = req.body;

        const getUser = await usersModel.findOne({
            email:email,
        })
        if(!getUser) throw "This email does not exist in the system";
        const comparePassword = await bcrypt.compare(password,getUser.password);

        if(!comparePassword) throw "The email and password is do not Match";
        //this sign() method is used for create a vertual id for access data
        const token = jwtManager(getUser);
        res.status(200).json({
            status:"success",
            message:"User Logged in Successfullly",
            token,
            getUser,
        });
    }catch(error){
            res.status(400).json({
            status:"Unsuccess",
            message:"User Logged in UnSuccessfullly"
        });
    }
}
module.exports = login;