const ListCArt = require("../Service/listCart.service");
const DetailCart = require("../Service/cart.service");

exports.getAllCart = async (req,res,next)=>{
    try {
        let where ={userId:req.user.userId};
        if(req.role==="ADMIN"){
            where={};
        }
        let dataList = await ListCArt.getAllListCart(where);
        if(!dataList){
            return res.status(404).json({
                message:"not found List Cart...!",
                code: 404
            });
        }
        res.status(200).json({
            message:"success...!",
            code: 200,
            data:dataList
        });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({
            code:500,
            message:e.message
        });
    }
}
exports.getCartReady = async (req,res,next)=>{
    try {
        let option ={
            status:0,
            userId:req.user.userId,
        }
        let data = await ListCArt.getListCart(option);
        if(!data){
            return res.status(404).json({
                message:"not found List Cart...!",
                code: 404
            });
        }
        let dataDetail = await DetailCart.getAllListCart(data.listCartId);
        res.status(200).json({
            message:"success...!",
            code: 200,
            data:data,
            itemLength:dataDetail.length,
            items:dataDetail
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            code:500,
            message:e.message
        });
    }
}
exports.getCartId =async (req,res,next)=>{
    try {
        let option ={
            listCartId:req.params.id,
        }
        let data = await ListCArt.getListCart(option);
        if(!data){
            return res.status(404).json({
                message:"not found List Cart...!",
                code: 404
            });
        }
        let dataDetail = await DetailCart.getAllListCart(req.params.id);
        res.status(200).json({
            message:"success...!",
            code: 200,
            dataCart:data,
            itemLength:dataDetail.length,
            items:dataDetail
        });
    } catch (e) {
        res.status(500).json({
            code:500,
            message:e.message
        });
    }
}
//add product and create list cart ......
exports.createListCart =async (req,res,next)=>{
    try {
        let userId = req.user.userId;
        let option={
            userId:userId,
            status:0
        }
        let cartReady = await ListCArt.getListCart(option);
        if(cartReady==null){
            cartReady = await ListCArt.createListCart(userId);
            if(!cartReady){
                return res.status(400).json({
                    message: "can not create list cart...!",
                    code: 400
                });
            }
        }
        if(req.body.cartTemp){
            let cartTemp =req.body.cartTemp;
            await cartTemp.map( x=>{     
                DetailCart.createCart(x,cartReady.listCartId);
            });
        }
        res.status(201).json({
            message: "create list cart success...!",
            code: 201,
            data: cartReady
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            code:500,
            message:e.message
        });
    }
}
//update payment and status payment list cart......
exports.updateListCart = async (req,res,next)=>{
    try {
        let userId = req.user.userId;
        let cartId = req.params.id;
        let condition ={
            userId:userId,
            listCartId:cartId
        };
        let cart = await ListCArt.getListCart(condition);
        if(!cart){
            res.status(404).json({
                message:"not found cart...!",
                code:404
            });
        }
        if(cart.status===4){
            throw new Error("can not update cart completed...!")
        }
        let result = await ListCArt.updateListCart(cartId,userId,req.body);
        if(!result){
            throw new Error("update cart fail...!")
        }
        res.status(200).json({
            message: "update list cart success...!",
            code: 200
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            code:500,
            message:e.message
        });
    }
}
exports.deleteItemCart = async (req,res,next)=>{
    try {
        let productId = req.body.productId;
        let cartId = req.body.cartId;
        if(!productId || !cartId){
            throw new Error("bad Request.")
        }
        let cart = await ListCArt.getListCart({
            listCartId:cartId,
            status:0,
            userId: req.user.userId
        });
        if(!cart){
            throw new Error("not found cart...!");
        }
        const result = await DetailCart.deleteCart({
            productId:productId,
            listCartId:cartId
        });
        if(!result){
            return res.status(400).json({
                message:"delete product in cart fail...!",
                code:400,
                error: "bad Request."
            });
        }
        res.status(200).json({
            message:"success...!",
            code:200
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            code:500,
            message:e.message
        });
    }
}
exports.deleteListCart = async (req,res,next)=>{
    try {
        let cartId = req.body.cartId;
        let userId = req.user.userId;
        if(!Number.isInteger(cartId)){
            throw new Error("bad Request.")
        }
        let option ={listCartId:cartId,userId: req.user.userId};
        if(req.role==="ADMIN"){
            userId = req.body.userId;
            option ={listCartId:cartId,userId: req.body.userId};
        }
        console.log(option);
        let cart = await ListCArt.getListCart(option);
        if(cart.status===0||!cart){
            throw new Error("can not delete cart...!");
        }
        await DetailCart.deleteCart({
            listCartId:cart.listCartId,
        });
        const result = await ListCArt.deleteListCart(cartId,userId);
        if(!result){
            return res.status(400).json({
                message:"delete cart fail...!",
                code:400,
                error: "bad Request."
            });
        }
        res.status(200).json({
            message:"success...!",
            code:200
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            code:500,
            message:e.message
        });
    }
}