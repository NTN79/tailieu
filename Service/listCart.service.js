const {ListCart} = require("../config/connectDB");

//['listCartId','status','sumPrice','payment','createdAt','userId'],
//status [0:cart new, 1:cart wait handling, 2:cart transport not payment, 3:cart payment, 4:complete]
//payment [0:tiền mặt, 1:chuyển khoản ]

exports.getAllListCart = async (option)=>{
    try {
        let result = await ListCart.findAll({
            include:['detailCarts'],
            where:option,
            order:[['listCartId','DESC']]
        });
        if(!result){
            throw new Error("List cart get fail...!");
        }
        return result;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}
exports.getListCart= async (option)=>{
    try {
        let result = await ListCart.findOne({
            where:option
        });
        if(!result){
            throw new Error(`List cart ${id} get fail...!`);
        }
        return result;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}

exports.createListCart = async (userId)=>{
    try {
        let newCart = ListCart.build({
            status:0,
            sumPrice:0,
            userId:userId
        })
        let cart = await newCart.save();
        if(!cart){
            throw new Error("create cart new fail...!");
        }
        return cart;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}
exports.updateListCart = async (idCart,idUser,body)=>{
    try {
        let cart = await ListCart.findOne({
            where:{
                listCartId:idCart,
                userId:idUser
            }
        });
        if(!cart){
            throw new Error(`not found list cart ${idCart}`);
        }
        let data ={
            status:((body.status!=undefined&&Number.isInteger(body.status))?body.status:cart.status),
            payment:((body.payment!=undefined&&Number.isInteger(body.payment))?body.payment:cart.payment),
            shipping:((body.shipping)?body.shipping:'FREE_SHIP'),
            note:((body.note)?body.note:'')
        };
        const result = await ListCart.update(data,{
            where:{
                listCartId:idCart
            }
        });
        if(!result){
            throw new Error("update List cart fail...!");
        }
        return result;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}
exports.deleteListCart = async (idCart,idUser)=>{
    try {
        let cart = await ListCart.findOne({
            where:{
                listCartId:idCart,
                userId:idUser
            }
        });
        if(!cart){
            throw new Error("not found cart...!");
        }
        let result = await ListCart.destroy({
            where:{
                listCartId:idCart,
                userId:idUser
            }
        })
        return result;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}
