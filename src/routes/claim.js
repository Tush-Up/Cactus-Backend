const express = require('express')
const Claim = require('../models/claim/claim')
const Auth = require('../routes/PrivateRoutes')
const { claimFormValidation } = require("../models/validation");

const router = new express.Router()


router.post('/users/claim', Auth, async (req, res) => {
    //Validate user data
    const { error } = claimFormValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const {
        previousPosition,
        companyName,
        companyEmail,
        incidentDate,
        incidentDescription,
        witnessName,
        witnessPhone,
        witnessEmail
    } = req.body
    try {
        //check if user already filed a claim
        const userClaim = await Claim.findOne({id: req.user._id})
        if(userClaim) return res.status(400).send({error: "You already filed a claim"})
        //file anew claim if not
        const claim = new Claim({
            owner: req.user._id,
            previousPosition,
            companyName,
            companyEmail,
            incident: {
                incidentDate,
                incidentDescription,
                witness: {
                    witnessName,
                    witnessPhone,
                    witnessEmail,
                }
            }
        })
        await claim.save()
        res.status(201).send(claim)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//user claim

router.get('/users/claim', Auth, async(req, res) => {
    try {
        const claim = await Claim.findOne({owner: req.user._id})
        if(!claim) return res.status(404).send({error: 'You have not filed any claims'})
        res.send(claim)
    } catch (error) {
        res.status(400).send({ error: error.message})
    }
})
module.exports = router