import connectToMongo from "../../../db";
import fetchUser from "../../../middlewares/fetchUser";
import grantAccess from "../../../middlewares/grantAccess";

import User from "../../../models/User";
import Blog from "../../../models/Blog";
import { deleteCookie } from "cookies-next";

const handler = async (req, res)=> {
    connectToMongo();
    if(req.method === "DELETE") {
        let success = false;
        try {
            const id = req.query.id;
            let user = await User.findById(id);
            if(!user) {
                success = false;
                return res.status(404).json({success, error: "User not found!"});
            }

            user = await User.findByIdAndDelete(id, {new: true});

            success = true;
            return res.status(201).json({success});
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}
 
export default fetchUser(grantAccess("deleteAny", "profile", handler));