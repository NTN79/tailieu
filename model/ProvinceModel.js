module.exports = (sequelize, Sequelize) => {
    const bonus = sequelize.define("province", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.TEXT
        }
    }, {
        freezeTableName: true
    });
    return bonus;
};