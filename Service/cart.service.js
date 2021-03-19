const {DetailCart}= require('../config/connectDB');

exports.createCart = async(body,CartId)=>{
    try {
        let checkCart = await DetailCart.findOne({
            where:{
                listCartId:CartId,
                productId:body.productId
            }, 
        })
        if(checkCart){
            checkCart.quantity= checkCart.quantity+body.quantity;
        }
        else{
            checkCart = DetailCart.build({
                productId:body.productId,
                quantity:((body.quantity)?body.quantity:1),
                Price:body.price,
                listCartId:CartId
            });
        }
        const result = await checkCart.save();
        if(!result){
            throw new Error("add Cart fail...!");
        }
        return result
    } catch (e) {
        console.log("create cart: "+e.message);
        return null;
    }
}
exports.getAllListCart=async(CartId)=>{
    try {
        console.log(CartId);
        const data = await DetailCart.findAll({
            where:{
                listCartId:CartId
            }, 
            include:["products"]
        });
        if(!data){
            throw new Error("get all detail list cart fail...!");
        }
        return data;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}
exports.getCart = async (option)=>{
    try {
        const data = await DetailCart.findOne({
            where:option,
            include:["products"]
        });
        if(!data){
            throw new Error("get all detail list cart fail...!");
        }
        return data;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}
exports.updateCart = async(CartId,body)=>{
    try {
        let cart = await DetailCart.findOne({
            where:{
                productId:body.productId,
                CartId:CartId
            }
        });
        if(!cart){
            throw new Error("not found Cart Update...!");
        }
        const result= await DetailCart.update({
            quantity:body.quantity
        },{
            where:{
                CartId:CartId,
                id:cart.id
            }
        })
        if(!result){
            throw new Error("update cart Detail fail...!");
        }
        return result;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}
exports.deleteCart = async (option)=>{
    try {
        let cart = null;
        if(!option.productId){
            cart = await DetailCart.findAll({
                where:option
            });
        }
        else{
            cart = await DetailCart.findOne({
                where:option
            });
        }
        if(!cart){
            throw new Error("not found product in Cart...!");
        }
        const result = await DetailCart.destroy({
            where:option
        });
        if(!result){
            throw new Error("delete cart fail...!");
        }
        return result;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}