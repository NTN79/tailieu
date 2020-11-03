const express = require("express");
const router = express.Router();
const productsController = require("../controller/productsController");

router.get('/',productsController.getProduct)
router.post('/',productsController.saveImgProduct,productsController.uploadFile.array('image',5),productsController.createProduct);

module.exports = router;