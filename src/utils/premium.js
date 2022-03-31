const Premiums = require('../models/premium/premiums');
const PremiumTransaction = require('../models/premium/premium_transaction');
const Transaction = require('../models/premium/transaction');

// Validating User wallet
const validateUserPremium = async (owner) => {
  
    try {
      // check if user have a wallet, else create wallet
      const userPremium = await Premiums.findOne({ owner });
  
      // If user wallet doesn't exist, create a new one
      if (!userPremium) {
        // create wallet
        const premium = await new Premiums({
          owner
        });
        await premium.save()
        return premium;
      }
      return userPremium;
    } catch (error) {
      console.log(error);
    }
  };
  
  // Create Wallet Transaction
  const createPremiumTransaction = async (owner, status, currency, amount) => {
    try {
      // create wallet transaction
      const premiumTransaction = await PremiumTransaction.create({
        amount,
        owner,
        isInflow: true,
        currency,
        status,
      });
      return premiumTransaction;
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
  
  // Update premium
  const updatePremium = async (owner, amount) => {
    try {
      // update premium
      const premium = await Premiums.findOne( {owner});
      premium.totalPaid += amount;
      await premium.save()
      return premium;
    } catch (error) {
      console.log(error);
    }
  };

  module.exports = {
      validateUserPremium,
      createPremiumTransaction,
      createTransaction,
      updatePremium
  }