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

//devuelve un book mapeado como form backend, en base al ID del parametro, desde la DB
const MapOneBook = async(id) => {
    const  result = await Book.findByPk(id,{
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
        raw:true
    })
        .then(book=>{
            return {
                Data:book,
            }
        }).catch(error=> {
        console.log("error apiProduct show: ",error)
    })
    console.log("-> book", result);
    let mapped = {
        id:result.Data.id,
        name:result.Data.name,
        author: result.Data?.['author.name'],
        description: result.Data.description,
        price: result.Data.price,
        path: result.Data.img,
        literatureCategory:result.Data?.['literature_category.name'],
        ecomerceCategory:result.Data?.['ecommerce_category.name']
    }
    return mapped
}


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

    //()=> creacion de un nuevo producto en base de datos
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
    
    //devulve un libro desde la base de datos y lo muestra en la pagina Product Detail
    detailInner:async(req,res)=>{
        const book = await MapOneBook(req.params.id)

        res.render('./product/productDetail',{
            productSelected: book,
            productPromotion: products.filter(p => p.ecomerceCategory === 'promotion') //TODO promociones
        })

    },

    //show edit page
    edit:async(req, res)=>{
        const productId =  parseInt(req.params.id);
        const bookMapped = await MapOneBook(productId);
        console.log("-> bookMapped", bookMapped);

        res.render('./product/productEdit',{productToEdit:bookMapped})
    },

    //()=> edit
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
    }
}