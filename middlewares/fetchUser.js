const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
import { getCookie } from 'cookies-next';

const fetchUser = (handler)=> {
    let success;
    return async (req,res)=> {
        const token = getCookie("jb_user_token",{req, res}) || req.headers.jb_user_token;
        if(!token) {
            success = false;
            return res.json({success, error: "You need to be logged in to access this route!"});
        }
        try {
            const data = jwt.verify(token, secret);
            req.user = data.user;
            return handler(req,res);
        } catch (error) {
            success = false;
            return res.status(500).json({success, error: error.message});
        }
    }
}

export default fetchUser;