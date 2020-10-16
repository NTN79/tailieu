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
        let PasswordHash = await bcrypt.hash(req.body.password,12);
        let user = Users.build({
            fistName: req.body.fistName,
            lastName: req.body.lastName,
            birthday: req.body.birthday,
            phone: req.body.phone,
            gender: (req.body.gender)?req.body.gender:"nam",
            address: req.body.address,
            email: req.body.email,
            password: PasswordHash,
            roleId: (req.body.role)?req.body.role: 2
        });
        await user.save();
        return user;
    } catch (e) {
        return null;
    }
};
exports.updateUserProfile = async(id,user)=>{
    try {
        let userUpdate= await Users.update(user,{
            where:{ id:id }
        });
        if(!userUpdate){ throw new Error('user update fail...!')}
        console.log(userUpdate,"updated an user successful...!");
        return userUpdate;
    } catch (e) {
        return null;
    }  
};
exports.delete = async(id)=>{
    try {
        let result = await Users.destroy({
            force:true,
            where:{
                id:id
            }
        });
        if(!result){throw new Error('delete Error...!');}
        return result
    } catch (e) {
        return null;
    }
}
exports.findById= async(id)=>{
    let user = await Users.findOne({
        attributes:['id','fistName', 'lastName', 'birthday', 'phone', 'gender', 'address', 'email','avatar'],
        where:{
            id:id
        }
    })
    if(!user){return null};
    return user;
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
        return user;
    } catch (e) {
        return null;
    }
};
exports.getRole= async(id)=>{
    let user = await Users.findOne({
        attributes:['roleId'],
        where:{
            id:id
        }
    })
    if(!user){return null};
    return user.roleId;
};
exports.generateAuthToken = async (user)=>{
    let token = await jwt.sign({_id:user.id},process.env.JWT_KEY,{
        expiresIn:86400
    });
    return token;
};