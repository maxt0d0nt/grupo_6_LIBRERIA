const User = require('../../databaseC/models/User')
const {DataTypes} = require("sequelize");
const userModel = require("../../models/Users");
const bcrypt = require("bcrypt");
const imgDir = '/img/uploads/users/';
const utils = require("../../utils/utils");

module.exports={
    //JSON => Todos los usuarios
    list:(req,res)=>{
        User
            .findAll()
            .then(user=>{
                return res.status(200).json({
                    total:user.length,
                    Data: user,
                })
            })
    },

    //JSON => Muestra un Usuario
    show:(req,res)=>{
        User
            .findByPk(req.params.id)
            .then(user=>{
                return res.status(200).json({
                    Data:user,
                })
            })
    },

    //JSON => resgitra usuario TODO falta express validator
    registerUser:(req,res)=>{
        const userData = req.body
        const file = req.file
        const {password, passwordRepeat, birth, ...rest} = userData
        const path =  file ? imgDir + file.filename : ''
        if(utils.checkRepeatPassword(password, passwordRepeat)){
            const newUser = {
                img: path,
                birthday: birth  ,
                hashedPassword: utils.hashPass(password, passwordRepeat),
                ...rest,
            }
            console.log("-> newUser", newUser);

            User.create(newUser).then(user=>{
                res.json(user)
            })
        }else{
            console.log("Error de datos en register form")
            //TODO return form error express validator
        }
    },

    //()=> login user con express validator
    loginUser: async(req, res) => {
        const userDataObj = await User.findAll({
            where: {
                username: req.body.userName
            }
        }).then(username=>{
            // console.log(username[0])
            return username[0]?.dataValues
        }).catch(error=>{
            console.log("Error login DB find email-> ", error)
        })

        console.log("-> userDataObj", userDataObj);

        let userToLogin = userDataObj
        if(userToLogin?.username){
            let isOkPassword = userModel.cmopareSync(req.body.password, userToLogin?.hashedPassword)
            if(isOkPassword){
                req.session.userLogged = userToLogin
                delete userToLogin.hashedPassword
                return res.redirect('/');
            }

        }

        return res.render('./user/login',{
            errors: {
                email: {
                    msg: 'Usuario o contraseña invalidos!'
                }
            }
        })
    }
}