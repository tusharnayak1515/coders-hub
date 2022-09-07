import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";
import { deleteCookie } from "cookies-next";

import User from "../../../models/User";
import Blog from "../../../models/Blog";

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "DELETE") {
        let success = false;
        try {
            const userId = req.user.id;
            let user = await User.findById(userId);
            if(!user) {
                success = false;
                return res.json({success, error: "User not found!"});
            }

            const allUserBlogs = await Blog.find({user: userId});

            allUserBlogs.forEach(async (blog)=> {
                let blog1 = await Blog.findByIdAndDelete(blog._id.toString(),{new: true});
            });

            user = await User.findByIdAndDelete(userId, {new: true});
            deleteCookie("jb_user_token",{req, res});

            success = true;
            return res.status(200).json({success});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("deleteOwn", "profile", handler));