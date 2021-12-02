const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const productsImagesPath = path.join(__dirname, '../public');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const imgDir = '/img/uploads/products/'

const controller = {
// Root - Show all products
    indexPage: (req, res) => {
        res.render('./product/productAll', { products });
    },

    cartPage:(req, res) => {
        res.render('./product/productCart');
    },

    // Detail - Detail from one product
    detail: (req, res) => {
        const productId = req.params.id;
        const productKey = products.map(p => p.id).indexOf(productId)
        res.render('./product/productDetail',{
            productSelected: products[productKey],
            productPromotion: products.filter(p => p.ecomerceCategory === 'promotion')
        })
    },

    // Create - Form to create
    create: (req, res) => {
        res.render('./product/productCreate');
    },

    // Create -  Method to store
    store: (req, res) => {
        const maxId = Number(products.reduce(function(prev, current) {
            return (prev.id > current.id) ? prev.id : current.id
        }))
        const {name, author, description, literatureCategory, ecomerceCategory, price} = req.body
        const path =  req.file ? imgDir + req.file.filename : ''
        const newId = (maxId + 1).toString()

        const newProduct = {
            id:newId,
            name,
            author,
            path,
            description,
            price,
            literatureCategory,
            ecomerceCategory,
        };

        products.push(newProduct)
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));


        res.redirect('/product/all');
    },

    // Update - Form to edit
    edit: (req, res) => {
        const productId = req.params.id
        const productToEdit = products.filter(p => p.id == productId)

        res.render('./product/productEdit',{productToEdit:productToEdit[0]})
    },
    // Update - Method to update
    update: (req, res) => {
        const productId = req.params.id;
        const productKey = products.map(p => p.id).indexOf(productId)

        const {name, author, description, literatureCategory, ecomerceCategory} = req.body
        const path =  req.file ? imgDir + req.file.filename : products[productKey].path

        const updatedProduct = {
            id:productId,
            name,
            author,
            path,
            description,
            literatureCategory,
            ecomerceCategory,
        };

        products[productKey] = updatedProduct;
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));

        res.redirect('/product/all');
    },

    // Delete - Delete one product from DB -
    destroy: (req, res) => {
        const productId = req.params.id;
        const productKey = products.findIndex((p) => p.id == productId);
        const pathDeleteImage = path.join(__dirname,`../public/${products[productKey].path}`)
        //delete image
        fs.unlinkSync(pathDeleteImage)
        //delete virtual array and push to file json
        products.splice(productKey, 1);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))

        res.redirect('/product/all');
    }
};

module.exports = controller;