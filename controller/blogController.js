const user = require("../Service/user.service");
const blogService = require("../Service/blog.service");
let fileFilter = (file) => {
    if (file.mimetype === 'image/png'
        || file.mimetype === 'image/jpeg'
        || file.mimetype === 'image/gif'
        || file.mimetype === 'image/jpg') {
        return true;
    }
    return false;
}


// exports.getBlog = async (req,res,next)=>{

// 	try{
// 		let blog = await blogService.getblog();
// 		if(!blog)
// 		{
// 			return res.status(404).json({
// 				message:'not found blog',
//                 code: 404
// 			});
// 		}
// 		res.status(200).json({
//             message: 'create successful',
//             code: 200,
//             data: blog
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
exports.getblogId = async (req, res, next) => {
    try {
        let _id = req.params.id
        console.log(_id)
        let blog = await blogService.findByBlogId(_id);
        console.log("blog")
        if (!blog) {
            return res.status(404).json({
                message: `not found blog`,
                code: 404
            });
        }
        if(blog.image != null){
            let url_img = await cloudinary.url(`logo/${blog.image}`,{
                
                transformation:{
                    width:160,
                    height:60
                }
            });
            blog.image = url_img;
        }
        res.status(200).json({
            message: "get successful...!",
            code: 200,
            data: blog
        });
    } catch (e) {
        res.status(500).json({
            message: "find data Error",
            code: 500,
            error: e
        });
    }
};
exports.createblog = async (req, res, next) => {
    try {
        let blogNew = req.body;
        let t = new Date();
        let _id= t.getTime()-1618208270351;
        blogNew.userId =null;
        if (req.user) {
            blogNew.userId = req.user.userId;
           }
        blogNew.blogId = _id.toString();
        let blog = await blogService.createblog(blogNew);
        if (!blog) {
            return res.status(400).json({
                message: 'create blog fail',
                code: 400
            });
        }
        res.status(201).json({
            message: 'create successful',
            code: 201,
            data: blog
        });
        next();
    } catch (e) {
        res.status(500).json({
            message: 'create blog Error...!',
            code: 500,
            error: e.message
        });
    }
};
exports.updateblog = async (req,res,next)=>{
	try{
		let _id = req.params.id;
        let result = await blogService.updateblog(_id, req.body);
        if (!result) {
            return res.status(404).json({
                message: "Not found blog",
                code: 404
            });
        }
        console.log(_id, " updated blog");
        res.status(200).json({
            message: "updated blog success",
            code: 200,
            data: result
        });
	}catch (e) {
        res.status(500).json({
            message: "update blog Error",
            code: 500,
            error: e.message
        });
    }
};

exports.deleteblog = async (req, res, next) => {
    try {
        let _id = req.params.id;
        let result = await blogService.deleteblog(_id);
        if (!result) {
            return res.status(400).json({
                message: "delete blog fail...!",
                code: 400
            });
        }
        console.log(_id,"delete blog");
        let blog = await blogService.findByBlogId(_id);
         if (result.image !=null) {
            await cloudinary.uploader.destroy(`logo/${result.image}`,{
                resource_type:"image"
            })
        }
        res.status(200).json({
            message: "delete blog successful...!",
            code: 200
        });
    } catch (e) {
        res.status(500).json({
            message: "Error delete blog...!",
            code: 500,
            error: e.message
        });
    }
};
exports.updateLogo = async (req, res, next) => {
    try {
        if (!req.files || Array.isArray(req.files
            .logo)) {
            throw new Error(" image upload not empty...!");
        }
        let img = req.files.logo;
        if(!fileFilter(img)){
            throw new Error('file upload is not image...!')
        }
        const _dirSave = "logo/"; 
        let _id = req.params.id;
        let blog = await blogService.findByBlogId(_id);
        if(blog==null){
            throw new Error("not found blog...!")
        }
        // const fileName = `blog-${_id}-${blog.name.replace(' ', '')}`.toLocaleUpperCase();
        // let resultUpload =await cloudinary.uploader.upload(img.tempFilePath,{
        //     folder:_dirSave,
        //     public_id:fileName,
        //     unique_filename:true
        // });
        if(!resultUpload){
            throw new Error('image upload fail...!');
        }
        let result = await blogService.updateLogoBlog(_id,fileName);
        if (!result) {
            return res.status(400).json({
                message: "logo upload fail...!",
                code: 400
            });
        }
        res.status(200).json({
            message: "upload logo success...!",
            code: 200
        });
    } catch (e) {
        console.log("Error: ", e.message);
        res.json({
            message: "upload logo Error",
            code: 500,
            error: e.message
        });
    }
};
