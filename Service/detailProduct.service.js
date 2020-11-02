const {detailProduct} = require('../config/connectDB');

exports.create = async (productId , body)=>{
    try {
            let _count = await detailProduct.findAndCountAll({attributes:['id']});
            let detail = detailProduct.build({
                id: _count.count + 1,
                madeIn: body.madeIn,
                color : body.color,
                quality: body.quality,
                function: body.function,
                machine: body.machine,
                size: body.size,
                productId: productId,
            });
            let result = await detail.save();
            return result;
    } catch (e) {
        console.log("CreateError: ",e.message);
        return null;
    }
};
exports.findById = async (id)=>{
    try {
        let _detailProduct = await detailProduct.findOne({
            where :{
                id : id
            }
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
        let _detailProduct = await detailProduct.update({
            madeIn: body.madeIn,
            color : body.color,
            quality: body.quality,
            function: body.function,
            machine: body.machine,
            size: body.size
        },{
            where:{
                id:id
            }
        });
        if(!_detailProduct){
            throw new Error(`update detail product error...!${id}`);
        };
        let result = await detailProduct.findOne({
            where :{
                id:id
            }
        });
        return result 
    } catch (e) {
        console.log("Error:",e.message);
        return null;
    }
};
exports.delete = (id)=>{
    try {
        let result = await detailProduct.destroy({
            force: true,
            where: {
                id:id
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