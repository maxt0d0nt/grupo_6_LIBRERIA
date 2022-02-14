const db = require ("../../database/models");
const Book = require('../../databaseC/models/Book')
const Literature = require('../../databaseC/models/Literature')
const Ecommerce = require('../../databaseC/models/Ecommerce')
const Author = require('../../databaseC/models/Author')
const imgDir = '/img/uploads/products/';
const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, '../../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const utils = require('../../utils/utils')




module.exports={
    //JSON -> muestra todos los libros
    list:(req,res)=>{
        Book.findAll({
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
            ]
        })
            .then(book=>{
                return res.status(200).json({
                    total:book.length,
                    Data: book,
                })
            })
    },

    //JSON -> muestra un libro
    show:(req,res)=>{
        Book.findByPk((req.params.id),{
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
            ]
        })
            .then(book=>{
                return res.status(200).json({
                    total:book.length,
                    Data: book,
                })
            }).catch(error=> {
                console.log("error apiProduct show: ",error)
        })
    },
}