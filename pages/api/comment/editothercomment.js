const joi = require("joi");
import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";

import User from "../../../models/User";
import Blog from "../../../models/Blog";
import Comment from "../../../models/Comment";

const schema = joi.object({
    title: joi.string().min(3).max(50).required().messages({
        'title.min': '{#label} should contain at least {#min} characters!',
        'title.max': '{#label} should contain at most {#max} characters!',
        'title.required': '{#label} cannot be empty!',
    }),
    blogId: joi.string().length(24).required().messages({
        'blogId.length': '{#label} must be of {#min} characters!',
        'blogId.required': '{#label} cannot be empty!',
    }),
    content: joi.required().messages({
        'content.required': '{#label} cannot be empty!'
    })
});

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "PUT") {
        let success = false;
        try {
            const adminId = req.user.id;
            const {id, title, content, blogId} = req.body;
            const {error} = schema.validate(req.body);
            if(error) {
                success = false;
                return res.status(422).json({success, error: error.details[0].message});
            }

            let admin = await User.findById(adminId);
            if(!admin) {
                success = false;
                return res.status(404).json({success, error: "Admin not found!"});
            }

            let blog = await Blog.findById(blogId);
            if(!blog) {
                success = false;
                return res.status(404).json({success, error: "Blog not found!"});
            }

            let comment = await Comment.findById(id);
            if(!comment) {
                success = false;
                return res.status(404).json({success, error: "Comment not found!"});
            }

            comment = await Comment.findByIdAndUpdate(id, {title, content}, {new: true});

            const comments = await Comment.find({blog: blogId})
                .sort({likes: -1})
                .limit(20);

            success = true;
            return res.status(201).json({success, comments});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("updateAny", "comments", handler));