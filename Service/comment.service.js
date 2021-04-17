const {Comment} = require('../config/connectDB');

exports.createComment = async (body)=>{
	try{
		let comment = Comment.build({
			content: body.content,
			commentId: body.commentId,
			productId: body.productId,
			userId: body.userId
		});
		let result = await comment.save();
		return result;

	}catch(e){
		 console.log("CreateError: ",e.message);
        return null;
	}
};
exports.findByCommentId = async (id)=>{
    try {
        console.log(id)

        let _comment = await Comment.findOne({
            where :{
                productId : id
            },
            include:["user","products"]
        });
        if(!_comment){
            throw  new Error("not found comment...!");
        };
        return _comment;
    } catch (e) {
        console.log("Error:",e.message);
        return null;
    }
};

exports.updateComment = async (id,body)=>{
    try {
        let _comment = await Comment.findOne({
            where :{
                productId :body.productId,
                commentId:id
            }
        });
        if(!_comment){
            throw new Error('not found comment...!')
        };
       _comment.content= body.content;
        let result = await _comment.save();
        if(!result){
            throw new Error(`update comment error...!${id}`);
        };
        return _comment; 
    } catch (e) {
        console.log("Error:",e.message);
        return null;
    }
};
exports.deleteComment = async (id)=>{
    try {
        let result = await Comment.destroy({
            force: true,
            where: {
    
                commentId:id
            }
        });
        if(!result){
            throw new Error("delete comment fail...!");
        }
        return result;
    } catch (e) {
        console.log("Error:",e.message);
        return  null;
    }
};