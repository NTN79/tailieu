const {Blogs} = require('../config/connectDB');

exports.createblog = async (body)=>{
	try{
		let blog = Blogs.build({
            blogId: body.blogId,
            title: body.title,
			content: body.content,
			userId: body.userId
		});
		let result = await blog.save();
		return result;

	}catch(e){
		 console.log("CreateError: ",e.message);
        return null;
	}
};
exports.findByBlogId = async (id)=>{
    try {
        console.log(id)

        let _blog = await Blogs.findOne({
            where :{
                blogId: id
            },
        });
        if(!_blog){
            throw  new Error("not found blog...!");
        };
        return _blog;
    } catch (e) {
        console.log("Error:",e.message);
        return null;
    }
};

exports.updateblog = async (id,body)=>{
    try {
        let _blog = await Blogs.findOne({
            where :{
                blogId: id
            }
        });
        if(!_blog){
            throw new Error('not found blog...!')
        };
        _blog.title=body.title;
       _blog.content= body.content;
        let result = await _blog.save();
        if(!result){
            throw new Error(`update blog error...!${id}`);
        };
        return _blog
    } catch (e) {
        console.log("Error:",e.message);
        return null;
    }
};
exports.updateLogoBlog = async (id,logoName)=>{
    try {
        let result= await Blogs.update({
            image: logoName
        },{
            where:{
                blogId: id
            }
        });
        if(!result){
            throw new Error("update logo fail...!");
        }
        return result;
    } catch (e) {
        console.log("update Logo blog Error:",e.message);
        return null; 
    }
};
exports.deleteblog = async (id)=>{
    try {
        let result = await Blogs.destroy({
            force: true,
            where: {
                blogId:id
            }
        });
        if(!result){
            throw new Error("delete blog fail...!");
        }
        return result;
    } catch (e) {
        console.log("Error:",e.message);
        return  null;
    }
};