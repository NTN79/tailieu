const jwt = require('jsonwebtoken');
const User = require('../Service/user.service');
require('dotenv').config({path:'../.env'})

exports.authenticationToken = async (req,res,next)=>{
    try {
        let token = req.header('authorization').replace('Bearer ','');
        if(!token){
            return res.status(403).json({
                messenger: "authorized fail...!",
                code: 403
            });
        }
        let key = process.env.JWT_KEY;
        let decode = jwt.verify(token,key);
        let user  = await User.findById(decode._id);
        if(!user){
            return res.status(401).json({
                messenger:'Unauthorized...!',
                code: 401
            });
        }
        req.user= user;
        next();
    } catch (e) {
        return res.status(500).json({
            messenger:'Not authorization, please login...!',
            code: 500
        });
    }
};