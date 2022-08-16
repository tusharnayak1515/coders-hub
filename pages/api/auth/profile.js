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
            let user = await User.findById(userId);
            if(!user) {
                success = false;
                return res.status(404).json({success, error: "User not found!"});
            }

            user = await User.findById(userId)
                .select("-password")
                .populate("blogs");

            success = true;
            return res.status(200).json({success, user});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("readOwn", "profile", handler));