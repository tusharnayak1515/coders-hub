import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";

import User from "../../../models/User";
import Blog from "../../../models/Blog";
import Comment from "../../../models/Comment";

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "DELETE") {
        let success = false;
        try {
            const userId = req.user.id;
            const commentId = req.query.id;
            let user = await User.findById(userId);
            if(!user) {
                success = false;
                return res.status(404).json({success, error: "User not found!"});
            }

            let comment = await Comment.findById(commentId);
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

            if(user._id.toString() !== comment.user.toString()) {
                success = false;
                return res.status(404).json({success, error: "You do not have permission to perform this action!"});
            }

            comment = await Comment.findByIdAndDelete(commentId, {new: true});

            const comments = await Comment.find({blog: blogId})
                .populate("user")
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
 
export default fetchUser(grantAccess("deleteOwn", "comments", handler));