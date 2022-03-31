const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { verifyEmail } = require("../routes/Privatemail");
const { RegisterValidation, loginValidation } = require("../models/validation");

//setup nodemailer
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "CactusinsuranceTeam@gmail.com",
    pass: "Team3tushup"
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.post("/register", async (req, res) => {
  //Validating User data

  const { error } = RegisterValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if the email exists in db
  const emailExists = await User.findOne({
    email: req.body.email,
  });
  if (emailExists) return res.status(400).send("Email already exists!");

  //bcrpyt password hashing
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user(add user to db)
  const {
    name,
    email,
    phone,
    bankName,
    accountNumber,
  } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      repeatPassword: hashPassword,
      emailtoken: crypto.randomBytes(64).toString("hex"),
      phone,
      bankName,
      accountNumber,
      isVerified: false,
    });
    res.status(201).json({ user: user.id, Message: "Please check your email to verify your account to complete registration" });

    // Email contents
    const details = {
      from: "Cactus-insurance@outlook.com",
      to: req.body.email,
      subject: "Cactus -Verify your email",
      html: `<h2> ${user.name}! Thanks for Registering with Cactus.<h2>
                <h4> Please verify your email to continue on our website....<h4>
                <a href="http://${req.headers.host}/users/verify-email?token=${user.emailtoken}" > Click to verify your mail <a>
              
      `,
    };
    // send mail

    transporter.sendMail(details, (error) => {
      if (error) {
        console.log("it has an error");
        console.log(error);
      } else {
        console.log("email sent");
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//verify mail
router.get("/verify-email", async (req, res) => {
  try {
    const token = req.query.token;
    const user = await User.findOne({ emailtoken: token });

    if (user) {
      user.emailtoken = null;
      user.isVerified = true;
      await user.save();
      res.json({
        status: "Verified",
        Message: "Account has been verified",
      });
      //res.redirect("/user/signIn");
      console.log("verified");
    } else {
      // res.redirect("/user/register");
      res.send("Email Verification failed");
    }
  } catch (error) {
    console.log(err);
  }
});

//jwt
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//login
router.post("/signIn", verifyEmail , async (req, res) => {
  //Validate Entered Data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if Email is in db
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password does not exists!");

  //check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid Password");

  // jwt
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header("auth-token", token).send(token);

  //res.send("User Logged In");
  //validates if user is logged in
});

//Reset password
router.post('/reset-password', async (req, res)=> {
  try {
    const token = crypto.randomBytes(32).toString("hex")
    const user = await User.findOne({ email: req.body.email })
    if( !user ) {
      return res.status(404).send({error: "No user with that email"})
    }
    user.resetPasswordToken = token
    user.resetPasswordTokenExpiry = Date.now() + 900000
    await user.save()

    //Send email
    const Emaildetails = {
     from: "Cactus-insurance@outlook.com",
     to: req.body.email,
     subject: "PASSWORD RESET REQUEST",
     html: `<h2> ${user.name}!.<h2>
               <h4> You recently requested for a password request on our website<h4>
               <h4> Click on the link below to proceed. The link expires in 15 minutes. If you did not request this, kindly disregard this email<h4>
               <a href="http://${req.headers.host}/users/reset/${user.resetPasswordToken}" > Click to reset your password <a>`
   };
   // send email 
   transporter.sendMail(Emaildetails, (error) => {
     if (error) {
       console.log(error);
     } else {
       console.log("email sent");
     }
   })
   res.send({ message: 'Password reset instructions have been sent to your email address'})   
  } catch (error) {
    res.status(400).send(error.message)
  }
 
})
//update new Password

router.post('/update-password', async(req, res) => {
  try {
    const newPassword = req.body.password
    const sentToken = req.body.token
    const user = await User.findOne({resetPasswordToken: sentToken, resetPasswordTokenExpiry: {$gt: Date.now()}})
    if(!user) {
      return res.status(422).send({ error: "session expired, reset password aagain"})
    }
    //modify password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt)
    user.password = hashPassword
    user.repeatPassword = hashPassword
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpiry = undefined
    await user.save()
    res.status(200).send({Message: "Password changed successfully"})

  } catch (error) {
    res.status(400).send(error.message)
  }
})
module.exports = router;
