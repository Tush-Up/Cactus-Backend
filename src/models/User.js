const { boolean } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
    min: 6,
    max: 1024,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 8,
  },
  repeatPassword: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
    max: 13,
    min: 11,
  },
  bankName: {
    type: String,
    required: true,
    min: 3,
    max: 1024,
  },
  accountNumber: {
    type: String,
    required: true,
    min: 10,
    max: 15,
  },
  emailtoken: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
