const {Model, DataTypes} = require('sequelize')
const sequelize = require ('../db')

class Book extends Model {}

Book.init({
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER
},{
    sequelize,
    modelName: "book"
})

module.exports = Book;