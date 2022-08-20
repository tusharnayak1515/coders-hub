const joi = require("joi");
import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";

import User from "../../../models/User";
import Blog from "../../../models/Blog";
import Comment from "../../../models/Comment";

const schema = joi.object({
    id: joi.string().length(24).required().messages({
        'id.length': '{#label} must be of {#min} characters!',
        'id.required': '{#label} cannot be empty!',
    })
});

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "PUT") {
        let success = false;
        try {
            const userId = req.user.id;
            const {id} = req.body;
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

            let comment = await Comment.findById(id);
            if(!comment) {
                success = false;
                return res.status(404).json({success, error: "Comment not found!"});
            }

            const blogId = comment.blog.toString();

            let blog = await Blog.findById(blogId);
            if(!blog) {
                success = false;
                return res.status(404).json({success, error: "Blog not found!"});
            }

            let count = 0;
            comment.likes.forEach((user1)=> {
                if(user1.toString() === userId) {
                    count += 1;
                }
            });

            if(count === 0) {
                success = false;
                return res.status(400).json({success, error: "You cannot unlike a comment which you have not liked!"});
            }

            comment = await Comment.findByIdAndUpdate(id, {$pull: {likes: userId}}, {new: true});

            const comments = await Comment.find({blog: blogId})
                .populate("user","_id name profilepic role")
                .sort({likes: -1})
                .limit(20);

            success = true;
            return res.status(200).json({success, comments});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("updateOwn", "likes", handler));