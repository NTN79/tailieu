module.exports = (sequelize,Sequelize)=>{
    const detailCart = sequelize.define("detailCart",{
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