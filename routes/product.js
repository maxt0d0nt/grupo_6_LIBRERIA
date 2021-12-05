const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController');
const upload = require('../middlewares/upload');

//Todos los productos CRUD
router.get('/all', productController.indexPage);

//Edit product
router.get('/edit/:id', productController.edit);
router.put('/updateProduct/:id', upload.single('image'), productController.update);

//Delete product
router.delete('/:id', productController.destroy);

//Create product
router.get('/create', productController.create);
router.post('/createProduct', upload.single('image'), productController.store);

//ProducDetail
router.get('/detail/:id',productController.detail);

//Product Cart
router.get('/cart', productController.cartPage)


module.exports = router;