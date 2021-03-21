const express = require("express");
const router = express.Router();
const productsController = require("../controller/productsController");
const auth = require('../middleware/authentication').authenticationToken;
const {isAdminShop}= require('../middleware/checkRole');

router.get('/',productsController.getAll);
router.get('/:id',productsController.getProductId);
router.post('/',[auth,isAdminShop],productsController.createProduct);
router.post('/images',[auth,isAdminShop],productsController.uploadImages);
router.delete('/:id',[auth,isAdminShop],productsController.deleteProduct);
router.patch('/:id',[auth,isAdminShop],productsController.updateProduct);
module.exports = router;