
const Product = require("../Service/product.service");
const Trademark = require("../Service/trademark.service");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
let Storage = multer.diskStorage({
    filename:function(req,file,cb){
        cb(null,`${req.body.name}${file.originalname.replace(' ','').toLocaleUpperCase()}`);
    },
    destination:`public/img/products/`
})
const uploadFile = multer({
    limits:{
        fieldSize: 1024*1024*3
    },
    fileFilter: function(req, file, cb) {
       if(file. mimetype ==='image/png'||file. mimetype ==='image/jpeg'||file. mimetype ==='image/gif'||file. mimetype ==='image/jpg')  {
            cb(null, true);
        }
        cb(null, false);
    },
    storage: Storage
}).array("image",10);

exports.createProduct = async (req, res, next) => {
    try {
        uploadFile(req,res,(err)=>{
            if(err){
                throw new Error(e.message);
            }else if(err instanceof multer.MulterError){
                throw new Error(err.message);
            }
            console.log(req.files);
            res.json({
                message: req.body,
                data:req.files
            })
        });
       
    } catch (e) {
        res.json({
            message: e.message
        })
    }
};
exports.getProduct = async (req, res, next) => {
    try {

        res.json({
            message: "ok"
        })
    } catch (e) {
        res.json({
            message: e.message
        })
    }
}