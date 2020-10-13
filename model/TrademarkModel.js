module.exports = (sequelize, Sequelize) => {
    const Trademark = sequelize.define("trademark", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        unique:true,
        allowNull:false
      },
       description:{
          type:Sequelize.STRING
      }
    },{
      freezeTableName: true
    });
    return Trademark;
  };