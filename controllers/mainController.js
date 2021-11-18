const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controller = {
  index: (req, res) => {
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

    /**
     * Parametros:
     *  1. nombre de la vista
     *  2. Objeto donde cada propiedad es una variable dentro
     *     del archivo ejs
     */
    res.render('index', {
        productsBestSeller,
        productsPomotions
    });
  },
};

module.exports = controller;
