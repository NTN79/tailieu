const Product = require("../Service/product.service");
const Trademark = require("../Service/trademark.service");
const ImageProduct = require("../Service/imageProduct.service");
const path = require("path");
const fs = require("fs");

let fileFilter = (file) => {
    if (file.mimetype === 'image/png'
        || file.mimetype === 'image/jpeg'
        || file.mimetype === 'image/gif'
        || file.mimetype === 'image/jpg') {
        return true;
    }
    return false;
};
let SaveImgProduct = async (images, productCode, trademark, callback) => {
    let _dirSave = path.join(__dirname, `../public/img/products/${trademark.name}/`);
    const listFile = [];
    await images.forEach((image, index) => {
        //check image is an image
        if (fileFilter(image)) {
            let imgName = `${trademark.name}-${productCode}-${index + 1}.jpeg`;
            image.mv(`${_dirSave}${imgName}`, async (err) => {
                if (err) {
                    callback('move file error...!', undefined);
                }
                listFile.push(imgName);
                console.log('oke upload', index);
                if (index === images.length - 1) {
                    callback(undefined, listFile);
                }
            });
        }
        else {
            console.log(`${image.name} is not an image...!`);
        }
    });
}

exports.createProduct = async (req, res, next) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            throw new Error('fail upload fail..!')
        }
        let images = req.files.images;
        let trademark = await Trademark.findById(req.body.trademarkId);
        let productNew = req.body;
        let product = await Product.crateProduct(productNew);
        if(!product){
            throw new Error("creat new product fail...!");
        }
        const productCode = product.code;
        const _id = product.productId;
        await SaveImgProduct(images, productCode, trademark, async (err, data) => {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < data.length; i++) {
                await ImageProduct.create(_id, data[i]);
            }
            return res.status(201).json({
                message: "create product successful...!",
                code: 200,
                data: product,
                listImg: data
            })
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
        let _dirDelete = path.join(__dirname, `../public/img/products/${trademark.name}`);
        result.images.forEach(img => {
            fs.unlink(`${_dirDelete}/${img.path}`, (err) => {
                if (err) {
                    console.log(err.message);
                }
            })
        })
        console.log('delete one product ', _id);
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