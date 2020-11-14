const { Products } = require('../config/connectDB');
const DetailProduct = require("./detailProduct.service");
const ImageProduct = require("./imageProduct.service");
const fs = require("fs");


exports.crateProduct = async (body) => {
    try {
        let _count = await Products.findAndCountAll();
        let productNew = Products.build({
            productId: _count.count + 1,
            name: body.name,
            code: body.code,
            price: body.price,
            trademarkId: body.trademarkId,
            dayAdd: body.dayAdd,
            amount: body.amount
        });
        let product = await productNew.save();
        if (!product) {
            throw new Error("create product new fail...!");
        }
        let detail = await DetailProduct.create(product.productId, body);
        product.dataValues.detail = detail;
        return product;
    } catch (e) {
        console.log(e.message);
        return null;
    }
};
exports.findById = async (id) => {
    try {
        let product = await Products.findOne({
            where: {
                productId: id
            },
            include: ["trademark", "detail", "images"]
        });
        if (!product) {
            throw new Error('not find product id...!');
        }
        return product;
    } catch (e) {
        console.log(e.message);
        return null;
    }
};
exports.deleteProductId = async (id) => {
    try {
        let product = await Products.findOne({
            where: {
                productId: id
            },
            include: ["trademark", "detail", "images"]
        });
        if (!product) {
            throw new Error("not found product...!");
        }
        // await deleteProduct(product);
        await ImageProduct.deleteProduct(product.productId);
        await DetailProduct.delete(product.productId);
        let result = await Products.destroy({
            force: true,
            where: {
                productId: product.productId
            }
        });
        if (!result) {
            throw new Error("delete product fail...!");
        }
        return product;
    } catch (e) {
        console.log(e.message);
        return null;
    }
};
// const deleteProduct = async(product)=>{
//     await ImageProduct.deleteProduct(product.productId);
//     await DetailProduct.delete(product.productId);
//    let result = await Products.destroy({
//        force : true,
//        where:{
//            productId: product.productId
//        }
//    });
//    if(!result){
//     throw new Error("delete product fail...!");
//     }
// };
