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
      gender:{
        type: Sequelize.STRING(50)
      },
      code:{
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      price:{
        type: Sequelize.INTEGER,
        allowNull:false
      },
      description:{
        type: Sequelize.STRING(300),
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