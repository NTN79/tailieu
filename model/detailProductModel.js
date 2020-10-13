module.exports = (sequelize, Sequelize) => {
    const detailProduct = sequelize.define("detailProduct", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      madeIn: {
        type: Sequelize.STRING
      },
      color:{
          type:Sequelize.STRING,
      },
      quality:{
          type:Sequelize.STRING
      },
      function:{
          type:Sequelize.STRING
      },
      machine:{
          type:Sequelize.STRING
      },
      size:{
          type:Sequelize.INTEGER
      },
      productId:{
          type:Sequelize.INTEGER,
          unique:true,
          allowNull:false
      }
    },{
      freezeTableName: true
    });
    return detailProduct;
  };