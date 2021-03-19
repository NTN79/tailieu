module.exports = (sequelize,Sequelize)=>{
    const detailCart = sequelize.define("detailCart",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productId:{
            type: Sequelize.STRING(50),
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull:false,
            default:1
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