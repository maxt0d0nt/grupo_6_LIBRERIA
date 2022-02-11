const express = require('express')
const router = express.Router()
const productController = require('../../controllers/api/apiProduct');

//API => Ruta al total de Libros
router.get('/getAll', productController.list);
//API => Ruta a Un Libro
router.get('/get/:id', productController.show);

module.exports = router;