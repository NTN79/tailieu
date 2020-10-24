const User = require('../Service/user.service');


exports.getAll = async (req,res,next)=>{
    try {
        let users = await User.getAllUser();
        if(!users){
            return res.status(404).json({
                messenger:'not found...!',
                code :404
            });
        }
        res.status(200).json({
            messenger:'successful...!',
            data:users
        })
    } catch (e) {
        res.status(500).json({
            messenger:'error...',
            code: 500,
            error: e.message
        })
    }
};
exports.getProfile = async(req,res,next)=>{
    try {
        let user = req.user;
        if(!user){
            return res.status(404).json({
                messenger:'Not fond user...!',
                code:404
            });
        }
        res.status(200).json({
            messenger:'successful...!',
            code: 200,
            data: user
        });
    } catch (e) {
        res.status(500).json({
                messenger:'Error...!',
                code:500,
                error:e.message
            });
    }
};
exports.createUser = async (req,res,next)=>{
    try {
       let user = await User.createUser(req);
       if(!user){
           return res.status(400).json({
               messenger:"create User fails...!!",
               code:400
           });
       }
       console.log('create a new user...!')
       res.status(201).json({
           messenger:'create success...!!',
           code : 201,
           data: user
       });
    } catch (e) {
        res.status(500).json({
            messenger:'Error created...!',
            code:500,
            error: e.message
        });
    }
};
exports.loginUser = async (req,res,next)=>{
    try {
        let login ={
            email: req.body.email,
            password: req.body.password
        }
        let user = await User.findByUser(login);
        if(!user){
            return res.status(400).json({
                messenger:"email or password wrong...!",
                code:400
            });
        }
       let token= await User.generateAuthToken(user);
        res.status(200).json({
            messenger:'login success...!',
            code : 200,
            data:user,
            token: token
        });
    } catch (e) {
        res.status(500).json({
            messenger:'login Error...!',
            code:500,
            error:e.message
        });
    }
};
exports.logoutUser = async(req,res,next)=>{
    req.user = undefined;
    req.token = undefined;
    req.headers.authorization=undefined;
    res.status(200).json({
        messenger:'successful...!',
        code: 200
    });
};
exports.updateProfile = async(req,res,next)=>{
    try {
        let keyUpdate= Object.keys(req.body);
        let field = ['roleId','id'];
        await field.forEach(x =>{
            if(keyUpdate.includes(x)){
                throw new Error('input wrong...!');
            }
        });
        let _id = req.user.id;
        let result = await User.updateUserProfile(_id,req.body);
        if(!result){
            return res.status(400).json({
                messenger: "update fail...!",
                code : 400
            });
        }
        let user = await User.findById(req.user.id);
        req.user  = user;
        res.status(200).json({
            messenger: "update successful...!",
            code : 200,
            data: user
        });
    } catch (e) {
        res.status(500).json({
            messenger: "update Error...!",
            code : 500,
            error:e.message
        });
    }
};
exports.deleteUser = async(req,res,next)=>{
    try {
        let id = req.user.id;
        let result = await User.delete(id);
        if(!result){throw new Error('Error delete...!');}
        req.user= undefined;
        req.token = undefined;
        res.status(200).json({
            messenger:'delete successful...!',
            code :200
        });
    } catch (e) {
        res.status(500).json({
            messenger:'delete fail...!',
            code :500,
            error: e.message
        });
    }
};
exports.uploadAvatar = async(req,res,next)=>{
    try {   
        let _id = req.user.id;
        let _fileName = req.file.originalname;
        let result = await User.updateAvatar(_id,_fileName);
        if(!result){
            return res.status(400).json({
                messenger: "update fail...!",
                code : 400
            });
        }
        let user = await User.findById(req.user.id);
        req.user  = user;
        res.status(200).json({
            messenger: "update successful...!",
            code : 200,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            messenger: "update Error...!",
            code : 500,
            error:e.message
        });
    }
};