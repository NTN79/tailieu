const {Province} = require('../config/connectDB')

exports.create = async (body)=>{
    try {
        let province = Province.build({
            id:Number(body.id),
            name: body.name,
            type:(body.type)?body.type:"",
            location: (body.location)?body.location:""
        });
        const result = await province.save();
        return result;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}
exports.getAll = async()=>{
    try {
        let provinces = await Province.findAll({
            include:["districts"]
        });
        if(!provinces){throw new Error('not fond...')}
        return provinces;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}