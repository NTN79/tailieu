module.exports = (sequelize,Sequelize)=>{
    const comment = sequelize.define("comment",{
        commentId:{
            type: Sequelize.STRING(20),
            primaryKey: true
        },
        content: {
            type: Sequelize.STRING(100),
            allowNull: false

        }
    },{
        freezeTableName: true
    });
    return comment;
};