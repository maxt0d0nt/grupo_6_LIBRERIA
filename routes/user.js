const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');
const upload = require('../middlewares/upload');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/login',guestMiddleware ,userController.login);
//process
router.post('/loginUser', userController.loginUser);

router.get('/register',guestMiddleware ,userController.register);
router.post('/createUser', upload.single('image'), userController.registerUser);

router.get('/profile', authMiddleware, userController.profile);

router.get('/logout', authMiddleware, userController.logout);


module.exports = router;