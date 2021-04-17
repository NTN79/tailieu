const product = require("../Service/product.service");
const user = require("../Service/user.service");
const commentService = require("../Service/comment.service");

// exports.getComment = async (req,res,next)=>{

// 	try{
// 		let comment = await commentService.getComment();
// 		if(!comment)
// 		{
// 			return res.status(404).json({
// 				message:'not found comment',
//                 code: 404
// 			});
// 		}
// 		res.status(200).json({
//             message: 'create successful',
//             code: 200,
//             data: comment
//         });
//         next();
// 	}catch (e) {
//         console.error(e.message);
//         res.status(500).json({
//             code:500,
//             message:e.message
//         });
//     }
// };
exports.getCommentId = async (req, res, next) => {
    try {
        let _id = req.params.id
        console.log(_id)
        let comment = await commentService.findByCommentId(_id);
        console.log("comment")
        if (!comment) {
            return res.status(404).json({
                message: `not found comment`,
                code: 404
            });
        }
        res.status(200).json({
            message: "get successful...!",
            code: 200,
            data: comment
        });
    } catch (e) {
        res.status(500).json({
            message: "find data Error",
            code: 500,
            error: e
        });
    }
};
exports.createComment = async (req, res, next) => {
    try {
        let commentNew = req.body;
        let t = new Date();
       	let _id= t.getTime()-1618208270351;
       	commentNew.userId =null;
       	if (req.user) {
       		commentNew.userId = req.user.userId;
       	}
       	commentNew.commentId = _id.toString();
        let comment = await commentService.createComment(commentNew);
        if (!comment) {
            return res.status(400).json({
                message: 'create comment fail',
                code: 400
            });
        }
        res.status(201).json({
            message: 'create successful',
            code: 201,
            data: comment
        });
        next();
    } catch (e) {
        res.status(500).json({
            message: 'create comment Error...!',
            code: 500,
            error: e.message
        });
    }
};
exports.updateComment = async (req,res,next)=>{
	try{
		let _id = req.params.id;
        let result = await commentService.updateComment(_id,req.body);
        if (!result) {
            return res.status(404).json({
                message: "Not found comment",
                code: 404
            });
        }
        console.log(_id, " updated comment");
        res.status(200).json({
            message: "updated comment success",
            code: 200,
            data: result
        });
	}catch (e) {
        res.status(500).json({
            message: "update comment Error",
            code: 500,
            error: e.message
        });
    }
};

exports.deleteComment = async (req, res, next) => {
    try {
        let _id = req.params.id;
        let result = await commentService.deleteComment(_id);
        if (!result) {
            return res.status(400).json({
                message: "delete comment fail...!",
                code: 400
            });
        }
        console.log(_id, " delete comment");
        let comment = await commentService.findByCommentId(_id);
        res.status(200).json({
            message: "delete comment successful...!",
            code: 200,
            data: comment
        });
    } catch (e) {
        res.status(500).json({
            message: "Error delete comment...!",
            code: 500,
            error: e.message
        });
    }
};
