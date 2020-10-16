const {ROLES,role} = require('../config/connectDB');
const User = require('../Service/user.service');

exports.isAdminShop= async (req,res,next)=>{
    try {
        let userRole =  await User.getRole(req.user.id);
        let role = ROLES[userRole-1];
        if(role==="admin"){
            next();
            return;
        }
        res.status(403).json({
            messenger:'login authorization fail...!',
            code :403
        });
    } catch (e) {
        res.status(500).json({
            messenger:'Error authorization...!',
            code:500,
            error:e.message
        })
    }
}