import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
const joi = require("joi");
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);
import bcrypt from "bcryptjs";
import grantAccess from "../../../middlewares/grantAccess";

import User from "../../../models/User";
import Blog from "../../../models/Blog";

const schema = joi.object({
    oldPassword: joiPassword
            .string()
            .min(8)
            .minOfUppercase(1)
            .minOfLowercase(1)
            .minOfSpecialCharacters(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .required()
            .messages({
                'oldPassword.min': '{#label} should contain at least {#min} characters!',
                'oldPassword.minOfUppercase': '{#label} should contain at least {#min} uppercase character!',
                'oldPassword.minOfSpecialCharacters':
                      '{#label} should contain at least {#min} special character!',
                'oldPassword.minOfLowercase': '{#label} should contain at least {#min} lowercase character!',
                'oldPassword.minOfNumeric': '{#label} should contain at least {#min} numeric character!',
                'oldPassword.noWhiteSpaces': '{#label} should not contain white spaces!',
                'oldPassword.required': '{#label} cannot be empty!',
            }),
    newPassword: joiPassword
            .string()
            .min(8)
            .minOfUppercase(1)
            .minOfLowercase(1)
            .minOfSpecialCharacters(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .required()
            .messages({
                'newPassword.min': '{#label} should contain at least {#min} characters!',
                'newPassword.minOfUppercase': '{#label} should contain at least {#min} uppercase character!',
                'newPassword.minOfSpecialCharacters':
                      '{#label} should contain at least {#min} special character!',
                'newPassword.minOfLowercase': '{#label} should contain at least {#min} lowercase character!',
                'newPassword.minOfNumeric': '{#label} should contain at least {#min} numeric character!',
                'newPassword.noWhiteSpaces': '{#label} should not contain white spaces!',
                'newPassword.required': '{#label} cannot be empty!',
            }),
    confirmPassword: joiPassword
            .string()
            .min(8)
            .minOfUppercase(1)
            .minOfLowercase(1)
            .minOfSpecialCharacters(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .required()
            .messages({
                'confirmPassword.min': '{#label} should contain at least {#min} characters!',
                'confirmPassword.minOfUppercase': '{#label} should contain at least {#min} uppercase character!',
                'confirmPassword.minOfSpecialCharacters':
                      '{#label} should contain at least {#min} special character!',
                'confirmPassword.minOfLowercase': '{#label} should contain at least {#min} lowercase character!',
                'confirmPassword.minOfNumeric': '{#label} should contain at least {#min} numeric character!',
                'confirmPassword.noWhiteSpaces': '{#label} should not contain white spaces!',
                'confirmPassword.required': '{#label} cannot be empty!',
            }),
});

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "PUT") {
        let success = false;
        try {
            const userId = req.user.id;
            const {oldPassword,newPassword,confirmPassword} = req.body;
            const {error} = schema.validate(req.body);
            if(error) {
                success = false;
                return res.status(422).json({success, error: error.details[0].message});
            }

            let user = await User.findById(userId);
            if(!user) {
                success = false;
                return res.json({success, error: "User not found!"});
            }

            if(oldPassword === newPassword) {
                success = false;
                return res.json({success, error: "New password should be different from old password!"});
            }

            if(newPassword !== confirmPassword) {
                success = false;
                return res.json({success, error: "New password and confirm password do not match!"});
            }
            
            const passwordCompare = await bcrypt.compare(oldPassword, user.password);
            if(!passwordCompare) {
                success = false;
                return res.json({success, error: "Old password is incorrect!"});
            }

            const salt = await bcrypt.genSalt(10);
            const securedPassword = await bcrypt.hash(newPassword, salt);

            user = await User.findByIdAndUpdate(userId, {password: securedPassword}, {new: true})
                .select("-password")
                .populate("blogs");

            success = true;
            return res.status(200).json({success, user});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("updateOwn", "password", handler));