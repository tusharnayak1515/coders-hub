const joi = require("joi");
import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";

import User from "../../../models/User";
import Blog from "../../../models/Blog";

const schema = joi.object({
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
            const userId = req.user.id;
            const {name,email,profilepic} = req.body;
            const {error} = schema.validate({name,email});
            if(error) {
                success = false;
                return res.status(422).json({success, error: error.details[0].message});
            }

            let user = await User.findById(userId);
            if(!user) {
                success = false;
                return res.json({success, error: "User not found!"});
            }
            
            user = await User.findOne({email: email});
            if(user) {
                if(user._id.toString() !== userId) {
                    success = false;
                    return res.json({success, error: "This email is already linked to another account!"});
                }
            }

            if(!profilepic || profilepic === "") {
                profilepic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
            }

            user = await User.findByIdAndUpdate(userId, {name: name, email: email, profilepic: profilepic}, {new: true})
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
 
export default fetchUser(grantAccess("updateOwn", "profile", handler));