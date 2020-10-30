const express = require('express');
const router = express.Router();
const trademarkController = require('../controller/trademarkController');
const auth = require('../middleware/authentication').authenticationToken;
const {isAdminShop} = require('../middleware/checkRole');

router.get('/',[auth,isAdminShop],trademarkController.getAllTrademark);
router.post('/',[auth,isAdminShop],trademarkController.createTrademark);
router.get('/detail/:id',trademarkController.getTrademarkId);

module.exports = router;
