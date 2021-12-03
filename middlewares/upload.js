const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const {path} = req.route
        let dirUpload = ''
        switch (path) {
            case  '/createProduct':
                dirUpload = 'public/img/uploads/products'
                break
            case '/createUser':
                dirUpload = 'public/img/uploads/users'
                break
            default:
                console.log("PATH ERRONEO")
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
// const uploadUser = multer({ storage: storageUser });

module.exports = upload;
// module.exports = uploadUser;
