const {Model, DataTypes} = require('sequelize')
const sequelize = require ('../db')

class ECommerce extends Model {}
ECommerce.init({
    name: DataTypes.STRING,
},{
    sequelize,
    modelName: "ecommerce"
})

module.exports = ECommerce;