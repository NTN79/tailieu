const {detailProduct} = require('../config/connectDB');

exports.create = async (productId , body)=>{
    try {
            let detail = detailProduct.build({
                madeIn: body.madeIn,
                color : body.color,
                quality: body.quality,
                function: body.function,
                machine: body.machine,
                strap: body.strap,
                waterproof: body.waterproof,
                size: body.size,
                thickness:body.thickness,
                guarantee: body.guarantee,
                productId: productId,
            });
            let result = await detail.save();
            return result;
    } catch (e) {
        console.log("CreateError: ",e.message);
        return null;
    }
};
exports.findByProductId = async (id)=>{
    try {
        let _detailProduct = await detailProduct.findOne({
            where :{
                productId : id
            },
            raw:true
        });
        if(!_detailProduct){
            throw  new Error("not found detail Product...!");
        };
        return _detailProduct;
    } catch (e) {
        console.log("Error:",e.message);
        return null;
    }
};
exports.update = async (id,body)=>{
    try {
        let _detailProduct = await detailProduct.findOne({
            where :{
                productId : id
            }
        });
        if(!_detailProduct){
            throw new Error('not found detail product...!')
        };
        _detailProduct.madeIn= body.madeIn;
        _detailProduct.color= body.color;
        _detailProduct.quality = body.quality;
        _detailProduct.function = body.function;
        _detailProduct.machine = body.machine;
        _detailProduct.size = body.size;
        let result = await _detailProduct.save();
        if(!result){
            throw new Error(`update detail product error...!${id}`);
        };
        return result 
    } catch (e) {
        console.log("Error:",e.message);
        return null;
    }
};
exports.delete = async (productId)=>{
    try {
        let result = await detailProduct.destroy({
            force: true,
            where: {
                productId:productId
            }
        });
        if(!result){
            throw new Error("delete detail product fail...!");
        }
        return result;
    } catch (e) {
        console.log("Error:",e.message);
        return  null;
    }
};