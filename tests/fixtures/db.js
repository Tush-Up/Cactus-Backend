const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Claim = require('../../src/models/claim/claim')
const Premium = require('../../src/models/premium/premiums')
const Wallet = require('../../src/models/wallet/wallet')
const User = require('../../src/models/user')



const userOneId = new mongoose.Types.ObjectId()
const userTwoId = new mongoose.Types.ObjectId()


const userOne = {
    _id: userOneId,
    name: "katy",
    email: "k@a.com",
    password: "23454345",
    phone:"08143351712",
    salary:"5000000",
    bankName: "GT Bank",
    accountNumber: "0221234563",
    isVerified: true
}

const userOneToken = jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
const setUpDatabase = async () => {
    await User.deleteMany()
    await Claim.deleteMany()
    await new User(userOne).save()
}

module.exports = {
    userOneId,
    userOne,
    setUpDatabase,
    userOneToken
}