const mongoose = require("mongoose");
const {Schema} = mongoose;

const OtpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expiry: {
        type: Number
    },
    createdAt: { type: Date, expires: '3m', default: Date.now }
},{timestamps: true});

const Otp = mongoose.models.Otp || mongoose.model("Otp", OtpSchema);
module.exports = Otp;