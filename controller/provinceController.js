const ProvinceService = require("../Service/province.service");

exports.create = async (req,res,next)=>{
    try {
        let arr= req.body.data;
        await arr.map(async x=>{
            await ProvinceService.create(x);
        })
        res.status(201).json({
            message:"success...!",
            code: 201,
            // data:data,
            // itemLength:dataDetail.length,
            // items:dataDetail
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            code:500,
            message:e.message
        });
    }
}
exports.getAll = async(req,res,next)=>{
    try {
        let data = await ProvinceService.getAll();
        if(!data){
            return res.status(404).json({
                message:"not found data",
                code:404
            });
        }
        return res.status(200).json({
            message:"not found data",
            code:200,
            length:data.length,
            data:data
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            code:500,
            message:e.message
        });
    }
}