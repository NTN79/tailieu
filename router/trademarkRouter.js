const express = require('express');
const router = express.Router();
const trademarkController = require('../controller/trademarkController');
const auth = require('../middleware/authentication').authenticationToken;
const {isAdminShop} = require('../middleware/checkRole');


router.get('/',trademarkController.getAllTrademark);
router.get('/detail/:id',trademarkController.getTrademarkId);
router.post('/',[auth,isAdminShop],trademarkController.createTrademark);
router.post('/logo/:id',[auth,isAdminShop],trademarkController.uploadFile.single("logo"),trademarkController.updateLogo);
router.patch('/detail/:id',[auth,isAdminShop],trademarkController.updateTrademarkId);
router.delete('/:id',trademarkController.deleteTrademark);

module.exports = router;
