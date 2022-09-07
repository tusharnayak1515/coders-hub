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
            const adminId = req.user.id;
            let admin = await User.findById(adminId);
            if(!admin) {
                success = false;
                return res.json({success, error: "Admin not found!"});
            }

            const users = await User.find({_id: {$ne: adminId}})
                .select("-password")
                .select("-blogs")
                .sort({name: 1});

            success = true;
            return res.status(200).json({success, users});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("readAny", "profile", handler));