const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController');
const upload = require('../middlewares/upload');
const authMiddleware = require('../middlewares/authMiddleware');

//page =>  CRUD Products
router.get('/all', authMiddleware,productController.indexPage);

//page => Edit product
router.get('/edit/:id', authMiddleware,productController.edit);
//() =>  Edit_product()
router.put('/updateProduct/:id', upload.single('image'), productController.update);

//() => Delete product
router.delete('/:id', productController.destroy);

//page => Create product
router.get('/create', authMiddleware,productController.create);
//() => Create_product()
router.post('/createProduct', upload.single('image'), productController.store);

//page => ProducDetail
router.get('/detail/:id', productController.detail);

//page => Product Cart
router.get('/cart', authMiddleware,productController.cartPage);


module.exports = router;