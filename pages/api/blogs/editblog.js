const joi = require("joi");
import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";

import User from "../../../models/User";
import Blog from "../../../models/Blog";

const schema = joi.object({
    title: joi.string().min(3).max(100).required().messages({
        'title.min': '{#label} should contain at least {#min} characters!',
        'title.max': '{#label} should contain at most {#max} characters!',
        'title.required': '{#label} cannot be empty!',
    }),
    category: joi.string().min(3).max(15).required().messages({
        'category.min': '{#label} should contain at least {#min} characters!',
        'category.max': '{#label} should contain at most {#max} characters!',
        'category.required': '{#label} cannot be empty!',
    })
});

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "PUT") {
        let success = false;
        try {
            const userId = req.user.id;
            const {id, title, description, content, category} = req.body;
            const {error} = schema.validate({title});
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

            blog = await Blog.findByIdAndUpdate(id, {title,description,content,category}, {new: true})
                .populate("user");

            const blogs = await Blog.find()
                .populate("user")
                .sort("-createdAt");

            success = true;
            return res.status(200).json({success, blogs, blog});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("updateOwn", "blogs", handler));