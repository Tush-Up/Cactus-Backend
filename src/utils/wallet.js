const Wallet = require('../models/wallet/wallet');
const WalletTransaction = require('../models/wallet/wallet_transaction');
const Transaction = require('../models/wallet/transaction');

// Validating User wallet
const validateUserWallet = async (owner) => {
    try {
      // check if user have a wallet, else create wallet
      const userWallet = await Wallet.findOne({ owner });
  
      // If user wallet doesn't exist, create a new one
      if (!userWallet) {
        // create wallet
        const wallet = await new Wallet(owner);
        return wallet;
      }
      return userWallet;
    } catch (error) {
      console.log(error);
    }
  };
  
  // Create Wallet Transaction
  const createWalletTransaction = async (owner, status, currency, amount) => {
    try {
      // create wallet transaction
      const walletTransaction = await WalletTransaction.create({
        amount,
        owner,
        isInflow: true,
        currency,
        status,
      });
      return walletTransaction;
    } catch (error) {
      console.log(error);
    }
  };
  
  // Create Transaction
  const createTransaction = async (
    owner,
    id,
    status,
    currency,
    amount,
    customer
  ) => {
    try {
      // create transaction
      const transaction = await Transaction.create({
        owner,
        transactionId: id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone_number,
        amount,
        currency,
        paymentStatus: status,
        paymentGateway: "flutterwave",
      });
      return transaction;
    } catch (error) {
      console.log(error);
    }
  };
  
  // Update wallet 
  const updateWallet = async (owner, amount) => {
    try {
      // update wallet
      const wallet = await Wallet.findOneAndUpdate(
        { owner },
        { $inc: { balance: amount } },
        { new: true }
      );
      return wallet;
    } catch (error) {
      console.log(error);
    }
  };

  module.exports = {
      validateUserWallet,
      createWalletTransaction,
      createTransaction,
      updateWallet
  }