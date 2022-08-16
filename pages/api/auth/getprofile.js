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
            const adminId = req.user.id;
            const userId = req.query.id;
            let admin = await User.findById(adminId);
            if(!admin) {
                success = false;
                return res.status(404).json({success, error: "Admin not found!"});
            }

            let otheruser = await User.findById(userId);
            if(!otheruser) {
                success = false;
                return res.status(404).json({success, error: "User not found!"});
            }

            otheruser = await User.findById(userId)
                .select("-password")
                .populate("blogs");

            success = true;
            return res.status(200).json({success, otheruser});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("readAny", "profile", handler));