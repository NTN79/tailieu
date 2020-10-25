const Trademark = require('../Service/trademark.service');

exports.createTrademark = async (req, res, next)=>{
    try {
        let trademarkNew = req.body;
        let trademark = await Trademark.createTrademark(trademarkNew);
        if(!trademark){
            return res.status(400).json({
                messenger:'create trademark fail...!',
                code: 400
            });
        }
        res.status(201).json({
            messenger: 'create successful...!!',
            code: 201,
            data: trademark
        })
    } catch (e) {
        res.status(500).json({
            messenger:'create trademark Error...!',
            code: 500,
            error:  e.message
        });
    }
};
exports.getAllTrademark = async (req, res, next)=>{
    try {
        let trademark = await Trademark.getAllTrademark();
        if(!trademark){
            return res.status(404).json({
                messenger:'Not found trademark...!',
                code:  404
            });
        }
        res.status(200).json({
            messenger:"get all successful...!",
            code:200,
            data: trademark
        })
    } catch (e) {
        res.status(500).json({
            messenger:"get all successful...!",
            code:500,
            error: e
        })
    }
};
