//API => Ruta al total de User
router.get('/Api/user', userController.list);
//API => Ruta a Un USER
router.get('/Api/user/id', userController.show);