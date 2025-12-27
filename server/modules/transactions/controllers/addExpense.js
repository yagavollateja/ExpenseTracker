const mongoose = require("mongoose");
const validator = require("validator");
const addExpense = async(req,res)=>{
    const usersModel = mongoose.model("users");
    const transactionModel = mongoose.model("transations");
    const{amount,remarks} = req.body;
    if(!amount) throw "Amount is required";
    if(!remarks) throw "Remarks is Required";
    if(remarks.length<5) throw "Remarks must be 5 Characters long";
    if(!validator.isNumeric(amount.toString())) throw "Amount must be number";
    if(amount<0) throw "Amount must not be negative";
    await transactionModel.create({
        user_id:req.user._id,
        amount:amount,
        remarks:remarks,
        transaction_type:"expense",
    });

    await usersModel.updateOne(
        {
            _id:req.user._id,
        },
        {
            $inc:{
                balance:amount*-1,
            },
        },
        {
            runValidators:true,
        }
    );
    res.status(200).json({
        status:"Success",
        message:"Income added successfully"
    })
}
module.exports = addExpense;