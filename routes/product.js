const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController');
const upload = require('../middlewares/upload');

router.get('/',(req,res) => {

})

router.get('/all', productController.index);

router.get('/edit/:id', productController.edit);
router.put('/:id', upload.single('image'), productController.update);

router.delete('/:id', productController.destroy);

router.get('/detalle/:id',(req,res) => {

})

module.exports = router;