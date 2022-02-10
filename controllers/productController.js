const fs = require('fs');
const path = require('path');
//const productModel = require('../models/Products')
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db = require ("../database/models");

const controller = {
    //Index page - Show all products 
    /*db.Books.findAll()
    .then()*/
    indexPage: (req, res) => {
        res.render('./product/productAll', { products });
    },
    //Buy product page
    cartPage:(req, res) => {
        res.render('./product/productCart');
    },

    // Detail - Detail from one product
    detail: (req, res) => {
        const productId = parseInt(req.params.id);
        const productKey = products.map(p => p.id).indexOf(productId)
        res.render('./product/productDetail',{
            productSelected: products[productKey],
            productPromotion: products.filter(p => p.ecomerceCategory === 'promotion')
        })
    },

    // Create product page - Form to create product
    create: (req, res) => {
        res.render('./product/productCreate');
    },

    // Create() -  Method to store
    store: (req, res) => {
        productModel.create(req.body, req.file)

        res.redirect('/product/all');
    },

    // Update - Form to edit product
    edit: (req, res) => {
        const productId =  parseInt(req.params.id)
        const productToEdit = products.filter(p => p.id === productId)

        res.render('./product/productEdit',{productToEdit:productToEdit[0]})
    },
    // Update() - Method to update product
    update: (req, res) => {
        const id = parseInt(req.params.id)
        productModel.edit(id, req.body, req.file)
        res.redirect('/product/all');
    },

    // Delete() - Delete one product from DB
    destroy: (req, res) => {
        const productId = parseInt(req.params.id)
        productModel.delete(productId)

        res.redirect('/product/all');
    }
};

module.exports = controller;