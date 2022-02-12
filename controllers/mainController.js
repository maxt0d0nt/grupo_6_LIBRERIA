const fs = require('fs');
const path = require('path');
const db = require("../database/models");
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productApiController = require('./api/apiProduct');
const Book = require("../databaseC/models/Book");
const Literature = require("../databaseC/models/Literature");
const Ecommerce = require("../databaseC/models/Ecommerce");
const Author = require("../databaseC/models/Author");


const getBooksMapped = async() => {
    const result = await Book.findAll({
        include:[{
            model: Literature,
            as: "literature_category",
            attributes:["name"]
        },
            {
                model: Ecommerce,
                as: "ecommerce_category",
                attributes:["name"]
            },
            {
                model: Author,
                as: "author",
                attributes:["name"]
            },
        ],
        raw : true,
    })
        .then(book=>{
            return {
                total:book.length,
                Data: book,
            }
        })
    let newArrayObj=[]
    result.Data.map( (o, index) =>{
        newArrayObj.push( {
            id:o.id,
            name:o.name,
            author: o?.['author.name'],
            description: o.description,
            price: o.price,
            path: o.img,
            literatureCategory:o?.['literature_category.name'],
            ecomerceCategory:o?.['ecommerce_category.name']
        })
    })
    return newArrayObj
}


const controller = {
  index: async(req, res) => {
    const products = await getBooksMapped()

    const productsBestSeller = products.filter((prod) => {
      /* devuelvo booleano que me dice si el objeto queda o no */
      const condition = prod.ecomerceCategory === 'bestSeller';
      return condition;
    });

    const productsPomotions = products.filter((prod) => {
      /* devuelvo booleano que me dice si el objeto queda o no */
        const condition = prod.ecomerceCategory === 'promotion';
      return condition;
    });

    res.render('index', {
        productsBestSeller,
        productsPomotions
    });
  },
};

module.exports = controller;


