const userModel = require("../models/Users")
const controller = {

    register: (req, res) => {
        res.render('./user/register');
    },
    //accion de registrar un usuario
    registerUser: (req, res) => {

        let userInDB = userModel.findUserCampo('email', req.body.email)
        if(userInDB){
            return res.render('./user/register',{
                errors: {
                    email: {
                        msg: 'Este email ya esta registrado'
                    }
                },
                oldData: req.body
            })
        }else{
            userModel.create(req.body, req.file)
        }


        res.redirect('/user/login');
    },
    login: (req, res) => {
        res.render('./user/login');
    },
   loginUser: (req, res) => {
        let userToLogin = userModel.findUserCampo('userName', req.body.userName)
       if(userToLogin){
           let isOkPassword = userModel.cmopareSync(req.body.password, userToLogin.hashedPassword)
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
   },
    logout: (req, res) => {
        req.session.destroy()
        return res.redirect('/')
    },
    profile: (req, res) => {
        return res.render('./user/profile',{
            user: req.session.userLogged
        })
    }

    };

    module.exports = controller;