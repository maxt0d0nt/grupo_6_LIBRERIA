const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const Ecommerce = require('./models/Ecommerce')
const Literature = require('./models/Literature')


Author.hasMany(Book,{as:"books",foreignKey:"author_id"})
Book.belongsTo(Author,{as:"author",foreignKey:"author_id"})

Ecommerce.hasMany(Book,{as:"books",foreignKey:"ecommerce_id"})
Book.belongsTo(Ecommerce,{as:"ecommerce_category",foreignKey:"ecommerce_id"})

Literature.hasMany(Book,{as:"books",foreignKey:"literature_id"})
Book.belongsTo(Literature,{as:"literature_category",foreignKey:"literature_id"})