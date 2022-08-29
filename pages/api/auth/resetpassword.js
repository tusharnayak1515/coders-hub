import connectToMongo from "../../../db";
const joi = require("joi");
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);
import bcrypt from "bcryptjs";

import User from "../../../models/User";
import Otp from "../../../models/Otp";
import Blog from "../../../models/Blog";

const schema = joi.object({
    otp: joi.string().required().messages({'otp.required': '{#email} cannot be empty!'}),
    newpassword: joiPassword
            .string()
            .min(8)
            .minOfUppercase(1)
            .minOfLowercase(1)
            .minOfSpecialCharacters(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .required()
            .messages({
                'newpassword.min': '{#label} should contain at least {#min} characters!',
                'newpassword.minOfUppercase': '{#label} should contain at least {#min} uppercase character!',
                'newpassword.minOfSpecialCharacters':
                      '{#label} should contain at least {#min} special character!',
                'newpassword.minOfLowercase': '{#label} should contain at least {#min} lowercase character!',
                'newpassword.minOfNumeric': '{#label} should contain at least {#min} numeric character!',
                'newpassword.noWhiteSpaces': '{#label} should not contain white spaces!',
                'newpassword.required': '{#label} cannot be empty!',
            }),
    confirmpassword: joiPassword
            .string()
            .min(8)
            .minOfUppercase(1)
            .minOfLowercase(1)
            .minOfSpecialCharacters(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .required()
            .messages({
                'confirmpassword.min': '{#label} should contain at least {#min} characters!',
                'confirmpassword.minOfUppercase': '{#label} should contain at least {#min} uppercase character!',
                'confirmpassword.minOfSpecialCharacters':
                      '{#label} should contain at least {#min} special character!',
                'confirmpassword.minOfLowercase': '{#label} should contain at least {#min} lowercase character!',
                'confirmpassword.minOfNumeric': '{#label} should contain at least {#min} numeric character!',
                'confirmpassword.noWhiteSpaces': '{#label} should not contain white spaces!',
                'confirmpassword.required': '{#label} cannot be empty!',
            }),
});

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "PUT") {
        let success = false;
        try {
            const {otp, newpassword, confirmpassword} = req.body;
            const {error} = schema.validate(req.body);
            if(error) {
                success = false;
                return res.status(422).json({success, error: error.details[0].message});
            }

            let myotp = await Otp.findById(otp);
            if(!myotp) {
                success = false;
                return res.json({success, error: "Otp expired!"});
            }

            let user = await User.findOne({email: myotp.email});
            if(!user) {
                success = false;
                return res.json({success, error: "User not found!"});
            }

            if(newpassword !== confirmpassword) {
                success = false;
                return res.status(401).json({success, error: "New password and confirm password do not match!"});
            }

            const salt = await bcrypt.genSalt(10);
            const securedPassword = await bcrypt.hash(newpassword, salt);

            user = await User.findByIdAndUpdate(user._id.toString(), {password: securedPassword}, {new: true})
                .select("-password")
                .populate("blogs");

            success = true;
            return res.status(200).json({success});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default handler;