const express = require('express');
const router = express.Router();
const trademarkController = require('../controller/trademarkController');
const auth = require('../middleware/authentication').authenticationToken;
const {isAdminShop} = require('../middleware/checkRole');


router.get('/',[auth,isAdminShop],trademarkController.getAllTrademark);
router.post('/',[auth,isAdminShop],trademarkController.createTrademark);
router.get('/detail/:id',trademarkController.getTrademarkId);
router.patch('/detail/:id',[auth,isAdminShop],trademarkController.updateTrademarkId);
router.post('/logo/:id',trademarkController.uploadLogoTrademark,trademarkController.updateLogo);
module.exports = router;
