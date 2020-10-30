const {ROLES,role} = require('../config/connectDB');
const User = require('../Service/user.service');

exports.isAdminShop= async (req,res,next)=>{
    try {
        let userRole =  await User.getRole(req.user.userId);
        let role = ROLES[userRole-1].replace('Role_','').toLocaleUpperCase();
        if(role==="ADMIN"){
            next();
            return;
        }
        res.status(403).json({
            messenger:'login authorization manager fail...!',
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