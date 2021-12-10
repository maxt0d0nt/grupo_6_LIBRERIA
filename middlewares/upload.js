const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const {path} = req.route
        let dirUpload = ''
        switch (path) {
            case '/updateProduct/:id':
            case  '/createProduct':
                dirUpload = 'public/img/uploads/products'
                break
            case '/createUser':
                dirUpload = 'public/img/uploads/users'
                break
            default:
                console.log(`PATH ERRONEO ${path}. \n Se esperaban los paths (/updateProduct/:id, /createProduct, /createUser) `)
        }
        callback(null, dirUpload);
    },
    filename: (req, file, callback) => {
        callback(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
