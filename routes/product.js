const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController');
const upload = require('../middlewares/upload');

router.get('/',(req,res) => {

})
//Todos los productos CRUD
router.get('/all', productController.index);

//Edit product
router.get('/edit/:id', productController.edit);
router.put('/:id', upload.single('image'), productController.update);

//Delete product
router.delete('/:id', productController.destroy);

//Create product
router.get('/create', productController.create);
router.post('/', upload.single('image'), productController.store);

//ProducDetail
router.get('/detail/:id',productController.detail);


module.exports = router;