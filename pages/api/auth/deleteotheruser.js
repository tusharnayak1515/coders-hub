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
            const id = req.query.id;
            let user = await User.findById(id);
            if(!user) {
                success = false;
                return res.json({success, error: "User not found!"});
            }

            const allUserBlogs = await Blog.find({user: id});

            allUserBlogs.forEach(async (blog)=> {
                let blog1 = await Blog.findByIdAndDelete(blog._id.toString(),{new: true});
            });

            user = await User.findByIdAndDelete(id, {new: true});

            const users = await User.find({_id: {$ne: adminId}})
                .sort({name: 1});

            success = true;
            return res.status(200).json({success, users});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("deleteAny", "profile", handler));