module.exports = (sequelize, Sequelize) => {
    const detailBonus = sequelize.define("detailBonus", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        discountPrice:{
            type: Sequelize.INTEGER,
            allowNull:false
        }
    }, {
        freezeTableName: true
    });
    return detailBonus;
};