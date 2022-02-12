const {Model, DataTypes} = require('sequelize')
const sequelize = require ('../db')

class Author extends Model {}
Author.init({
    name: DataTypes.STRING,
},{
    sequelize,
    modelName: "author"
})

module.exports = Author;