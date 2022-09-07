import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";

import User from "../../../models/User";
import Blog from "../../../models/Blog";

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "DELETE") {
        let success = false;
        try {
            const userId = req.user.id;
            const blogId = req.query.id;

            let user = await User.findById(userId);
            if(!user) {
                success = false;
                return res.json({success, error: "User not found!"});
            }

            let blog = await Blog.findById(blogId);
            if(!blog) {
                success = false;
                return res.json({success, error: "Blog not found!"});
            }

            if(user._id.toString() !== blog.user.toString()) {
                success = false;
                return res.json({success, error: "You do not have permission to perform this action!"});
            }

            user = await User.findByIdAndUpdate(userId, {$pull: {blogs: blogId}}, {new: true})
                .select("-password")
                .populate("blogs");

            blog = await Blog.findByIdAndDelete(blogId, {new: true});

            const blogs = await Blog.find()
                .populate("user","_id name profilepic role")
                .sort("-createdAt");

            success = true;
            return res.status(200).json({success, blogs, user});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("deleteOwn", "blogs", handler));