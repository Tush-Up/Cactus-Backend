const express = require('express')
const path = require('path')
const walletRouter = require('./routes/wallet')
require('dotenv').config({ path: path.resolve(__dirname, '../config/dev.env')})
require('./db/mongoose')

const app = express()

app.use(express.json())
app.use(walletRouter)


app.get('/', (req, res) => {
    res.send({message: "hello there"})
})

app.get("/pay", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
  });

module.exports = app

