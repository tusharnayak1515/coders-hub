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
    }),
    category: joi.string().min(3).max(15).required().messages({
        'category.min': '{#label} should contain at least {#min} characters!',
        'category.max': '{#label} should contain at most {#max} characters!',
        'category.required': '{#label} cannot be empty!',
    })
});

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "POST") {
        let success = false;
        try {
            const id = req.user.id;
            const {title, description=null, content=null, category} = req.body;
            const {error} = schema.validate({title, category});
            if(error) {
                success = false;
                return res.status(422).json({success, error: error.details[0].message});
            }

            let user = await User.findById(id);
            if(!user) {
                success = false;
                return res.status(404).json({success, error: "User not found!"});
            }

            const newblog = await Blog.create({
                title,
                description: description,
                content: content,
                category,
                user: id
            });

            user = await User.findByIdAndUpdate(id, {$push: {blogs: newblog}}, {new: true});

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
 
export default fetchUser(grantAccess("createOwn", "blogs", handler));