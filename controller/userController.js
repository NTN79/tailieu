const { Users } = require('../config/connectDB');
const User = require('../model/userModel');

exports.createUser = async (req,res,next)=>{
    const user = User.build({
        fistName: req.body.fistName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        phone: req.body.phone,
        gender: (req.body.gender)?req.body.gender:"nam",
        address: req.body.address,
        email: req.body.email,
        password: req.body.password,
        roleId: (req.body.role)?req.body.role: 2
    })
    

}