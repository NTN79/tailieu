module.exports = (sequelize,Sequelize)=>{
    const User = sequelize.define("users",{    
        userId:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
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
            defaultValue:'Nam',
            length: '10'
        },
        province:{//tỉnh
            type:Sequelize.STRING(200),
            allowNull:true
        },
        district:{//huyện
            type:Sequelize.STRING(200),
            allowNull:true
        },
        address:{// địa chỉ chi tiết
            type:Sequelize.STRING(200),
            allowNull:true
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
