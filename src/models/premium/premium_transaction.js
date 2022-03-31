const mongoose = require("mongoose");

const premiumTransactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, default: 0 },

    owner: {
      type: String,
      ref: "User",
      required: true,
    },

    isInflow: { type: Boolean },

    paymentMethod: { type: String, default: "flutterwave" },

    currency: {
      type: String,
      required: [true, "currency is required"],
      enum: ["NGN", "USD", "EUR", "GBP"],
    },

    status: {
      type: String,
      required: [true, "payment status is required"],
      enum: ["successful", "pending", "failed"],
    },
  },
  { timestamp: true }
);

const PremiumTransaction = mongoose.model("PremiumTransaction", premiumTransactionSchema);

module.exports = PremiumTransaction;