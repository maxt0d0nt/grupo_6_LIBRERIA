const db = require ("../database/models");
const Op= db.sequelize.Op;

module.exports={
    list:(req,res)=>{
        DB.Books
            .findAll()
            .then(book=>{
                return res.status(200).JSON({
                    total:book.length,
                    Data: book,
                })
            })
    },
    //Muestra un Libro
    show:(req,res)=>{
        DB.Books
            .findByPk(req.params.id)
            .then(book=>{
                return res.status(200).JSON({
                    Data:book,
                })
            })
    }
}