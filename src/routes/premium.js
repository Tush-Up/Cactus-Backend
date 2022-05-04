const express = require('express')
const axios = require('axios')
const User = require('../models/User')
const Premiums = require('../models/premium/premiums')
const Transaction = require('../models/premium/transaction')
const Auth = require('./PrivateRoutes')
const {
  validateUserPremium,
  createPremiumTransaction,
  createTransaction,
  updatePremium
} = require('../utils/premium')

const router = express.Router()

router.get("/handle-flutterwave-payment", async (req, res) => {
  const { transaction_id } = req.query;
  // URL with transaction ID of which will be used to confirm transaction status
  const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;
  try {


    // Network call to confirm transaction status
    const response = await axios({
      url,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${process.env.FLUTTERWAVE_V3_SECRET_KEY}`,
      }
    });
    const { status, currency, id, amount, customer } = response.data.data;

    const transaction = await Transaction.findOne({ transactionId: id });

    if (transaction) {
      return res.status(409).send("Transaction Already Exist");
    }

    // check if customer exist in our database
    const user = await User.findOne({ email: customer.email });
    // check if user have a premium, else create premium
    console.log(user)
    const premium = await validateUserPremium(user._id);

    // create premium transaction
    await createPremiumTransaction(user._id, status, currency, amount);

    // create transaction
    await createTransaction(user._id, id, status, currency, amount, customer);

    const updatedPremium = await updatePremium(user._id, amount);

    return res.status(200).json({
      response: "premium paid successfully",
      data: updatedPremium,
    });
  } catch (error) {
    console.log(error)
    res.status(400).send({ Error: error.message })
  }

});

//Get user total premiums paid
router.get("/premium/total_premium_paid", Auth, async (req, res) => {
  try {

    const premium = await Premiums.findOne({ owner: req.user._id });
    // user
    res.status(200).send({ Total_paid_premium: premium.totalPaid });
  } catch (err) {
    console.log(err);
  }
});


module.exports = router