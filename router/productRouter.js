const express = require("express");
const router = express.Router();
const productsController = require("../controller/productsController");

router.get('/',productsController.getAll);
router.get('/:id',productsController.getProductId);
router.post('/',productsController.createProduct);
router.delete('/:id',productsController.deleteProduct);
router.patch('/:id',productsController.updateProduct);
module.exports = router;