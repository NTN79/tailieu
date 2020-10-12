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
// databaseShop.role.belongToMany(databaseShop.Users,{
//   through:"fk_USER_ROLE",
//   fo
// })

module.exports = databaseShop;