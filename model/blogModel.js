module.exports = (sequelize,Sequelize)=>{
    const blog = sequelize.define("blogs",{
        blogId:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        content: {
            type: Sequelize.STRING,
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