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
    min: 8,
  },
  salary: { 
    type: Number,
    required: true,
    min: 30000
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
    min: 9,
    max: 15,
  },
  emailtoken: {
    type: String,
  },
  resetPasswordToken : {
    type: String
  },
  resetPasswordTokenExpiry : {
    type: Date
  },
  isVerified: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  claim: {
    type: String,
    enum: ["No claims", "Pending", "Approved", "Declined"],
    default: "No claims"
  }
});

//Hide private data when sending user to client
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.repeatPassword
  delete userObject.emailtoken
  delete userObject.resetPasswordToken
  delete userObject.resetPasswordTokenExpiry

  return userObject
}
const User = mongoose.model("User", userSchema);
module.exports = User;
