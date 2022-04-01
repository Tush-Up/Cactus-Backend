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
        const user = await User.findOne({_id: req.user._id})
        if( !user ) {
            return res.status(404).send({ error: "User not found"})
        }
        if (user.claim !== "Approved") {
            return res.status(400).send({error: 'user does not have any approved claims'})
        }
        //fetch user wallet from db
        const wallet = await Wallet.findOne({ owner: user._id })
        wallet.balance += amount
        await wallet.save()
        //create wallet transaction
        await WalletTransaction.create({
            owner: user._id,
            amount,
            status:"successful"
        })
        res.status(201).send({ wallet })
    }
    catch (error) {
        res.status(400).send({ error: error.message })
    }

})

//get wallet balance
router.get('/wallet/balance', Auth, async(req, res) => {
    try {
        const wallet = await Wallet.findOne({ owner: req.user._id})
        res.send({ Wallet_balance: wallet.balance})
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})
//withdraw from wallet

router.post('/')

module.exports = router