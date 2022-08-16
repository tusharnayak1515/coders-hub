const joi = require("joi");
import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";

import User from "../../../models/User";
import Blog from "../../../models/Blog";

const schema = joi.object({
    id: joi.string().length(24).required(),
    name: joi.string().min(3).max(25).required().messages({
        'name.min': '{#label} should contain at least {#min} characters!',
        'name.max': '{#label} should contain at most {#max} characters!',
        'name.required': '{#label} cannot be empty!',
    }),
    email: joi.string().email().required().messages({
        'email.email': 'Enter a valid email!',
        'email.required': '{#email} cannot be empty!'
    })
});

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "PUT") {
        let success = false;
        try {
            const {id,name,email} = req.body;
            const {error} = schema.validate(req.body);
            if(error) {
                success = false;
                return res.status(422).json({success, error: error.details[0].message});
            }

            let user = await User.findById(id);
            if(!user) {
                success = false;
                return res.status(404).json({success, error: "User not found!"});
            }
            
            user = await User.findOne({email: email});
            if(user) {
                if(user._id.toString() !== id) {
                    success = false;
                    return res.status(409).json({success, error: "This email is already linked to another account!"});
                }
            }

            user = await User.findByIdAndUpdate(id, {name: name, email: email}, {new: true})
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
 
export default fetchUser(grantAccess("updateAny", "profile", handler));