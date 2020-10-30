module.exports = (sequelize,Sequelize)=>{
    const listCart = sequelize.define("listCart",{
        Id:{
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    },{
        freezeTableName: true
    });
    return listCart;
};