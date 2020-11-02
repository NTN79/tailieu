module.exports = (sequelize,Sequelize)=>{
    const listCart = sequelize.define("listCart",{
        listCartId:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        status:{
            type: Sequelize.INTEGER,
            allowNull:false
        },
        sumPrice:{
            type: Sequelize.INTEGER,
            allowNull:false
        }
    },{
        freezeTableName: true
    });
    return listCart;
};