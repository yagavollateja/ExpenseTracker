const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jsonwebtoken = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const register = async(req,res) =>{
    const usersModel = mongoose.model("users");
    const {name,email,password,confirm_password} = req.body;
    //validations..
    if(!email) throw "Email must be provided!";
    if(!password) throw "Password must be provided!";
    if(password.length<5) throw "Password must be at least 5 characters long.";
    if(!name) throw "Name is required";
    if(password !== confirm_password) throw "password and confirm password doesnot match!";

    const getDuplicateEmail = await usersModel.findOne({
        email:email,
    });
    if(getDuplicateEmail) throw "This email is already exist";
    try {
        const createdUser = await usersModel.create({
            name:name,
            email:email,
            password:await bcrypt.hash(password,3),
            balance:0,
        });
        res.status(200).json({
            status:"success"
        })
    } catch (error) {
        res.status(200).json({
        status:"User registered successfully!"+error,
    });
    }
}

module.exports = register;

