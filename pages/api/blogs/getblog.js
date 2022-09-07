import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";

import User from "../../../models/User";
import Blog from "../../../models/Blog";
import grantAccess from "../../../middlewares/grantAccess";

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "GET") {
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

            blog = await Blog.findById(blogId)
                .populate("user","_id name profilepic role");

            success = true;
            return res.status(200).json({success, blog});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("readAny", "blogs", handler));