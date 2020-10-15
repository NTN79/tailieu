const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authToken = require('../middleware/authentication').authenticationToken;

router.post('/',userController.createUser);
router.post('/login',userController.loginUser);
router.get('/',authToken,userController.getAll);
router.get('/profile',authToken,userController.getProfile);
router.post('/logout',authToken,userController.logoutUser);
module.exports = router;