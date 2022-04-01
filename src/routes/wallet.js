const express = require('express')
const Auth = require('./PrivateRoutes')
const User = require('../models/User')
const Wallet = require('../models/wallet/wallet')
const WalletTransaction = require('../models/wallet/wallet_transaction')

const router = new express.Router()

//credit user wallet
router.post('/wallet/credit', Auth, async (req, res) => {
    const { amount } = req.body
    try {
        const user = await User.findOne({ _id: req.user._id })
        if (!user) {
            return res.status(404).send({ error: "User not found" })
        }
        if (user.claim !== "Approved") {
            return res.status(400).send({ error: 'user does not have any approved claims' })
        }
        //fetch user wallet from db
        const wallet = await Wallet.findOne({ owner: user._id })
        wallet.balance += amount
        await wallet.save()
        //create wallet transaction
        await WalletTransaction.create({
            owner: user._id,
            isOutflow: false,
            amount,
            paymentMethod: 'Admin Credit',
            status: "successful"
        })
        res.status(201).send({ wallet })
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }

})

//get wallet balance
router.get('/wallet/balance', Auth, async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ owner: req.user._id })
        res.send({ Wallet_balance: wallet.balance })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})


//fetch inflow wallet transactions?.

router.get('/wallet/transactions/inflow', Auth, async (req, res) => {
    const status = req.query.status
    try {
        if (status) {
            const allowedStatus = ['successful', 'pending', 'failed']
            const isValidStatus = allowedStatus.includes(status)
            if (!isValidStatus) {
                return res.status(400).send("Invalid status")
            }
            const WalletTransactions = await WalletTransaction.find({ owner: req.user._id, status, isOutflow:false })
          return  res.send(WalletTransactions)
        }
        const WalletTransactions = await WalletTransaction.find({ owner: req.user._id, isOutflow:false })
        res.send({ Transactions: WalletTransactions })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

//fetch outflow wallet transactions?.

router.get('/wallet/transactions/outflow', Auth, async (req, res) => {
    const status = req.query.status
    try {
        if (status) {
            const allowedStatus = ['successful', 'pending', 'failed']
            const isValidStatus = allowedStatus.includes(status)
            if (!isValidStatus) {
                return res.status(400).send("Invalid status")
            }
            const WalletTransactions = await WalletTransaction.find({ owner: req.user._id, status, isOutflow:true })
          return  res.send(WalletTransactions)
        }
        const WalletTransactions = await WalletTransaction.find({ owner: req.user._id, isOutflow:true })
        res.send({ Transactions: WalletTransactions })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

//withdraw from wallet
router.post('/wallet/withdraw', Auth, async (req, res) => {
    const { amount } = req.body
    try {
        const wallet = await Wallet.findOne({ owner: req.user._id })
        //check if user has enough to withdraw
        if (amount > wallet.balance) {
            return res.status(400).send({ message: "Not enough funds to withdraw" })
        }
        wallet.balance -= amount
        await wallet.save()
        //create wallet transaction
        await WalletTransaction.create({
            owner: req.user._id,
            isOutflow: true,
            amount,
            status: "pending"
        })
        res.status(201).send({ wallet })

    } catch (error) {
        console.log(error)
        res.status(400).send({ error: error.message })
    }
})

module.exports = router