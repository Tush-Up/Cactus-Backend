const mongoose = require("mongoose");

const walletSchema = mongoose.Schema(
  {
    balance: { type: Number, default: 0 },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const Wallet = mongoose.model('Wallet', walletSchema)
module.exports = Wallet