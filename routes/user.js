const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');
const userApiController = require('../controllers/api/apiUser');
const upload = require('../middlewares/upload');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

//page => Login
router.get('/login',guestMiddleware ,userController.login);
//() => Login
router.post('/loginUser', userApiController.loginUser);

//page => Register
router.get('/register',guestMiddleware ,userController.register);
//() => Process register
router.post('/createUser', upload.single('image'), userApiController.registerUser);

//page => Profile
router.get('/profile', authMiddleware, userController.profile);

//page => Logout
router.get('/logout', authMiddleware, userController.logout);


module.exports = router;