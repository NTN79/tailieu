
const Product = require("../Service/product.service");
const Trademark = require("../Service/trademark.service");
const path = require("path");
const fs = require("fs");
// const multer = require("multer");

// let Storage = multer.diskStorage({
//     filename: function (req, file, cb) {
//         cb(null, `${req.body.name}${file.originalname.replace(' ', '').toLocaleUpperCase()}`);
//     },
//     destination: async (req, file, cb) => {
//         let trademark = await Trademark.findById(req.body.trademarkId);
//         cb(null, `public/img/products/${trademark.name}`);
//     }
// })
// exports.uploadFile = multer({
//     limits: {
//         fieldSize: 1024 * 1024 * 3
//     },
//     dest:"public/img/products/",
//     fileFilter: function (req, file, cb) {
//         if (file.mimetype === 'image/png'
//             || file.mimetype === 'image/jpeg'
//             || file.mimetype === 'image/gif'
//             || file.mimetype === 'image/jpg') {
//             cb(null, true);
//         }
//         cb(null, false);
//     }
// }).array('image', 10);

exports.createProduct = async (req, res, next) => {
    try {
        if(!req.files || Object.keys(req.files).length === 0){
            throw new Error('fail upload fail..!')
        }
        //console.log(req.files);
        //console.log(req.body);
        let images = req.files.image;
        _dirSave =path.join(__dirname,"../public/img/products/");
        images.map(image=>{
            image.mv(_dirSave+image.name,(err)=>{
                if(err){
                    throw new Error('move file error...!');
                }
            });
        });
        res.status(200).json({
            message: "success...",
            data: req.body,
            img: req.files.image
        });
        
    } catch (e) {
        res.status(500).json({
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