const {ImageProduct} =require("../config/connectDB");

exports.create = async(productId , fileName)=>{
    try {
        let imgNew = ImageProduct.build({
            path: fileName,
            productId: productId
        });
        let result = await imgNew.save();
        if(!result){
            throw new Error(`add image ${fileName} fail...!`);
        }
        return result;
    } catch (e) {
        console.log(e.message);
        return null;
    }
};

exports.getAllImgProducts = async(id)=>{
    try {
        let imgList = ImageProduct.findOne({
            where:{
                productId:id
            },
            raw:true
        });
        if(!imgList){
            throw new Error("img empty...!");
        }
        return imgList;
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
