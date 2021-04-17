const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const auth = require('../middleware/authentication').authenticationToken;


router.get('/:id',blogController.getblogId);
router.post('/',blogController.createblog);
router.post('/logo/',[auth],blogController.updateLogo);
router.put('/:id',blogController.updateblog);
router.delete('/:id',blogController.deleteblog);


module.exports = router;
