const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Claim = require('../../src/models/claim/claim')
const Transaction = require('../../src/models/premium/transaction')
const Premium = require('../../src/models/premium/premiums')
const premiumTransaction = require('../../src/models/premium/premium_transaction')
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
const userTwo = {
    _id: userTwoId,
    name: "Joy",
    email: "okwudirejoy@gmail.com",
    password: "23454345",
    phone:"08143351712",
    salary:"5000000",
    bankName: "GT Bank",
    accountNumber: "0221234563",
    isVerified: true
}
const claimOne = {
    previousPosition: "managing director",
    companyName: "GT Bank",
    companyEmail: "b@g.com",
    incidentDate: '22/12/1234',
    incidentDescription: "I have no idea",
    witnessName: "Bassit owolabi",
    witnessPhone: "08234323454",
    witnessEmail: "c@f.com"
}

const userOneToken = jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
const setUpDatabase = async () => {
    await User.deleteMany()
    await Claim.deleteMany()
    await Transaction.deleteMany()
    await Premium.deleteMany()
    await premiumTransaction.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwo,
    setUpDatabase,
    userOneToken,
    claimOne
}