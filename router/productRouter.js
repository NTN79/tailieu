const express = require("express");
const router = express.Router();
const productsController = require("../controller/productsController");

router.get('/:id',productsController.getProductId);
router.post('/',productsController.createProduct);
router.delete('/:id',productsController.deleteProduct);

module.exports = router;