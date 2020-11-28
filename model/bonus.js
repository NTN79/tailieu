module.exports = (sequelize, Sequelize) => {
    const bonus = sequelize.define("bonus", {
        bonusId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        startTime: {
            type: Sequelize.DATE,
            allowNull:false
        },
        endTime: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
    return bonus;
};