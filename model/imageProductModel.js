module.exports = (sequelize, Sequelize) => {
    const imageProduct = sequelize.define("imageProduct", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      path: {
        type: Sequelize.STRING,
        allowNull:false
      },
      productId:{
        type: Sequelize.STRING(50),
        allowNull:false
      }
    },{
      freezeTableName: true
    });
    return imageProduct;
  };