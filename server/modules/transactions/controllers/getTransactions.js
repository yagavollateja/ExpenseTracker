const mongoose = require("mongoose");
const getTransactions = async(req,res)=>{

    const transactionModel = mongoose.model("transations");

    const transactions = await transactionModel.find({
        user_id:req.user._id,
        ...req.query,
    })
    res.status(200).json({
        status:"success ",
        data:transactions,
    });
}
module.exports = getTransactions;