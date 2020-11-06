
const Product = require("../Service/product.service");
const Trademark = require("../Service/trademark.service");
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
}
exports.createProduct = async (req, res, next) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            throw new Error('fail upload fail..!')
        }
        let listImg = [];
        let images = req.files.images;
        let trademark = await Trademark.findById(req.body.trademarkId);
        let _dirSave = path.join(__dirname, `../public/img/products/${trademark.name}/`);
        const productCode = req.body.code;
        await images.map((image, index) => {
            //check image is an image
            if (fileFilter(image)) {
                let imgName = `${trademark.name}-${productCode}-${index + 1}.jpeg`;
                image.mv(`${_dirSave}${imgName}`, (err) => {
                    if (err) {
                        throw new Error('move file error...!');
                    }
                    listImg.push(imgName);
                    if (index === images.length - 1) {
                        //req.body.images = listImg;
                        console.log(listImg);
                        res.status(200).json({
                            message: "success...",
                            data: req.body,
                            img: listImg
                        });
                    }
                });
            }
            else {
                console.log(`${image.name} is not an image...!`);
            }
        });
    } catch (e) {
        res.status(500).json({
            message: "add product Error",
            code: 500,
            error:e.message
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