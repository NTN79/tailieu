module.exports = (sequelize, Sequelize) => {
    const bonus = sequelize.define("district", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        idProvince: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true
    });
    return bonus;
};