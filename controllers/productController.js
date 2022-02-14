const fs = require('fs');
const path = require('path');
//const productModel = require('../models/Products')
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db = require ("../database/models");
const Book  = require("../databaseC/models/Book")
const Literature = require("../databaseC/models/Literature");
const Ecommerce = require("../databaseC/models/Ecommerce");
const Author = require("../databaseC/models/Author");
const utils = require("../utils/utils");
const imgDir = '/img/uploads/products/';


const controller = {
    indexPage: async(req, res) => {
        const books = await utils.MapBooks()
        console.log("-> booksProduct", books);

        res.render('./product/productAll', { products:books });
    },

    cartPage:(req, res) => {
        res.render('./product/productCart');
    },

    createPage: (req, res) => {
        res.render('./product/productCreate');
    },

    detailPage:async(req,res)=>{
        const book = await utils.MapOneBook(req.params.id)

        res.render('./product/productDetail',{
            productSelected: book,
            productPromotion: products.filter(p => p.ecomerceCategory === 'promotion') //TODO promociones
        })

    },

    editPage:async(req, res)=>{
        const productId =  parseInt(req.params.id);
        const bookMapped = await utils.MapOneBook(productId);
        console.log("-> bookMapped", bookMapped);

        res.render('./product/productEdit',{productToEdit:bookMapped})
    },

    //()=> creacion de un nuevo producto
    create: async(req, res ) =>{
        let [productData, file] = [req.body, req.file]
        const {name, author, description, literatureCategory, price, ecomerceCategory} = productData //TODO - falta agregar input de price
        const path =  file ? imgDir + file.filename : ''

        const authorId = await utils.findOrCreateAuthor(author)

        let newProduct={
            name,
            author_id: authorId.id,
            img: path,
            description,
            price,
            literature_id: utils.getLiteratureCatNumber(literatureCategory),
            ecommerce_id: ecomerceCategory === "promotion" ? 1 : 2 //Todo harcodeado
        }


        Book.create(newProduct).then(()=>console.log("-> nuevo producto agregado a la DB", newProduct))
    },

    //()=> actualiza informacion de producto en db
    update: async(req, res)=>{
        const id = parseInt(req.params.id)
        const bookData = req.body
        const {name, price, author,description, ecomerceCategory, literatureCategory} = bookData
        const file  = req.file
        const pathImg =  file ? imgDir + file.filename : '' //devolver el mismo path anterior de la DB

        const bookInstance = await Book.findByPk(id)
        const authorId = await utils.findOrCreateAuthor(author)

        let updatedBook = {
            name,
            price:parseInt(price),
            description,
            literature_id: utils.getLiteratureCatNumber(literatureCategory),
            ecommerce_id: ecomerceCategory === "promotion" ? 1 : 2,
            author_id: authorId?.id,
        }
        if(pathImg)  updatedBook = Object.assign(updatedBook, {img:pathImg})


        bookInstance.update(updatedBook)
        await bookInstance.save();

        res.redirect('/product/all')
    },

    //()=> elimina un producto de la base de datos
    destroy: async (req, res) => {
        const productId = parseInt(req.params.id)
        await Book.destroy({
            where: {
                id: productId
            }
        });

        res.redirect('/product/all');
    },


};


module.exports = controller;