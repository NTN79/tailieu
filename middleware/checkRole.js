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
            message:'login authorization manager fail...!',
            code :403
        });
    } catch (e) {
        res.status(500).json({
            message:'Error authorization...!',
            code:500,
            error:e.message
        })
    }
}
exports.getRoleUser= async (req,res,next)=>{
    try {
        let userRole =  await User.getRole(req.user.userId);
        let role = ROLES[userRole-1].replace('Role_','').toLocaleUpperCase();
        if(role==="ADMIN"||role==="USER"){
            console.log("role:",role);
            req.role=role;
            next();
            return;
        }
        else{
            res.status(403).json({
                message:'login authorization manager fail...!',
                code :403
            });
        }
    } catch (e) {
        res.status(500).json({
            message:'Error authorization...!',
            code:500,
            error:e.message
        })
    }
}