const express = require('express')
const router = express.Router()
const userController = require('../../controllers/api/apiUser');

//API => Ruta al total de User
router.get('/getAll', userController.list);
//API => Ruta a Un USER
router.get('/get/:id', userController.show);

module.exports = router;