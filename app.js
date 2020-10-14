const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const userRouter = require('./router/userRouter');
require('dotenv').config({path:"./.env"});

//connect db
const dbShop = require('./config/connectDB');
dbShop.sequelize.sync().then( async()=>{
  console.log('db connect...!!');
}).catch((e)=>{
  console.log(e,'db connect fail  ...!')
});

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//router api
app.use('/api/user',userRouter);


//app listen port
const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log('app listen port:',port);
})  