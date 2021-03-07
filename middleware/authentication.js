const jwt = require('jsonwebtoken');
const User = require('../Service/user.service');
require('dotenv').config({path:'../.env'})

exports.authenticationToken = async (req,res,next)=>{
    try {
        let token = req.header('authorization').replace('Bearer ','');
        if(!token){
            return res.status(403).json({
                message: "authorized fail...!",
                code: 403
            });
        }
        let key = process.env.JWT_KEY;
        let decode = jwt.verify(token,key);
        let user  = await User.findById(decode._id);
        if(!user){
            return res.status(401).json({
                message:'Unauthorized...!',
                code: 401
            });
        }
        req.user= user.dataValues;
        next();
    } catch (e) {
        console.log("middleware Error: ",e.message);
        return res.status(500).json({
            message:'Not authorization, please login...!',
            code: 500,
            error: 'Cannot read property...!'
        });
    }
};