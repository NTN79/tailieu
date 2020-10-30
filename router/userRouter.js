const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authToken = require('../middleware/authentication').authenticationToken;
const {isAdminShop} = require('../middleware/checkRole');
const multer = require('multer');

let Storage = multer.diskStorage({
    filename:function(req,file,cb){
        cb(null,`${req.user.userId}-${file.originalname.replace(' ','').toLocaleUpperCase()}`);
    },
    destination: function(req,file,cb){
        cb(null,'public/uploads/avatars');
    }
})
const uploadAvatar = multer({
    limits:{
        fieldSize: 1024*1024*3
    },
    fileFilter: function(req, file, cb) {
        if (!file.originalname.match(/(\.jpg|\.jpeg|\.png|\.gif)$/)) {
            return cb(new Error('file upload an image...!'), undefined);
        }
        cb(undefined, true);
    },
    storage: Storage
});


router.get('/',[authToken , isAdminShop],userController.getAll);
router.post('/',userController.createUser);
router.post('/login',userController.loginUser);
router.post('/logout',authToken,userController.logoutUser);
router.get('/profile',authToken,userController.getProfile);
router.patch('/profile',authToken,userController.updateProfile);
router.delete('/',authToken,userController.deleteUser);
router.post('/avatar',authToken,uploadAvatar.single('avatar'),userController.uploadAvatar);

module.exports = router;