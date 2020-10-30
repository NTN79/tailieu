module.exports = (sequelize, Sequelize) => {
    const detailProduct = sequelize.define("detailProduct", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      madeIn: {
        type: Sequelize.STRING(50)
      },
      color:{
          type:Sequelize.STRING(50)
      },
      quality:{
          type:Sequelize.STRING(50)
      },
      function:{
          type:Sequelize.STRING(100)
      },
      machine:{
          type:Sequelize.STRING(100)
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