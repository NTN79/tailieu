const { Trademark } = require('../config/connectDB');
const { Op } = require('sequelize');

exports.createTrademark = async (body) => {
    try {
        let last_trademark = await Trademark.findAll({
            attributes:['trademarkId'],
            order:[['trademarkId','DESC']],
            limit:1,
            raw:true
        });
        let _id = last_trademark[0].trademarkId + 1;
        let trademarkNew = Trademark.build({
            trademarkId: _id,
            name: body.name.toLocaleUpperCase(),
            description: body.description
        });
        let result = await trademarkNew.save();
        console.log('created a trademark...!');
        return result;
    } catch (e) {
        console.log("Create trademark Error:",e.message);
        return null;
    }
};
exports.getAllTrademark = async()=>{
    try {
        let trademark = await Trademark.findAll();
        if(!trademark){
            throw new Error('connect trademark Error...!');
        }
        return trademark;
    } catch (e) {
        console.log("get trademark Error:",e.message);
        return null;
    }
};
exports.findById = async (id)=>{
    try {
        let trademark = await Trademark.findOne({
            where:{
                trademarkId: id
            },
            raw:true
        });
        if(!trademark){
            throw new Error("not found trademark...!");
        }
        return trademark;
    } catch (e) {
        console.log("find trademark Error:",e.message);
        return null;
    }
};
exports.updateTrademark= async (id, {body})=>{
    try {
        let result = await Trademark.update({
            name: body.name,
            description:body.description
        },{
            where:{trademarkId:id}
        });
        if(!result){
            throw new Error("update Trademark fail...!");
        }
        return result;
    } catch (e) {
        console.log("update trademark Error:",e.message);
        return null;
    }
};
exports.updateLogoTrademark = async (id,logoName)=>{
    try {
        let result= await Trademark.update({
            image: logoName
        },{
            where:{
                trademarkId: id
            }
        });
        console.log(result);
        if(!result){
            throw new Error("update logo fail...!");
        }
        let trademark = await Trademark.findOne({
            where:{
                trademarkId: id
            },
            raw:true
        });
        return trademark;
    } catch (e) {
        console.log("update Logo trademark Error:",e.message);
        return null; 
    }
};
exports.deleteTrademarkId = async (id)=>{
    try {
        let trademark = await Trademark.findOne({
            where :{
                trademarkId:id
            },
            include:["products"]
        });
        if(trademark.products.length>0){
            throw new Error('trademark can not delete...!')
        }
        let result = await Trademark.destroy({
            force:true,
            where: {
                trademarkId : id
            }
        });
        if(!result){
            throw new Error("not fond trademark delete...!");
        }
        console.log("delete a trademark...!")
        return result;
    } catch (e) {
        console.log("delete trademark Error:",e.message);
        return null;
    }
};
exports.getProductTrademark = async(id)=>{
    try {
        let products = await Trademark.findOne({
            where :{
                trademarkId:id
            },
            include:["products"]
        })
        if(!products){
            throw new Error('not find trademark...!');
        }
        return products;
    } catch (e) {
        console.log(e.message);
        return null;
    }
};