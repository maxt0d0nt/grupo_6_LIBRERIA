const fs = require('fs');
const path = require('path');
const db = require("../database/models");
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controller = {
  index: async(req, res) => {
      //Test Db connection
      try {
          await db.sequelize.authenticate();
          console.log('Connection has been established successfully.');
      } catch (error) {
          console.error('Unable to connect to the database:', error);
      }

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

    res.render('index', {
        productsBestSeller,
        productsPomotions
    });
  },
};

module.exports = controller;



