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
