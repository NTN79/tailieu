const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const morgan = require('morgan')
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const userRouter = require('./router/userRouter');
const trademarkRouter = require('./router/trademarkRouter');
const productRouter = require('./router/productRouter');
const cartRouter = require("./router/ListCartRouter");
const vietnamRouter = require('./router/vietnamRouter');
const commentRouter = require('./router/commentRouter');
const blogRouter = require('./router/blogRouter');

//option upload file
const fileUpload = require("express-fileupload");
app.use(fileUpload({
  limits:{
    fileSize: 3*1024*1024
  },
  useTempFiles:true,
  preserveExtension:4
}));

//connect db 
const dbShop = require('./config/connectDB');
dbShop.sequelize.sync().then( async()=>{
  console.log('db connect...!!');
}).catch((e)=>{
  console.log(e,'db connect fail  ...!')
});


app.use(morgan('dev'));
// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(function(req, res, next) {
  res.header('application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', "true")
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  next();
});


//ignoreFavicon
const ignoreFavicon=(req, res, next)=> {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end()
  }
  next();
}
app.use(ignoreFavicon);

// router api
app.use('/api/user',userRouter);
app.use('/api/trademark',trademarkRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/vietnam',vietnamRouter);
app.use('/api/comment',commentRouter);
app.use('/api/blog',blogRouter);

// app.use('*',(req,res,next)=>{
//   const error = new Error("page not found...!");
//   error.status = 404;
//   next(error);
// });
// app.use((error,req,res,next)=>{
//   console.log(error)
//   res.status(error.status||500);
//   res.send({
//     message:"ABCShop project shop...!",
//     member1:"Vo Hoang ky-DH51704991",
//     member2:"Nguyen Trong Nghia-DH5700968",
//     error: error.message
//   });
// });

if(process.env.NODE_ENV==='production'){
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

//app listen port
const port = process.env.PORT|| 8080 ;
app.listen(port,()=>{
    console.log(`app listen port: " ${port} "`);
})  