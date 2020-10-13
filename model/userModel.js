module.exports = (sequelize,Sequelize)=>{
    const User = sequelize.define("users",{    
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        fistName:{
            type:Sequelize.STRING,
            allowNull: false,
            length: '200'
        },
        lastName:{
            type: Sequelize.STRING,
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
            type: Sequelize.STRING,
            defaultValue:'nam',
            length: '10'
        },
        address:{
            type:Sequelize.STRING,
            allowNull:false,
            length: '100'
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false,
            unique:true,
            length: '50'
        },
        password:{
            type:Sequelize.STRING,
            allowNull: false,
            length: '50'
        },
        roleId:{
            type: Sequelize.INTEGER,
            allowNull:false
        },
        avatar:{
            type:Sequelize.STRING
        }
    },{
        freezeTableName: true
    });
    return User;
}
