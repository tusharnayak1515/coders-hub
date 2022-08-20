const joi = require("joi");
import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";

import User from "../../../models/User";
import Blog from "../../../models/Blog";
import Comment from "../../../models/Comment";

const schema = joi.object({
    title: joi.string().min(3).max(100).required().messages({
        'title.min': '{#label} should contain at least {#min} characters!',
        'title.max': '{#label} should contain at most {#max} characters!',
        'title.required': '{#label} cannot be empty!',
    }),
    id: joi.string().length(24).required().messages({
        'id.length': '{#label} must be of {#min} characters!',
        'id.required': '{#label} cannot be empty!',
    }),
    comment: joi.required().messages({
        'comment.required': '{#label} cannot be empty!'
    })
});

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "PUT") {
        let success = false;
        try {
            const adminId = req.user.id;
            const {id, title, comment} = req.body;
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

            let comment1 = await Comment.findById(id);
            if(!comment1) {
                success = false;
                return res.status(404).json({success, error: "Comment not found!"});
            }

            const blogId = comment1.blog.toString();

            let blog = await Blog.findById(blogId);
            if(!blog) {
                success = false;
                return res.status(404).json({success, error: "Blog not found!"});
            }

            comment1 = await Comment.findByIdAndUpdate(id, {title, comment}, {new: true});

            const comments = await Comment.find({blog: blogId})
                .populate("user","_id name profilepic role")
                .sort({likes: -1})
                .limit(20);

            success = true;
            return res.status(200).json({success, comments, comment: comment1});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("updateAny", "comments", handler));