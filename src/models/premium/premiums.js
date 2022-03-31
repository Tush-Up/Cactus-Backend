const mongoose = require("mongoose");

const premiumSchema = mongoose.Schema(
  {
    totalPaid: { type: Number, default: 0 },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    }
  },
  { timestamps: true }
);

const Premiums = mongoose.model('Premiums', premiumSchema)
module.exports = Premiums