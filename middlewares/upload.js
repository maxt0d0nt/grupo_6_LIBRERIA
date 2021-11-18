const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/img/uploads');
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
