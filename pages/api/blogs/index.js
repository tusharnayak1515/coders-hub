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
            const id = req.user.id;
            let user = await User.findById(id);
            if(!user) {
                success = false;
                return res.status(404).json({success, error: "User not found!"});
            }

            const blogs = await Blog.find()
                .sort("-createdAt");

            success = true;
            return res.status(201).json({success, blogs});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("readAny", "blogs", handler));