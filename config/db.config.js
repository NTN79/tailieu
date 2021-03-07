require('dotenv').config();
module.exports={
    host: process.env.HOST_DB ,
    user: process.env.USER_DB ,
    password: process.env.PASSWORD_DB,
    nameDB: process.env.DB_NAME ,
    dialect: "mysql",
}