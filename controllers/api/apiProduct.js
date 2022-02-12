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

//devuelve un book, en base al ID del parametro, desde la DB
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
    //response Api JSON -> muestra todos los libros
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

    //response Api JSON -> muestra un libro
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

        //ini---verifica si el Author ya esta en base de datos sino, lo agrega a la DB
        const authorId = await Author.findAll({
            attributes: ['id'],
            where: {name: author}
        }).then(data=>{
            console.log(data?.[0]?.dataValues)
            return data?.[0]?.dataValues
        }).catch(error=>{
            console.log("Error -> ", error)
        })
        let newAuthorObj = null
        if (!authorId?.id){
            newAuthorObj = await Author.create({name:author})
                .then(data=>{
                    console.log("ID de Autor Creado", data?.dataValues)
                    return data?.dataValues
                }).catch(error=>{
                console.log("Error -> ", error)
            })
        }
        //end---verifica si el Author ya esta en base de datos sino, lo agrega

        const getLiteratureCatNumber = (categoryString) => {
            let categoryNumber = null
            switch (categoryString) {
                case "N/A":
                    return categoryNumber
                case "terror":
                    return categoryNumber = 1
                case "suspenso":
                    return categoryNumber = 2
                case "biografia":
                    return categoryNumber = 3
                case "novela":
                    return categoryNumber = 4
                case "policial":
                    return categoryNumber = 5
                case "ciencia":
                    return categoryNumber = 6
                case "religion":
                    return categoryNumber = 7
                case "cuentos infantiles":
                    return categoryNumber = 8
                case "programacion":
                    return categoryNumber = 9
                case "salud":
                    return categoryNumber = 10
            }
        }
        let newProduct={
            name,
            author_id: newAuthorObj ? newAuthorObj.id : null,
            img: path,
            description,
            price,
            literature_id: getLiteratureCatNumber(literatureCategory),
            ecommerce_id: ecomerceCategory === "promotion" ? 1 : 2 //Todo harcodeado
        }


        Book.create(newProduct).then(()=>console.log("-> nuevo producto agregado a la DB", newProduct))
    },
    
    //devulve un libro desde la base de datos y lo muestra en la pagina Product Detail
    detailInner:async(req,res)=>{
        const books = await MapOneBook(req.params.id)

        res.render('./product/productDetail',{
            productSelected: books,
            productPromotion: products.filter(p => p.ecomerceCategory === 'promotion')
        })

    }
}