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

describe("All test cases for claims", () => {
    test('Should create a new claim for a user', async () => {
        const response = await request(app)
            .post('/users/claim')
            .set('auth-token', userOneToken)
            .send(claimOne).expect(201)
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
    
    test('Should fail if user already filed a claim', async () => {
        await Claim.create({
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
        await request(app)
            .post('/users/claim')
            .set('auth-token', userOneToken)
            .send(claimOne).expect(400)
    })
    
    test('should fetch a user claim', async () => {
        await Claim.create({
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
        const response = await request(app)
            .get('/users/claim')
            .set('auth-token', userOneToken)
            .send().expect(200)
    })
    
    test('Should fail if a user doesn\'t have a claim', async() => {
        await request(app)
        .get('/users/claim')
        .set('auth-token', userOneToken)
        .send().expect(404)
    })
    
})
