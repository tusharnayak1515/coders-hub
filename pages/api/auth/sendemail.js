import connectToMongo from "../../../db";
const joi = require("joi");
const bcrypt = require("bcryptjs");

import User from "../../../models/User";
import Otp from "../../../models/Otp";
import Blog from "../../../models/Blog";

const schema = joi.object({
    email: joi.string().email().required().messages({
        'email.email': 'Enter a valid email!',
        'email.required': '{#email} cannot be empty!'
    }),
});

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "POST") {
        let success = false;
        try {
            const {email} = req.body;
            const {error} = schema.validate(req.body);
            if(error) {
                success = false;
                return res.json({success, error: error.details[0].message});
            }
            
            let user = await User.findOne({email: email});
            if(!user) {
                success = false;
                return res.json({success, error: "This email is not linked to any account!"});
            }

            const code = Math.floor(user.createdAt + Math.random()*1000) + Math.floor(Math.random()*9000);
            const salt = await bcrypt.genSalt(10);
            const otp = await bcrypt.hash(code.toString(),salt);
            const myotp = await Otp.create({
                email: email,
                otp: otp,
                expiry: new Date().getTime() + 30000
            });
            mailer(email, otp);
            success = true;
            return res.status(200).json({success});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}

const mailer = async (email, code)=> {
    const nodemailer = require("nodemailer");

    const mailOptions = {
        from: process.env.NODE_MAILER_EMAIL,
        to: email,
        subject: "Verification Code for password reset of your coders-hub account!",
        text: code
    }
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: process.env.NODE_MAILER_EMAIL,
            pass: process.env.NODE_MAILER_PASSWORD
        }
    });

    await transporter.sendMail(mailOptions, (error,info)=> {
        console.log(error || info);
        if(error) {
            console.log(error);
        }
        else {
            console.log("Email Sent");
        }
    });

    // await new Promise((resolve, reject) => {
    //     transporter.verify(function (error, success) {
    //         if (error) {
    //             console.log(error);
    //             reject(error);
    //         } else {
    //             console.log("Server is ready to take our messages");
    //             resolve(success);
    //         }
    //     });
    // });

    // await new Promise((resolve, reject) => {
    //     transporter.sendMail(mailOptions, (error,info)=> {
    //         // console.log(error || info);
    //         if(error) {
    //             console.log(error);
    //         }
    //         else {
    //             console.log("Email Sent");
    //         }
    //     });
    // });
    
}
 
export default handler;