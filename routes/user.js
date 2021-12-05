const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');
const upload = require('../middlewares/upload');


router.get('/login', userController.login);

router.get('/register', userController.register);
router.post('/createUser', upload.single('image'), userController.registerUser);

router.post('/loginUser', userController.loginUser);

//post de los datos + multer con imagen
    //registrar el usuario en data/user.json

module.exports = router;