const { describe } = require('@hapi/joi/lib/base')
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
test('Should create a new claim for a user', async () => {
    const response = await request(app)
        .post('/users/claim')
        .set('auth-token', userOneToken)
        .send({
            previousPosition: "managing director",
            companyName: "GT Bank",
            companyEmail: "b@g.com",
            incidentDate: '22/12/1234',
            incidentDescription: "I have no idea",
            witnessName: "Bassit owolabi",
            witnessPhone: "08234323454",
            witnessEmail: "c@f.com"
        }).expect(201)
    //assert that claim was created properly
    expect(response.body).toMatchObject({
        owner: userOneId,
        previousPosition: "managing director",
        companyName: "GT Bank",
        companyEmail: "b@g.com",
        incident: {
            incidentDate: '22/12/1234',
            incidentDescription: "I have no idea",
            witness: {
                witnessName: "Bassit owolabi",
                witnessPhone: "08234323454",
                witnessEmail: "c@f.com"
            }
        }
        })
})
