const mongoose = require("mongoose");

const walletSchema = mongoose.Schema(
  {
    balance: { type: Number, default: 0, min: 0 },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    }
  },
  { timestamps: true }
);

const Wallet = mongoose.model('Wallet', walletSchema)
module.exports = Wallet