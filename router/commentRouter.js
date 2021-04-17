const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');

router.get('/:id',commentController.getCommentId);
router.post('/',commentController.createComment);
router.put('/:id',commentController.updateComment);
router.delete('/:id',commentController.deleteComment);

module.exports = router;


