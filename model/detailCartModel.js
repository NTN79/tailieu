module.exports = (sequelize,Sequelize)=>{
    const detailCart = sequelize.define("detailCart",{
        cartId:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull:false
        },
        sumPrice:{
            type:Sequelize.INTEGER,
            allowNull:false
        }
    },{
        freezeTableName: true
    });
    return detailCart;
};