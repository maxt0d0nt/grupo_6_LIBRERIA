const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const Ecommerce = require('./models/Ecommerce')
const Literature = require('./models/Literature')
const BookAuthors = require('./models/BookAuthors')

Book.belongsToMany(Author,{as:'author', through: BookAuthors,foreignKey:"author_id" })
Author.belongsToMany(Book,{ through: BookAuthors, foreignKey:"book_id" })


Ecommerce.hasMany(Book,{as:"books",foreignKey:"ecommerce_id"})
Book.belongsTo(Ecommerce,{as:"ecommerce_category",foreignKey:"ecommerce_id"})

Literature.hasMany(Book,{as:"books",foreignKey:"literature_id"})
Book.belongsTo(Literature,{as:"literature_category",foreignKey:"literature_id"})