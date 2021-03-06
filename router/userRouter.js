const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authToken = require('../middleware/authentication').authenticationToken;
const {isAdminShop} = require('../middleware/checkRole');


router.get('/',[authToken , isAdminShop],userController.getAll);
router.get('/admin',[authToken , isAdminShop],userController.getProfile);
router.post('/',userController.createUser);
router.post('/login',userController.loginUser);
router.post('/logout',authToken,userController.logoutUser);
router.get('/profile',authToken,userController.getProfile);
router.patch('/profile',authToken,userController.updateProfile);
router.delete('/',authToken,userController.deleteUser);
router.post('/avatar',authToken,userController.uploadAvatar);
router.put('/password',authToken,userController.updatePassword);

module.exports = router;