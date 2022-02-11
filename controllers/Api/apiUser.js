const db= require('../database/models');
const Op = db.sequelize.Op;

//Muestra El total de Usuarios y su detalle
module.exports={
    list:(req,res)=>{
        DB.User
            .findAll()
            .then(user=>{
                return res.status(200).JSON({
                    total:user.length,
                    Data: user,
                })
            })
    },
    //Muestra un Usuario
    show:(req,res)=>{
        DB.User
            .findByPk(req.params.id)
            .then(user=>{
                return res.status(200).JSON({
                    Data:user,
                })
            })
    }
}