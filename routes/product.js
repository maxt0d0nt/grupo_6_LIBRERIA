const express = require('express')
const router = express.Router();
const multer = require('multer');
const path = require ('path')
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(__dirname,'../public/img'))
    },  
    filename: (req,file,cb)=>{
        const newFileName = 'New-'+Date.now()+'-'+file.originalname;
        cb(null, newFileName);
    }
});
const upload = multer ({storage:storage});

router.post ('/productsForm', upload.single('ProductIMG'))

router.get('/',(req,res) => {

})

router.get('/detalle/:id',(req,res) => {

})

module.exports = router;
module.exports = upload;