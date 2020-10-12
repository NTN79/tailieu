require('dotenv').config({path:'../.env'});

module.exports={
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: '',
    nameDB: process.env.DB_NAME,
    dialect: "mysql",
}