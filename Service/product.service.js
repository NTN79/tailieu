const {Products} = require('../config/connectDB');
const DetailProduct = require("./detailProduct.service");
const ImageProduct = require("./imageProduct.service");
const {Op}= require('sequelize');

exports.crateProduct = async (body)=>{
    try {
        let _count = await Products.findAndCountAll();
        let productNew = Products.build({
            productId: _count.count+1,
            name: body.name,
            code: body.code,
            price: body.price,
            trademarkId: body.trademarkId,
            dayAdd: body.dayAdd,
            amount: body.amount
        });
        let product = await productNew.save();
        if(!product){
            throw new Error("create product new fail...!");
        }
        let detail = await DetailProduct.create(product.productId,body);
        product.dataValues.detail = detail;
        return product;
    } catch (e) {
        console.log(e.message);
        return null;
    }
};