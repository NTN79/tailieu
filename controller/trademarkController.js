const Trademark = require('../Service/trademark.service');
const fs = require('fs');
const path = require("path");

let fileFilter = (file) => {
    if (file.mimetype === 'image/png'
        || file.mimetype === 'image/jpeg'
        || file.mimetype === 'image/gif'
        || file.mimetype === 'image/jpg') {
        return true;
    }
    return false;
}

exports.createTrademark = async (req, res, next) => {
    try {
        let trademarkNew = req.body;
        let trademark = await Trademark.createTrademark(trademarkNew);
        if (!trademark) {
            return res.status(400).json({
                message: 'create trademark fail...!',
                code: 400
            });
        }
        res.status(201).json({
            message: 'create successful...!!',
            code: 201,
            data: trademark
        })
    } catch (e) {
        res.status(500).json({
            message: 'create trademark Error...!',
            code: 500,
            error: e.message
        });
    }
};
exports.getAllTrademark = async (req, res, next) => {
    try {
        let trademark = await Trademark.getAllTrademark();
        if (!trademark) {
            return res.status(404).json({
                message: 'Not found trademark...!',
                code: 404
            });
        }
        res.status(200).json({
            message: "get all successful...!",
            code: 200,
            data: trademark
        })
    } catch (e) {
        res.status(500).json({
            message: "get all successful...!",
            code: 500,
            error: e
        })
    }
};
exports.getTrademarkId = async (req, res, next) => {
    try {
        let _id = req.params.id
        let trademark = await Trademark.findById(_id);
        if (!trademark) {
            return res.status(404).json({
                message: `not found trademark`,
                code: 404
            });
        }
        res.status(200).json({
            message: "get successful...!",
            code: 200,
            data: trademark
        });
    } catch (e) {
        res.status(500).json({
            message: "find data Error",
            code: 500,
            error: e
        });
    }
};
exports.updateTrademarkId = async (req, res, next) => {
    try {
        let keyUpdate = Object.keys(req.body);
        if (keyUpdate.includes("trademarkId")) {
            throw new Error('request not valid...!');
        }
        let _id = req.params.id;
        let result = Trademark.updateTrademark(_id, req);
        if (!result) {
            return res.status(404).json({
                message: "Not found trademark",
                code: 404
            });
        }
        console.log(_id, " updated trademark...!");
        let trademark = await Trademark.findById(_id);
        res.status(200).json({
            message: "updated trademark success...",
            code: 200,
            data: trademark
        });
    } catch (e) {
        res.status(500).json({
            message: "update trademark Error",
            code: 500,
            error: e.message
        });
    }
};
exports.updateLogo = async (req, res, next) => {
    try {
        if (!req.files || Array.isArray(req.files.logo)) {
            throw new Error(" image upload not empty...!");
        }
        let img = req.files.logo;
        if(!fileFilter(img)){
            throw new Error('file upload is not image...!')
        }
        let _dirSave = path.join(__dirname, `../public/img/logo/`);
        let _id = req.params.id;
        let trademark = await Trademark.findById(_id);
        let fileName = `trademark-${_id}-${trademark.name.replace(' ', '')}`.toLocaleUpperCase();
        await img.mv(`${_dirSave}${fileName}.jpg`,(err)=>{
            if(err){
                throw new Error(err.message);
            }
        });
        let result = await Trademark.updateLogoTrademark(_id,`${fileName}.jpg`);
        if (!result) {
            return res.status(400).json({
                message: "logo upload fail...!",
                code: 400
            });
        }
        console.log(result.name,' trademark updated...!');
        res.status(200).json({
            message: "success...!",
            code: 200,
            data: result
        });
    } catch (e) {
        console.log("Error: ", e.message);
        res.json({
            message: "upload logo Error",
            code: 500,
            error: e.message
        });
    }
};
exports.deleteTrademark = async (req, res, next) => {
    try {
        let _id = req.params.id;
        let trademark = await Trademark.findById(_id);
        let result = await Trademark.deleteTrademarkId(_id);
        if (!result) {
            return res.status(400).json({
                message: "delete trademark fail...!",
                code: 400
            });
        }
        if (trademark.image) {
            fs.unlink(`./public/img/logo/${trademark.image}`, (err) => {
                if (err) {
                    console.log(err.message);
                }
            });
        }
        res.status(200).json({
            message: "delate trademark successful...!",
            code: 200
        });
    } catch (e) {
        res.status(500).json({
            message: "Error delete trademark...!",
            code: 500
        });
    }
};