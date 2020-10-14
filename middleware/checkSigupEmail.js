const {Users,ROLES} = require('../config/connectDB');

exports.CheckEmail = async(req,res,next)=>{
    let user = await Users.findOne({
        where: {
            $or:[{
                email: req.body.email
            }]
        }
    });
};
