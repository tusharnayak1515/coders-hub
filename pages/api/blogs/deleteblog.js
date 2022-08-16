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
                return res.status(404).json({success, error: "User not found!"});
            }

            let blog = await Blog.findById(blogId);
            if(!blog) {
                success = false;
                return res.status(404).json({success, error: "Blog not found!"});
            }

            user = await User.findByIdAndUpdate(userId, {$pull: {blogs: blogId}}, {new: true});

            blog = await Blog.findByIdAndDelete(blogId, {new: true});

            const blogs = await Blog.find()
                .sort("-createdAt");

            success = true;
            return res.status(200).json({success, blogs});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("deleteOwn", "blogs", handler));