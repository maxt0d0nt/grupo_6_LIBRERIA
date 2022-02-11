//API => Ruta al total de Libros
router.get('/Api/product', productController.list);
//API => Ruta a Un Libro
router.get('/Api/product/id', productController.show);