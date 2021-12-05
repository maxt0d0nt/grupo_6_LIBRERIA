const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');
const upload = require('../middlewares/upload');
const guestMiddleware = require('../middlewares/guestMiddleware');

router.get('/login',guestMiddleware ,userController.login);
router.post('/login', userController.loginUser);

router.get('/register',guestMiddleware ,userController.register);
router.post('/createUser', upload.single('image'), userController.registerUser);

router.post('/loginUser', userController.loginUser);

//post de los datos + multer con imagen
    //registrar el usuario en data/user.json

module.exports = router;