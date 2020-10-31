const User = require('../Service/user.service');
const fs = require('fs');
const multer = require('multer');

let Storage = multer.diskStorage({
    filename:function(req,file,cb){
        cb(null,`${req.user.userId}-${file.originalname.replace(' ','').toLocaleUpperCase()}`);
    },
    destination: function(req,file,cb){
        cb(null,'public/uploads/avatars');
    }
})
exports.uploadFile = multer({
    limits:{
        fieldSize: 1024*1024*3
    },
    fileFilter: function(req, file, cb) {
       if(file. mimetype ==='image/png'||file. mimetype ==='image/jpeg'||file. mimetype ==='image/gif'||file. mimetype ==='image/jpg')  {
            cb(null, true);
        }
        cb(null, false);
    },
    storage: Storage
});

exports.getAll = async (req, res, next) => {
    try {
        let users = await User.getAllUser();
        if (!users) {
            return res.status(404).json({
                message: 'not found...!',
                code: 404
            });
        }
        res.status(200).json({
            message: 'successful...!',
            data: users
        })
    } catch (e) {
        res.status(500).json({
            message: 'error...',
            code: 500,
            error: e.message
        })
    }
};
exports.getProfile = async (req, res, next) => {
    try {
        let user = req.user;
        if (!user) {
            return res.status(404).json({
                message: 'Not fond user...!',
                code: 404
            });
        }
        res.status(200).json({
            message: 'successful...!',
            code: 200,
            data: user
        });
    } catch (e) {
        res.status(500).json({
            message: 'Error...!',
            code: 500,
            error: e.message
        });
    }
};
exports.createUser = async (req, res, next) => {
    try {
        let user = await User.createUser(req);
        if (!user) {
            return res.status(400).json({
                message: "create User fails...!!",
                code: 400
            });
        }
        console.log('create a new user...!')
        res.status(201).json({
            message: 'create success...!!',
            code: 201,
            data: user.email
        });
    } catch (e) {
        res.status(500).json({
            message: 'Error created...!',
            code: 500,
            error: e.message
        });
    }
};
exports.loginUser = async (req, res, next) => {
    try {
        let login = {
            email: req.body.email,
            password: req.body.password
        }
        let result = await User.findByUser(login);
        if (!result) {
            return res.status(400).json({
                message: "email or password wrong...!",
                code: 400
            });
        }
        let user = await User.findById(result);
        let token = await User.generateAuthToken(user);
        res.status(200).json({
            message: 'login success...!',
            code: 200,
            data: user,
            token: token
        });
    } catch (e) {
        res.status(500).json({
            message: 'login Error...!',
            code: 500,
            error: e.message
        });
    }
};
exports.logoutUser = async (req, res, next) => {
    req.user = undefined;
    req.token = undefined;
    req.headers.authorization = undefined;
    res.status(200).json({
        message: 'successful...!',
        code: 200
    });
};
exports.updateProfile = async (req, res, next) => {
    try {
        let keyUpdate = Object.keys(req.body);
        let field = ['roleId', 'userId'];
        await field.forEach(x => {
            if (keyUpdate.includes(x)) {
                throw new Error('input wrong...!');
            }
        });
        let _id = req.user.userId;
        let result = await User.updateUserProfile(_id, req.body);
        if (!result) {
            return res.status(400).json({
                message: "update fail...!",
                code: 400
            });
        }
        let user = await User.findById(req.user.userId);
        req.user = user;
        res.status(200).json({
            message: "update successful...!",
            code: 200,
            data: user
        });
    } catch (e) {
        res.status(500).json({
            message: "update Error...!",
            code: 500,
            error: e.message
        });
    }
};
exports.deleteUser = async (req, res, next) => {
    try {
        let avatarOld =req.user.avatar;
        if (avatarOld ) {
                fs.unlink(`./public/uploads/avatars/${avatarOld}`, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log("deleted image avatar user...!");
                });
        }
        let id = req.user.userId;
        let result = await User.delete(id);
        if (!result) { throw new Error('Error delete...!'); }
        req.user = undefined;
        req.token = undefined;
        res.status(200).json({
            message: 'delete successful...!',
            code: 200
        });
    } catch (e) {
        res.status(500).json({
            message: 'delete fail...!',
            code: 500,
            error: e.message
        });
    }
};
exports.uploadAvatar = async (req, res, next) => {
    try {
        let avatarOld =req.user.avatar;
        let _id = req.user.userId;
        let _fileName =`${_id}-${req.file.originalname.replace(' ','').toLocaleUpperCase()}`;
        if (avatarOld ) {
            if(avatarOld !=_fileName){
                fs.unlink(`./public/uploads/avatars/${avatarOld}`, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log("deleted image avatar old...!");
                });
            }
        }
        let result = await User.updateAvatar(_id,_fileName);
        if(!result){
            return res.status(400).json({
                message: "update fail...!",
                code : 400
            });
        }
        let user = await User.findById(req.user.userId);
        req.user  = user;
        res.status(200).json({
            message: "update successful...!",
            code: 200,
            data: user
        });
    } catch (e) {
        res.status(500).json({
            message: "update Error...!",
            code: 500,
            error: e.message
        });
    }
};
