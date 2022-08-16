const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);
import { setCookie } from "cookies-next";
import connectToMongo from "../../../db";

import User from "../../../models/User";

const schema = joi.object({
    email: joi.string().email().required().messages({
        'email.email': 'Enter a valid email!',
        'email.required': '{#email} cannot be empty!'
    }),
    password: joiPassword
            .string()
            .required()
            .messages({'password.required': '{#label} cannot be empty!'})
});

const secret = process.env.JWT_SECRET;

export default async function handler(req, res) {
    connectToMongo();
    if(req.method === "POST") {
        let success = false;
        try {
            const {email,password} = req.body;
            const {error} = schema.validate(req.body);
            if(error) {
                success = false;
                return res.status(422).json({success, error: error.details[0].message});
            }
            
            let user = await User.findOne({email: email});
            if(!user) {
                success = false;
                return res.status(404).json({success, error: "No account is associated to this email!"});
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare) {
                success = false;
                return res.status(401).json({success, error: "Incorrect Password!"});
            }

            const data = {
                user: {
                    id: user.id,
                    role: user.role
                }
            }

            const authToken = jwt.sign(data,secret);
            setCookie("jb_user_token", authToken, {req, res, maxAge: 60 * 60 * 24});

            success = true;
            return res.status(200).json({success});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
  