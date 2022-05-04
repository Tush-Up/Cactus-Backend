
const axios = require('axios')
const User = require('../src/models/User')
const Premiums = require('../src/models/premium/premiums')
const Transaction = require('../src/models/premium/transaction')
const {
  validateUserPremium,
  createPremiumTransaction,
  createTransaction,
  updatePremium
} = require('../src/utils/premium')
const request = require('supertest')
const app = require('../src/app')
const Claim = require('../src/models/claim/claim')
const {
    userOneId,
    userTwoId,
    claimOne,
    userOne,
    userOneToken,
    setUpDatabase
} = require('./fixtures/db')

beforeEach(setUpDatabase)

describe("All test cases for premium route", () => {
    test("should create a new premium", async() => {
             await request(app)
            .get('/handle-flutterwave-payment').query({ transaction_id: '3290545'})
            .send().expect(200)
    })
    test('Should fail if transaction already exist', async() => {
        await Transaction.create({
            owner:userTwoId,
              transactionId:3290545,
              name:"Joy",
              email: "okwudirejoy@gmail.com",
              phone: "08143351712",
              amount: 3000,
              currency:"NGN",
              paymentStatus:"successful",
              paymentGateway:"flutterwave"
        })
        await request(app)
        .get('/handle-flutterwave-payment').query({ transaction_id: '3290545'})
            .send().expect(409)
    })
}) 

