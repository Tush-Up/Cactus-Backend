
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

const owner = userOneId
const status = 'successful'
const currency = "NGN"
const amount = 3000
const id = 23456
const customer = {
    name: "Bassit",
    email: "b@g.com",
    phone_number: "08143351712"
}
describe("all test cases related to premiun utils", () => {

    test("Should validate user premiums", async () => {
        const data = await validateUserPremium(userOneId)
        expect(data).toMatchObject({
            owner: userOneId,
            totalPaid: 0
        })
    })

    test("should create premiun transaction for user", async () => {

        const data = await createPremiumTransaction(owner, status, currency, amount)
        expect(data).toMatchObject({
            owner,
            status,
            currency,
            amount,
            isInflow: true,
            paymentMethod: "flutterwave"
        })
    })

    test('Should create transaction', async () => {

        const data = await createTransaction(
            owner,
            id,
            status,
            currency,
            amount,
            customer)
            expect(data).toMatchObject({
                owner,
              transactionId: id,
              name:customer.name,
              email: customer.email,
              phone: customer.phone_number,
              amount,
              currency,
              paymentStatus:"successful",
              paymentGateway:"flutterwave"
            })
    })

    test('Should update premium', async() => {
        await validateUserPremium(userOneId)
        const data = await updatePremium(userOneId, amount)
        expect(data.totalPaid).toBe(amount)

    })
})


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



