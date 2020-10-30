module.exports = (sequelize,Sequelize)=>{
    const User = sequelize.define("users",{    
        userId:{
            type:Sequelize.INTEGER,
            primaryKey:true
        },
        fistName:{
            type:Sequelize.STRING(200),
            allowNull: false,
            length: '200'
        },
        lastName:{
            type: Sequelize.STRING(200),
            allowNull: false,
            length: '200'
        },
        birthday:{
            type: Sequelize.DATE,
            allowNull:false
        },
        phone:{
            type:Sequelize.INTEGER,
            allowNull: false,
            unique:true
        },
        gender: {
            type: Sequelize.STRING(10),
            defaultValue:'nam',
            length: '10'
        },
        address:{
            type:Sequelize.STRING(200),
            allowNull:false,
            length: '100'
        },
        email:{
            type: Sequelize.STRING(50),
            allowNull: false,
            unique:true,
            length: '50'
        },
        password:{
            type:Sequelize.STRING(100),
            allowNull: false,
            length: '50'
        },
        roleId:{
            type: Sequelize.INTEGER,
            allowNull:false,
            defaultValue:2
        },
        avatar:{
            type:Sequelize.STRING(50)
        }
    },{
        freezeTableName: true
    });
    return User;
}
