const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const morgan = require("morgan")
const userRouter = require('./router/userRouter');
const trademarkRouter = require('./router/trademarkRouter');
require('dotenv').config({path:"./.env"});
const {Role}= require("./config/connectDB");


//connect db
const dbShop = require('./config/connectDB');
dbShop.sequelize.sync().then( async()=>{
  console.log('db connect...!!');
}).catch((e)=>{
  console.log(e,'db connect fail  ...!')
});

//handing Error
app.use(morgan('dev'));
app.use((req,res,next)=>{
  const error = new Error("page not found...!");
  error.status=404;
  next(error);
});
app.use((error,req,res,next)=>{
  console.log(error)
  res.status(error.status||500);
  res.json({
    error: error.message
  });
});
// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//router api
app.use('/api/user',userRouter);
app.use('/api/trademark',trademarkRouter);

//app listen port
const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log('app listen port:',port);
})  