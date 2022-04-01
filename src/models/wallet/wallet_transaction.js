const mongoose = require("mongoose");

const walletTransactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, default: 0 },

    owner: {
      type: String,
      ref: "User",
      required: true,
    },

    isOutflow: { type: Boolean },

    paymentMethod: { type: String, default: "Bank Transfer" },

    status: {
      type: String,
      required: [true, "payment status is required"],
      enum: ["successful", "pending", "failed"],
    },
  },
  { timestamp: true }
);

const WalletTransaction = mongoose.model("WalletTransaction", walletTransactionSchema);

module.exports = WalletTransaction;