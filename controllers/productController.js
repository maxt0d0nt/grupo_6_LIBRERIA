const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controller = {
// Root - Show all products
    index: (req, res) => {
        res.render('productAll', { products });
    },

    // Detail - Detail from one product
    detail: (req, res) => {
        // Aca necesitamos recibir un objeto de tipo producto
        // Primero buscamos el producto correspondiente

        // Calculo el final price en el controlador para que la vista quede mas limpia

    },

    // Create - Form to create
    create: (req, res) => {
        // Renderizar el formulario de create
        // No necesita parametros
        res.render('product-create-form');
    },

    // Create -  Method to store
    store: (req, res) => {
        // ✓ Acceder a nuestro archivo JSON
        // ✓ Leer los datos y convertirlos en un array para modificarlo
        // Leer los datos que vienen en la request (req.body)

        // Modificar el arreglo para agregar el nuevo producto


        // Escribir en el JSON el nuevo arreglo actualizado


        // res.redirect('index');
        res.redirect('/');
    },

    // Update - Form to edit
    edit: (req, res) => {
        const productId = req.params.id
        const productToEdit = products.filter(p => p.id == productId)

        res.render('productEdit',{productToEdit:productToEdit[0]})
    },
    // Update - Method to update
    update: (req, res) => {
        const productId = req.params.id;
        const productKey = products.map(p => p.id).indexOf(productId)
        console.log({productKey, productId})

        const {name, author, literatureCategory, ecomerceCategory} = req.body
        const path =  req.file ? '/img/uploads/' + req.file.filename : products[productKey].path

        const updatedProduct = {
            id:productId,
            name,
            author,
            path,
            literatureCategory,
            ecomerceCategory,
        };
        console.log({updatedProduct})


        products[productKey] = updatedProduct;
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));

        res.redirect('/product/all');
    },

    // Delete - Delete one product from DB
    destroy: (req, res) => {
        const productId = req.params.id;
        const productKey = products.findIndex((p) => p.id == productId);
        products.splice(productKey, 1);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));

        res.redirect('/product/all');
    }
};

module.exports = controller;