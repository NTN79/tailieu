const { Trademark } = require('../config/connectDB');
const { Op } = require('sequelize');

exports.createTrademark = async (body) => {
    try {
        let _countUsers = await Trademark.findAndCountAll({ attributes: ['id'] });
        let _id = _countUsers.count + 1;
        let trademarkNew = Trademark.build({
            id: _id,
            name: body.name.toLocaleUpperCase(),
            description: body.description
        });
        let result = await trademarkNew.save();
        console.log('created a trademark...!');
        return result;
    } catch (e) {
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
        return null;
    }
}