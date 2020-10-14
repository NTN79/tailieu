require('dotenv').config({path:'../.env'});

module.exports={
    host: process.env.HOST_DB || 'localhost',
    user: process.env.USER_DB || 'root',
    password: '',
    nameDB: process.env.DB_NAME || 'project-shop' ,
    dialect: "mysql",
}