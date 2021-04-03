const {District}= require("../config/connectDB")

exports.create = async (body)=>{
    try {
        let district = District.build({
            id:Number(body.id),
            name:body.name,
            location:(body.location)?body.location:"",
            type:(body.type)?body.type:"",
            idProvince:body.tinh_id   
        });
        const result = await district.save();
        return result;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}
exports.getAll = async()=>{
    try {
        let district = await District.findAll();
        if(!district){throw new Error('not fond...')}
        return district;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}