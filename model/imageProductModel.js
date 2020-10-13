module.exports = (sequelize, Sequelize) => {
    const imageProduct = sequelize.define("imageProduct", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      path: {
        type: Sequelize.STRING
      },
      productId:{
          type: Sequelize.INTEGER
      }
    },{
      freezeTableName: true
    });
    return imageProduct;
  };