const User = require('../model/userModel');

exports.createUser = (req,res,next)=>{
    console.log(req.body);
    let newUser = req.body;
    const user = new User(null,newUser.fistName,newUser.lastName,newUser.birthday,newUser.phone,newUser.gender,newUser.address,newUser.email,newUser.password);
    console.log(user)
     user.save()
    .then((result) => {
        res.status(200).json({result});
     }).catch((err) => {
         console.log(err);
     });
    
}