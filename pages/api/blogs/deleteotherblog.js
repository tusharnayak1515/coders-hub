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
            const adminId = req.user.id;
            const blogId = req.query.id;

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

            let user = await User.findById(blog.user.toString());
            if(!user) {
                success = false;
                return res.status(404).json({success, error: "User not found!"});
            }

            user = await User.findByIdAndUpdate(blog.user.toString(), {$pull: {blogs: blogId}}, {new: true});

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
 
export default fetchUser(grantAccess("deleteAny", "blogs", handler));