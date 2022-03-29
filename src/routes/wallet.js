const express = require('express')
const { 
    validateUserWallet,
    createWalletTransaction, 
    createTransaction, 
    updateWallet 
} = require('../utils/wallet')

const router = express.Router()

router.get("/wallet", async (req, res) => {
    const { transaction_id } = req.query;

    // URL with transaction ID of which will be used to confirm transaction status
    const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;

    // Network call to confirm transaction status
    const response = await axios({
        url,
        method: "get",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `${process.env.FLUTTERWAVE_V3_SECRET_KEY}`,
        },
    });

    const { status, currency, id, amount, customer } = response.data.data;

    // check if customer exist in our database
    const user = await User.findOne({ email: customer.email });

    // check if user have a wallet, else create wallet
    const wallet = await validateUserWallet(user._id);

    // create wallet transaction
    await createWalletTransaction(user._id, status, currency, amount);

    // create transaction
    await createTransaction(user._id, id, status, currency, amount, customer);

    await updateWallet(user._id, amount);

    return res.status(200).json({
        response: "wallet funded successfully",
        data: wallet,
    });
});

module.exports = router