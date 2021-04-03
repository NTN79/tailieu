const DistrictService = require("../Service/district.service");

exports.create = async(req,res,next)=>{
    try {
        let arr= req.body.data;
        await arr.map(async x=>{
            await DistrictService.create(x);
        })
        res.status(201).json({
            message:"success...!",
            code: 201
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            code:500,
            message:e.message
        });
    }
}
