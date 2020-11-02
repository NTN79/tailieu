const {ImageProduct} =require("../config/connectDB");

exports.create = async(productId , body)=>{
    try {
        let _count = await ImageProduct.findAndCountAll({
            attributes:['id']
        });
        let imgNew = ImageProduct.build({
            id:  _count.count +1,
            path: body.path,
            productId: productId
        });
        let result = await imgNew.save();
        if(!result){
            throw new Error(`add image ${body.path} fail...!`);
        }
        return result;
    } catch (e) {
        console.log(e.message);
        return null;
    }
};
exports.delete = async(id)=>{
    try {
        let result = ImageProduct.destroy({
            force: true,
            where:{
                id:id
            }
        })
        if(!result){
            throw new Error('delete image product fail...!');
        }
        return result;
    } catch (e) {
        console.log(e.message);
        return null;
    }
};
exports.deleteProduct = async(productId)=>{
    try {
        let result = await ImageProduct.destroy({
            where:{
                productId: productId
            }
        });
        if(!result){
            throw new Error(`delete image product ${productId}`);
        }
        return result;
    } catch (e) {
        console.log(e.message);
        return null;
    }
};
