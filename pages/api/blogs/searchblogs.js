import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";

import User from "../../../models/User";
import Blog from "../../../models/Blog";

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "GET") {
        let success = false;
        try {
            const userId = req.user.id;
            const blogName = req.query.name;

            let user = await User.findById(userId);
            if(!user) {
                success = false;
                return res.status(404).json({success, error: "Admin not found!"});
            }

            let searchedBlogs = await Blog.find({ title: new RegExp(blogName, "i") })
                .populate("user","_id name profilepic role")
                .sort("-createdAt");

            success = true;
            return res.status(200).json({success, searchedBlogs});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("deleteAny", "blogs", handler));