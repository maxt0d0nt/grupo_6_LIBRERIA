const {Model, DataTypes} = require('sequelize')
const sequelize = require ('../db')

class User extends Model {}
User.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    birthday: DataTypes.DATE,
    address: DataTypes.DATE,
    hashedPassword: DataTypes.STRING,
    img: DataTypes.STRING,
},{
    sequelize,
    modelName: "user"
})

module.exports = User;