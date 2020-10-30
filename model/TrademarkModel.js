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
          type:Sequelize.STRING(200)
      }
    },{
      freezeTableName: true
    });
    return Trademark;
  };