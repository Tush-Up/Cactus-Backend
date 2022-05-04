const express = require("express");
const path = require("path");
const cors = require('cors')
const premiumRouter = require("./routes/premium");
const walletRouter = require('./routes/wallet')
const authRoute = require("./routes/auth");
//const User = require("./models/User")
const claimRouter = require('./routes/claim')
const OTPVerification = require("./models/OTPVerification");
// require("dotenv").config({
//   path: path.resolve(__dirname, "../config/dev.env"),
// });
require("./db/mongoose");

const app = express();

app.use(
  cors({
    origin: "*"
  })
);

app.use(express.json());
app.use("/users", authRoute);
app.use(premiumRouter);
app.use(walletRouter)
app.use(claimRouter)


app.get("/", async(req, res) => {
 //await User.updateMany({}, {$set:{salary: 50000}})
  res.send({ message: "hello there" });
});

app.get("/pay", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

module.exports = app;
