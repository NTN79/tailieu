module.exports = (sequelize,Sequelize)=>{
    const detailCart = sequelize.define("detailCart",{
        cartId:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        productId:{
            type: Sequelize.STRING(50),
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull:false
        },
        Price:{
            type:Sequelize.INTEGER,
            allowNull:false
        }
    },{
        freezeTableName: true
    });
    return detailCart;
};