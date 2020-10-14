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
databaseShop.role = require('../model/roleModel')(sequelize,Sequelize);
databaseShop.Products= require('../model/productModel')(sequelize,Sequelize);
databaseShop.Trademark = require('../model/TrademarkModel')(sequelize,Sequelize);
databaseShop.detailProduct = require('../model/detailProductModel')(sequelize,Sequelize);
databaseShop.ImageProduct = require('../model/imageProductModel')(sequelize,Sequelize);
const setRole= async()=>{
  databaseShop.ROLES=[];
  let roleData = await databaseShop.role.findAll({
    attributes:['id'],
  });
  await roleData.forEach(x => {
    databaseShop.ROLES.push(JSON.stringify(x.dataValues.id));
    console.log(x.dataValues.id)
  });
}
setRole();
databaseShop.Users.belongsTo(databaseShop.role,{
  foreignKey:"roleId",
  otherKey:"id"
});
databaseShop.ImageProduct.belongsTo(databaseShop.Products,{
  foreignKey:"productId",
  otherKey:"id"
});
databaseShop.Products.belongsTo(databaseShop.Trademark,{
  foreignKey:"trademarkId",
  otherKey:"id"
});
databaseShop.detailProduct.belongsTo(databaseShop.Products,{
  foreignKey:"productId",
  otherKey:"id"
});
databaseShop.Users.belongsToMany(databaseShop.Products,{
  through:"list-cart",
  foreignKey:"UserId",
  otherKey:"ProductId"
});
databaseShop.Products.belongsToMany(databaseShop.Users,{
  through:"list-cart",
  foreignKey:"ProductId",
  otherKey:"UserId"
});
module.exports = databaseShop;