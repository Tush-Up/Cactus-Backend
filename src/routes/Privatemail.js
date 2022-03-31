const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user.isVerified) {
      next();
    } else {
      console.log("failed");
      res.send({
          status: "Error",
          message: "Account not Verified, please check your mail"
      })
      
    }
  } catch (error) {
    res.status(400).send("Bad request")
  }
};

module.exports = { verifyEmail };
