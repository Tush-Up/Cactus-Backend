
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
    claimOne,
    userOne,
    userOneToken,
    setUpDatabase
} = require('./fixtures/db')

beforeEach(setUpDatabase)

describe("All test cases for premium route", () => {
    test("should create a new premium", async() => {
        
        const response = await request(app)
            .get('/handle-flutterwave-payment').query({ transaction_id: '3290545'})
            .send()
            console.log(response.body)
    })
}) 