const {Users} = require('../config/connectDB');
const {Op} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({path:'../.env'});


exports.getAllUser= async()=>{
    try {
        let users = await Users.findAll();
        if(!users){throw new Error('not fond...')}
        return users;
    } catch (e) {
        return null;
    }
};
exports.createUser= async (req)=>{
    try {
        let _countUsers = await Users.findAndCountAll({attributes:['userId']});
        let _id = _countUsers.count+1;
        let PasswordHash = await bcrypt.hash(req.body.password,12);
        let user = Users.build({
            userId:_id,
            fistName: req.body.fistName,
            lastName: req.body.lastName,
            birthday: req.body.birthday,
            phone: req.body.phone,
            gender: (req.body.gender)?req.body.gender:"nam",
            address: req.body.address,
            email: req.body.email,
            password: PasswordHash,
            roleId: (req.body.role)?req.body.role: 2,
        });
        const result =await user.save();
        console.log(result)
        return result;
    } catch (e) {
        console.log(e.message);
        return null;
    }
};
exports.updateUserProfile = async(id,user)=>{
    try {
        let userUpdate= await Users.update(user,{
            where:{ userId:id }
        });
        if(!userUpdate){ throw new Error('user update fail...!')}
        console.log(userUpdate,"updated an user successful...!");
        return userUpdate;
    } catch (e) {
        return null;
    }  
};
exports.updateAvatar = async (id,file)=>{
    try {
        let userUpdate= await Users.update({
            avatar: file
        },{
            where:{ userId:id }
        });
        if(!userUpdate){ throw new Error('user update avatar fail...!')}
        console.log(userUpdate,id,"updated user avatar successful...!");
        return userUpdate;
    } catch (e) {
        return null;
    }  
}
exports.delete = async(id)=>{
    try {
        let result = await Users.destroy({
            force:true,
            where:{
                userId:id
            }
        });
        if(!result){throw new Error('delete Error...!');}
        return result
    } catch (e) {
        return null;
    }
}
exports.findById= async(id)=>{
    try {
        let user = await Users.findOne({
            attributes:['userId','fistName', 'lastName', 'birthday', 'phone', 'gender', 'address', 'email','avatar'],
            where:{
                userId:id
            }
        })
        if(!user){return null};
        return user;
    } catch (e) {
        return null;
    }
};
exports.findByUser= async ({email,password})=>{
    try {
        let result = await Users.findOne({
            where:{
                email: email
            }
        });
        let user= result.dataValues;
        if(!user){ throw new Error('email incorrect...!');}
        let isPassword = await bcrypt.compare(password,user.password);
        if(!isPassword){ throw new Error('password wrong...!');}
        return user.userId;
    } catch (e) {
        return null;
    }
};
exports.getRole= async(id)=>{
    try {
        let user = await Users.findOne({
            attributes:['roleId'],
            where:{
                userId:id
            }
        })
        if(!user){return null};
        return user.roleId;   
    } catch (e) {
        return null;
    }
};
exports.generateAuthToken = async (user)=>{
    try {
        let token = await jwt.sign({_id:user.userId},process.env.JWT_KEY,{
            expiresIn:86400
        });
        return token;
    } catch (e) {
        throw new Error('e');
    }
};