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

        // Generamos el producto actualizado
        const {name, author, literatureCategory, ecomerceCategory} = req.body
        const path =  req.file ? '/img/uploads/' + req.file.filename : products[productId].path
        console.log(path)
        console.log("INGRESE")
        const updatedProduct = {
            id:productId,
            name,
            author,
            path,
            literatureCategory,
            ecomerceCategory,
        };

        products[productId] = updatedProduct;
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));

        res.redirect('/product');
    },

    // Delete - Delete one product from DB
    destroy: (req, res) => {
        // Leer el id

        // Buscar la posicion actual del producto a eliminar

        // Recortar el array sin ese producto

        // Guardar en el json el nuevo array

        res.redirect('/products');
    }
};

module.exports = controller;