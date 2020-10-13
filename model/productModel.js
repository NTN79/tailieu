module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      trademarkId:{
          type: Sequelize.INTEGER,
          allowNull:false
      },
      dayAdd:{
          type: Sequelize.DATE,
      },
      amount:{
          type:Sequelize.INTEGER
      }
    },{
      freezeTableName: true
    });
    return Product;
  };