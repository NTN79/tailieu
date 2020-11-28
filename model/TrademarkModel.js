const imageProductModel = require("./imageProductModel");

module.exports = (sequelize, Sequelize) => {
    const Trademark = sequelize.define("trademark", {
      trademarkId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(50),
        unique:true,
        allowNull:false
      },
       description:{
        type:Sequelize.TEXT
      },
      image:{
        type: Sequelize.STRING(60)
      }
    },{
      freezeTableName: true
    });
    return Trademark;
  };