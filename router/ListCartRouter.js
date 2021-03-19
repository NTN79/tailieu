const express = require("express");
const router = express.Router();
const ListCArtController = require("../controller/listCartController");
const authToken = require('../middleware/authentication').authenticationToken;
const {getRoleUser} = require('../middleware/checkRole');


router.get('/all',[authToken,getRoleUser],ListCArtController.getAllCart);
router.get('/:id',authToken,ListCArtController.getCartId);
router.get('',authToken,ListCArtController.getCartReady);
router.post('/',authToken,ListCArtController.createListCart);
router.patch('/:id',authToken,ListCArtController.updateListCart);
router.delete('/item',authToken,ListCArtController.deleteItemCart);
router.delete('/',[authToken,getRoleUser],ListCArtController.deleteListCart);

module.exports=router;