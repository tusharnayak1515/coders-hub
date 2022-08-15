import roles from "../pages/api/roles";

const grantAccess = (action, resource, handler)=> {
    let success = false;
    return async (req, res) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
       return res.status(401).json({
        error: "You don't have enough permission to perform this action"
       });
      }
      return handler(req,res);
     } catch (error) {
      success = false;
      return res.status(500).json({success, error: error.message});
     }
    }
}

export default grantAccess;