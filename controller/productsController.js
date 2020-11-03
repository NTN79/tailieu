
const Product = require("../Service/product.service");
const Trademark = require("../Service/trademark.service");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
let Storage = multer.diskStorage({
    filename:function(req,file,cb){
        cb(null,`${req.trademark}-${file.originalname.replace(' ','').toLocaleUpperCase()}`);
    },
    destination: function(req,file,cb){
        cb(null,`public/img/products/${req.trademark}`);
    }
})
exports.uploadFile = multer({
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
});

exports.saveImgProduct = (req, res, next) => {

    let form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        let trademark = await Trademark.findById(fields.trademarkId);
        // form.uploadDir = path.join(__dirname, `../public/img/products/${trademark.name}`);
        // //console.log(form.uploadDir);
        //   files.image.map(file => {
        //       fs.readFile(file.path,(err,data)=>{
        //         if(err){
        //             console.log("ERROR: %s",err.message);
        //             return;
        //         }
        //         fs.writeFile(file.uploadDir,data,(err)=>{
        //             if(err){
        //                 console.log("Save Fails: ", err.message);
        //                 return;
        //             }
        //             cononsole.log("complete...!");
        //         })
        //       });
        //   });
        // // form.on('fileBegin',function(name,file){
        // //     console.log("fil name:",file.name);
        // //     file.path = path.join(form.uploadDir,file.name);
        // //     console.log(file);
        // // });
        req.body = fields;
        req.files = files.image;
        req.trademark = trademark;
        // next();
    });

};

exports.createProduct = async (req, res, next) => {
    try {
        //console.log("files:",req.files);
        res.json({
            message: req.body
        })
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