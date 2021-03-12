const Product = require("../Service/product.service");
const Trademark = require("../Service/trademark.service");
const ImageProduct = require("../Service/imageProduct.service");
const cloudinary = require('../config/cloudinary.connect');

let fileFilter = (file) => {
    if (file.mimetype === 'image/png'
        || file.mimetype === 'image/jpeg'
        || file.mimetype === 'image/gif'
        || file.mimetype === 'image/jpg') {
        return true;
    }
    return false;
};

exports.getAll = async(req, res, next) => {
    try {
        let result = await Product.getAllProduct();
        if(!result){
            return res.status(404).json({
                message:"not found product...!",
                code :404
            });
        } 
        res.status(200).json({
            message:"get all product success...!",
            code :200,
            length: result.length,
            data:result
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            message:"get all product Error...!",
            code :500,
            error:e.message
        });
    }
};
exports.createProduct = async (req, res, next) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            throw new Error('fail upload fail..!')
        }
        let images = req.files.images;
        let trademark = await Trademark.findById(req.body.trademarkId);
        let productNew = req.body;
        let product = await Product.crateProduct(productNew);
        console.log(product);
        if(!product){
            throw new Error("creat new product fail...!");
        }
        const _id = product.productId;
        // await SaveImgProduct(images, productCode, trademark)
        let tName = trademark.name.replace(' ', '-');
        let _dirSave = "products/";//path.join(__dirname, `../public/img/products/${tName}/`);
        let d= new Date();
        await images.map((image,index) => {
        //check image is an image
            if (fileFilter(image)) {
                let imgName = `${tName}-${_id}-${d.getTime()+index}`;
                cloudinary.uploader.upload(image.tempFilePath,{
                    folder:_dirSave,
                    public_id:imgName,
                    unique_filename:true
                },async (err)=>{
                    if(err){console.log(err);}
                    else{
                       await ImageProduct.create(_id,imgName);
                    }
                })
            }else {
                console.log(`${image.name} is not an image...!`);
            }
        });
        res.status(200).json({
            message: "add product success...!",
            code: 200,
        });
    } catch (e) {
        res.status(500).json({
            message: "add product Error",
            code: 500,
            error: e.message
        })
    }
};
exports.getProductId = async (req, res, next) => {
    try {
        let _id = req.params.id;
        let product = await Product.findById(_id);
        if (!product) {
            return res.status(404).json({
                message: " not found product",
                code: 404
            });
        }
        res.status(200).json({
            message: "get product successful...!",
            code: 200,
            data: product
        });
    } catch (e) {
        res.status(500).json({
            message: "get product Error...!",
            code: 500,
            error: e.message
        });
    }
};
exports.deleteProduct = async (req, res, next) => {
    try {
        let _id = req.params.id;
        let result = await Product.deleteProductId(_id);
        if (!result) {
            throw new Error("can not delete product...! ")
        }
        let trademark = result.trademark.dataValues;
        // console.log(result);
        result.images.map(img => {
            cloudinary.uploader.destroy(`products/${img.path}`,{
                resource_type:"image"
            },(err)=>{
                if(err) console.log(err);
            })
        })
        console.log('delete one product ', result.name);
        res.status(200).json({
            message: "delete product successful...!!",
            code: 200,
            data: result
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            message: "delete product Error",
            code: 500,
            error: e.message
        })
    }
};
exports.updateProduct = async (req,res,next)=>{
    try {
        let _id = req.params.id;
        const result = await Product.updateProduct(_id,req.body);
        if(!result){
            throw new Error(result);
        }
        console.log(" updated ",_id);
        res.status(200).json({
           message:"update successful...!",
           data: result
        })
    } catch (e) {
        console.log("Error: ", e.message);
        res.status(500).json({
            message:"update error...!",
            code : 500,
            error: e.message
        });
    }
};