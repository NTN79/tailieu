const Trademark = require('../Service/trademark.service');



exports.createTrademark = async (req, res, next)=>{
    try {
        let trademarkNew = req.body;
        let trademark = await Trademark.createTrademark(trademarkNew);
        if(!trademark){
            return res.status(400).json({
                message:'create trademark fail...!',
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
            message:'create trademark Error...!',
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
                message:'Not found trademark...!',
                code:  404
            });
        }
        res.status(200).json({
            message:"get all successful...!",
            code:200,
            data: trademark
        })
    } catch (e) {
        res.status(500).json({
            message:"get all successful...!",
            code:500,
            error: e
        })
    }
};
exports.getTrademarkId = async (req,res,next)=>{
    try {
        let _id = req.params.id
        let trademark = await Trademark.findById(_id);
        if(!trademark){
            return res.status(404).json({
                message:`not found trademark`,
                code:404
            });
        }
        res.status(200).json({
            message:"get successful...!",
            code: 200,
            data: trademark
        });
    } catch (e) {
        res.status(500).json({
            message:"find data Error",
            code: 500,
            error: e
        });
    }
};
exports.updateTrademarkId = async (req, res, next)=>{
    try {
        let keyUpdate = Object.keys(req.body);
        if(keyUpdate.includes("trademarkId")){
            throw new Error('request not valid...!');
        }
        let _id = req.params.id;
        let result = Trademark.updateTrademark(_id,req);
        if(!result){
            return res.status(404).json({
                message:"Not found trademark",
                code:  404
            });
        }
        console.log(_id," updated trademark...!");
        let trademark = await Trademark.findById(_id);
        res.status(200).json({
            message:"updated trademark success...",
            code:200,
            data: trademark
        });
    } catch (e) {
        res.status(500).json({
            message: "update trademark Error",
            code : 500,
            error: e.message
        });
    }
};


const multer = require('multer');

let Storage = multer.diskStorage({
    filename:function(req,file,cb){
        cb(null,`trademark-${file.originalname.replace(' ','').toLocaleUpperCase()}`);
    },
    destination: function(req,file,cb){
        cb(null,'public/uploads/logo');
    }
})
exports.uploadLogoTrademark = multer({
    limits:{
        fieldSize: 1024*1024*3
    },
    fileFilter: function(req, file, cb) {
        if (!file.originalname.match(/(\.jpg|\.jpeg|\.png|\.gif)$/)) {
            return cb(new Error('file upload an image...!'), undefined);
        }
        cb(undefined, true);
    },
    storage: Storage
}).single('logo');
exports.updateLogo = async (req,res,next)=>{
   try {
       console.log(req.file);
   } catch (e) {
       console.log("cmm",e);
       res.json({
           message:"fail"
       })
   }
};