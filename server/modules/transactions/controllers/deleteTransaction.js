// controllers/transaction/deleteTransaction.js
const mongoose = require("mongoose");

const deleteTransaction = async (req, res) => {
    try {
        const Transaction = mongoose.model("transations"); // adjust name if needed
        const User = mongoose.model("users");

        const userId = req.user?._id;
        const txnId = req.params.id;

        // 1) validate user
        if (!userId) return res.status(401).json({ status: "failed", message: "Unauthorized" });

        // 2) validate txnId format before hitting DB
        if (!txnId || !mongoose.Types.ObjectId.isValid(txnId)) {
        return res.status(400).json({ status: "failed", message: "Invalid transaction id" });
        }

        // 3) find transaction that belongs to user
        const txn = await Transaction.findOne({ _id: txnId, user_id: userId });
        if (!txn) return res.status(404).json({ status: "failed", message: "Transaction not found" });

        // 4) update user's balance (reverse the transaction)
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ status: "failed", message: "User not found" });

        if (txn.type === "income") user.balance = (user.balance || 0) - txn.amount;
        else user.balance = (user.balance || 0) + txn.amount;

        // 5) delete transaction and save user
        await txn.deleteOne();
        await user.save();

        return res.status(200).json({
        status: "success",
        message: "Transaction deleted and balance updated",
        newBalance: user.balance,
        deletedId: txnId,
        });
    } catch (err) {
        console.error("deleteTransaction error:", err);
        return res.status(500).json({ status: "error", message: "Server error" });
    }
};

module.exports = deleteTransaction;
