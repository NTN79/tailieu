const User = require('../Service/user.service');

exports.getAll = async (req,res,next)=>{
    try {
        let users = await User.getAllUser();
        if(!users){
            return res.status(404).json({
                messenger:'not found...!',
                code :404
            });
        }
        res.status(200).json({
            messenger:'successful...!',
            data:users
        })
    } catch (e) {
        res.status(500).json({
            messenger:'error...',
            code: 500,
            error: e
        })
    }
};
exports.createUser = async (req,res,next)=>{
    try {
       let user = await User.createUser(req);
       if(!user){
           return res.status(400).json({
               messenger:"create User fails...!!",
               code:400
           });
       }
       console.log('create a new user...!')
       res.status(201).json({
           messenger:'create success...!!',
           code : 201,
           data: user
       });
    } catch (e) {
        res.status(500).json({
            messenger:'Error created...!',
            code:500,
            error: e
        });
    }
}
exports.loginUser = async (req,res,next)=>{
    try {
        let login ={
            email: req.body.email,
            password: req.body.password
        }
        let user = await User.findByUser(login)
        if(!user){
            return res.status(400).json({
                messenger:"email or password wrong...!",
                code:400
            });
        }
        res.status(200).json({
            messenger:'login success...!',
            code : 200,
            data:user
        });
    } catch (e) {
        res.status(500).json({
            messenger:'login Error...!',
            code:500,
            error:e
        });
    }
}