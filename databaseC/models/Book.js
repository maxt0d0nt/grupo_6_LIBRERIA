const {Model, DataTypes} = require('sequelize')
const sequelize = require ('../db')

class Book extends Model {}

// "id": 1,
// "name": "Ficciones",
// "author": "Jose Luis Borges",
// "path": "/img/uploads/products/ficcionesBorges.jpg",
// "description": "Las ediciones actuales de Ficciones reúnen todos los relatos publicados en la edición de 1956 (que agrega tres relatos a la versión de 1944) y siguen dividiendo el libro en dos partes: El jardín de los senderos que se bifurcan y Artificios.     ",
// "price": "1450",
// "literatureCategory": "action",
// "ecomerceCategory": "promotion"

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