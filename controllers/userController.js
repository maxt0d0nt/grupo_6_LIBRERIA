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
    store: (req, res) => {
        //guardar usuario !TODO
    },
    edit: (req, res) => {
        //editar usuario !TODO
    },
    delete: (req, res) => {
        //borrar usuario !TODO
    },
    login: (req, res) => {
        console.log("-> req.session", req.session);
        res.render('./user/login');
    },
    //TODO no salen los errores
   loginUser: (req, res) => {
        let userToLogin = userModel.findUserCampo('userName', req.body.userName)
       if(userToLogin){
           let isOkPassword = userModel.cmopareSync(req.body.password, userToLogin.hashedPassword)
           if(isOkPassword){
               req.session.userLogged = userToLogin
               delete userToLogin.hashedPassword
               console.log("-> req.session", req.session);
               return res.redirect('/user/profile');
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
        console.log("-> req.session.userLogged", req.session.userLogged);
        return res.render('./user/profile',{
            user: req.session.userLogged
        })
    }

    };

    module.exports = controller;