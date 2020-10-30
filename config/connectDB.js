const DBConfig = require('./db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(DBConfig.nameDB,DBConfig.user,DBConfig.password,{
    host: DBConfig.host,
    dialect: DBConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
});

const databaseShop = {};

databaseShop.Sequelize = Sequelize;
databaseShop.sequelize = sequelize;
databaseShop.Users = require('../model/userModel')(sequelize,Sequelize);
databaseShop.Role = require('../model/roleModel')(sequelize,Sequelize);
databaseShop.Products= require('../model/productModel')(sequelize,Sequelize);
databaseShop.Trademark = require('../model/TrademarkModel')(sequelize,Sequelize);
databaseShop.detailProduct = require('../model/detailProductModel')(sequelize,Sequelize);
databaseShop.ImageProduct = require('../model/imageProductModel')(sequelize,Sequelize);
databaseShop.DetailCart = require("../model/detailCartModel")(sequelize,Sequelize);
databaseShop.Comment = require("../model/commentModel")(sequelize,Sequelize);
databaseShop.ListCart = require("../model/listCartModel")(sequelize,Sequelize);
databaseShop.Blogs = require("../model/blogModel")(sequelize,Sequelize);


const setRole= async()=>{
  databaseShop.ROLES=[];
  let roleData = await databaseShop.Role.findAll({
    attributes:['name'],
  });
  await roleData.forEach(x => {
    databaseShop.ROLES.push(x.dataValues.name);
  });
}
setRole();

databaseShop.Users.belongsTo(databaseShop.Role,{
  foreignKey:"roleId",
  otherKey:"id"
});
//Product
databaseShop.Products.hasMany(databaseShop.ImageProduct,{
  foreignKey:"productId",
  as:"images"
});
databaseShop.ImageProduct.belongsTo(databaseShop.Products,{
  foreignKey:"productId",
  as:"products"
});
databaseShop.Trademark.hasMany(databaseShop.Products,{ 
  foreignKey:"trademarkId",
  as:"products"
});
databaseShop.Products.belongsTo(databaseShop.Trademark,{
  foreignKey:"trademarkId",
  as:"trademark"
});
databaseShop.detailProduct.belongsTo(databaseShop.Products,{
  foreignKey:"productId",
  as:"products"
});
databaseShop.Products.hasMany(databaseShop.Comment,{
  foreignKey:"productId",
  as:"comments"
});
databaseShop.Comment.belongsTo(databaseShop.Products,{
  foreignKey:"productId",
  as:"products"
});
//ListCart
databaseShop.Users.belongsToMany(databaseShop.Products,{
  through:databaseShop.ListCart,
  foreignKey:"UserId",
  otherKey:"ProductId"
});
databaseShop.Products.belongsToMany(databaseShop.Users,{
  through:databaseShop.ListCart,
  foreignKey:"ProductId",
  otherKey:"UserId"
});
databaseShop.DetailCart.hasMany(databaseShop.ListCart,{
  foreignKey:"cartId",
  as:"listCart"
});
databaseShop.ListCart.belongsTo(databaseShop.DetailCart,{
  foreignKey:"cartId"
})
//User 
databaseShop.Users.hasMany(databaseShop.Comment,{
  foreignKey:"userId",
  as:"comments"
});
databaseShop.Comment.belongsTo(databaseShop.Users,{
  foreignKey:"userId",
  as:"user"
});
databaseShop.Users.hasMany(databaseShop.Blogs,{
  foreignKey:"userId",
  as:"blogs"
});
databaseShop.Blogs.belongsTo(databaseShop.Users,{
  foreignKey:"userId"
});


module.exports = databaseShop;