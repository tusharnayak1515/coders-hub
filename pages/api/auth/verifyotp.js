import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
const joi = require("joi");
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);
import bcrypt from "bcryptjs";
import grantAccess from "../../../middlewares/grantAccess";

import Otp from "../../../models/Otp";
import User from "../../../models/User";
import Blog from "../../../models/Blog";

const schema = joi.object({
    otp: joi.string().required().messages({
                'otp.required': '{#label} cannot be empty!',
    }),
});

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "POST") {
        let success = false;
        try {
            const {otp} = req.body;
            const {error} = schema.validate(req.body);
            if(error) {
                success = false;
                return res.json({success, error: error.details[0].message});
            }

            const myotp = await Otp.findOne({otp: otp});
            if(!myotp) {
                success = false;
                return res.json({success, error: "Incorrect otp"})
            }

            success = true;
            return res.json({success, myotp});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default handler;