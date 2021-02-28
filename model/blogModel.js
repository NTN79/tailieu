module.exports = (sequelize,Sequelize)=>{
    const blog = sequelize.define("blogs",{
        blogId:{
            type: Sequelize.STRING(20),
            primaryKey: true
        },
        title: {
            type:Sequelize.TEXT,
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        image: {
            type:Sequelize.STRING(50)
        }
    },{
        freezeTableName: true
    });
    return blog;
};