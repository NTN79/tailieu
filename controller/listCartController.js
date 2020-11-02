// const {ListCart} = require('../config/connectDB');

// exports.create = async(req,res,next)=>{
//     try {
//         let obj = req.body;
//         let lsc = ListCart.build({
//             listCartId: obj.listCartId,
//             status: obj.status,
//             userId: req.user.userId 
//         });
//         let result = await lsc.save();
//         res.status(201).json({
//             data: result
//         })
//     } catch (e) {
//         res.status(201).json({
//             Error: e.message
//         })
//     }
// }