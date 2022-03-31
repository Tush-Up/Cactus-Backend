const { string } = require("joi");
const mongoose = require("mongoose");

const OTPVerificationSchema = new mongoose.Schema({
  userId: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date,
});

module.exports = mongoose.model("OTPVerification", OTPVerificationSchema);
