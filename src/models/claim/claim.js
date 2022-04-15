const mongoose = require('mongoose')

const witnessSchema = new mongoose.Schema({
    witnessName: {
        type: String,
        required: true,
        trim: true,
        min: 5
    },
    witnessPhone: {
        type: String,
        required: true,
        max: 13,
        min: 8,
    },
    witnessEmail: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    }
})

const incidentSchema = new mongoose.Schema({
    incidentDate: {
        type: String,
        required: true,
        min: 6
    },
    incidentDescription: {
        type: String,
        required: true,
        min: 6,
    },
    witness: {
        type: witnessSchema,
        required: true
    }
})


const claimSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    previousPosition: {
        type: String,
        required: true,
        min: 6
    },
    companyName: {
        type: String,
        required: true,
        min: 6
    },
    companyEmail: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    incident: {
        type: incidentSchema,
        required: true
    },
    status: {
        type: String,
        enum: ["in-review", "Approved", "Declined"],
        default: "in-review"
      }

}, {
    timestamps: true
})

const Claim = mongoose.model('Claim', claimSchema)
module.exports = Claim