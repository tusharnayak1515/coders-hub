const joi = require("joi");
import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";

import User from "../../../models/User";
import Blog from "../../../models/Blog";

const schema = joi.object({
    title: joi.string().min(3).max(50).required().messages({
        'title.min': '{#label} should contain at least {#min} characters!',
        'title.max': '{#label} should contain at most {#max} characters!',
        'title.required': '{#label} cannot be empty!',
    })
});

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "PUT") {
        let success = false;
        try {
            const userId = req.user.id;
            const {id, title, description=null, content=null} = req.body;
            const {error} = schema.validate(req.body);
            if(error) {
                success = false;
                return res.status(422).json({success, error: error.details[0].message});
            }

            let user = await User.findById(userId);
            if(!user) {
                success = false;
                return res.status(404).json({success, error: "User not found!"});
            }

            let blog = await Blog.findById(id);
            if(!blog) {
                success = false;
                return res.status(404).json({success, error: "Blog not found!"});
            }

            blog = await Blog.findByIdAndUpdate(id, {title,description,content}, {new: true});

            const blogs = await Blog.find()
                .sort("-createdAt");

            success = true;
            return res.status(201).json({success, blogs});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("updateAny", "blogs", handler));