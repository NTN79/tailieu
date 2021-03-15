const User = require('../Service/user.service');
const cloundinary = require('../config/cloudinary.connect');

let fileFilter = (file) => {
    if (file.mimetype === 'image/png'
        || file.mimetype === 'image/jpeg'
        || file.mimetype === 'image/gif'
        || file.mimetype === 'image/jpg') {
        return true;
    }
    return false;
}

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
        let avatarOld = req.user.avatar;
        let id = req.user.userId;
        let result = await User.delete(id);
        if (!result) { throw new Error('Error delete...!'); }
        if (avatarOld) {
            await cloundinary.uploader.destroy(req.user.avatar);
        }
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
        if (!req.files || Array.isArray(req.files.avatar)) {
            throw new Error('avatar upload not empty...!');
        }
        let img = req.files.avatar;
        if (!fileFilter(img)) {
            throw new Error('file upload is not image...!')
        }
        let avatarOld = req.user.avatar;
        let _id = req.user.userId;
        let _fileName = `${_id}-${req.user.lastName.replace(' ', '').toLocaleUpperCase()}`;
        if (avatarOld) {
            await cloundinary.uploader.destroy(req.user.avatar);
        }
        let _dirSave = "avatar/";
        const resultUpload = await cloundinary.uploader.upload(img.tempFilePath,{
            folder:_dirSave,
            public_id:_fileName,
            unique_filename:true
        })
        if(!resultUpload){
            throw new Error('image upload fail...!');
        }
        let result = await User.updateAvatar(_id, `${_fileName}`);
        if (!result) {
            return res.status(400).json({
                message: "update fail...!",
                code: 400
            });
        }
        req.user = result;
        res.status(200).json({
            message: "update successful...!",
            code: 200,
            data: result
        });
    } catch (e) {
        console.log("Error: ", e.message);
        res.status(500).json({
            message: "update Error...!",
            code: 500,
            error: e.message
        });
    }
};
