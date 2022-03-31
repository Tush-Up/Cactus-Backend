const express = require("express");
const path = require("path");
const cors = require('cors')
const premiumRouter = require("./routes/premium");
const authRoute = require("./routes/auth");
const OTPVerification = require("./models/OTPVerification");
require("dotenv").config({
  path: path.resolve(__dirname, "../config/dev.env"),
});
require("./db/mongoose");

const app = express();

app.use(cors({
  origin: 'https://cactusinsurance.netlify.app/'
}));
app.use(express.json());
app.use(premiumRouter);

app.use("/users", authRoute);

app.get("/", (req, res) => {
  res.send({ message: "hello there" });
});

app.get("/pay", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

module.exports = app;
