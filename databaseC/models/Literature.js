const {Model, DataTypes} = require('sequelize')
const sequelize = require ('../db')

class Literature extends Model {}
Literature.init({
    name: DataTypes.STRING,
},{
    sequelize,
    modelName: "literature"
})

module.exports = Literature;