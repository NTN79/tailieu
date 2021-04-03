const ProvinceService = require("../Service/province.service");
const DistrictService = require("../Service/district.service");

exports.createProvince = async (req,res,next)=>{
    try {
        let arr= req.body.data;
        await arr.map(async x=>{
            await ProvinceService.create(x);
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
exports.createDistrict = async(req,res,next)=>{
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
exports.getAll = async(req,res,next)=>{
    try {
        let provinces = await ProvinceService.getAll();
        let districts = await DistrictService.getAll();
        if(!provinces || !districts){
            return res.status(404).json({
                message:"not found data",
                code:404
            });
        }
        return res.status(200).json({
            message:"not found data",
            code:200,
            provinceLength:provinces.length,
            provinces:provinces,
            districtLength:districts.length,
            districts:districts
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            code:500,
            message:e.message
        });
    }
}