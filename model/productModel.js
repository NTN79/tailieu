module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
      productId: {
        type: Sequelize.INTEGER,
        primaryKey: true
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