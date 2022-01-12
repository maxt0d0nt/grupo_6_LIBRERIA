const fs = require('fs');
const path = require('path');
const productModel = require('../models/Products')
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db= require ("../database/models");
const controller = {
    //Index page - Show all products
    indexPage: (req, res) => {
        db.Libros.findAll()
        .then(function(libros){
            res.render('./product/productAll',{libros:libros})
        })
    },
    //Buy product page
    cartPage:(req, res) => {
        res.render('./product/productCart');
    },

    // Detail - Detail from one product
    detail: (req, res) => {
        db.Libro.findByPk(req.params.id,{
            include: [{association:"genero"},{association:"autores"}]
        })
        .then(function(libro){
            res.render('./product/productDetail.ejs',{libro:libro});
        })
    },

    // Create product page - Form to create product
    create: (req, res) => {
        db.Genero.findAll()
        .then(function(generos){
            return res.render('./product/productCreate', {generos:generos})
        });
    },
    

    // Create() -  Method to store
    store: (req, res) => {
        db.Libro.create({
            name:req.body.name,
            author:req.body.author,
            description:req.body.description,
            literatureCategory:req.body.literatureCategory,
            ecomerceCategory:req.body.ecomerceCategory,
        });

        res.redirect('/product/all');
    },

    // Update - Form to edit product
    edit: (req, res) => {
        let pedidoLibro = db.Libro.findByPk(req.params.id);
        let pedidoGeneros = db.Genero.findAll();
        Promise.all([pedidoLibro, pedidoGeneros])
        .then (function([libro,generos]){
            res.render('./product/productEdit',{libro:libro, generos:generos});
        })

       
    },
    // Update() - Method to update product
    update: (req, res) => 
        db.Libro.update({
        name:req.body.name,
        author:req.body.author,
        description:req.body.description,
        literatureCategory:req.body.literatureCategory,
        ecomerceCategory:req.body.ecomerceCategory,
        }, {
            where:{
                id: req.params.id
            }
        });
        
        res.redirect('/product/'+req.params.id)
    }

    // Delete() - Delete one product from DB
        destroy: (req, res) => {
        db.Libro.destroy({
            where:{
                id: req.params.id
            }
        })

        res.redirect('/product/all');
    }
};

module.exports = controller;