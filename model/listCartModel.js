module.exports = (sequelize,Sequelize)=>{
    const listCart = sequelize.define("listCart",{
        listCartId:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status:{
            type: Sequelize.INTEGER,
            allowNull:false,
            default: 0
        },
        payment:{
            type:Sequelize.INTEGER,
            allowNull:true
        }
    },{
        freezeTableName: true
    });
    return listCart;
};