const { Products } = require('../config/connectDB');
const DetailProduct = require("./detailProduct.service");
const ImageProduct = require("./imageProduct.service");
const fs = require("fs");


exports.getAllProduct = async()=>{
    try {
        let result = await Products.findAll({
            attributes:['productId','code','name'],
            include:["detail", "images"],
            order:[['productId','DESC']],
        });
        if(!result){
            throw new Error('get all product fail...!');
        }
        // result.forEach(async x => {
        //     await Products.update({productId:x.code},{
        //         where:{
        //             code:x.code,
        //             productId:x.productId
        //         }
        //     })
        // });
        return result;
    } catch (e) {
        console.log(e.message);
        return null;
    }
};

exports.crateProduct = async (body) => {
    try {
        let checkProduct = await Products.findOne({
            where:{
                code:body.code
            }
        });
        if(checkProduct){
            throw new Error("already have this product...!");
        }
        let productNew = Products.build({
            productId: body.code,
            name: body.name,
            gender:body.gender,
            code: body.code,
            price: body.price,
            description:body.description,
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

