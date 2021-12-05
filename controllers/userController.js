const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt')
const async = require("async");
const userModel = require("../models/Users")
const userFilePath = path.join(__dirname, '../data/user.json');
const userImagesPath = path.join(__dirname, '../public');
const users = userModel.getData();
const imgDir = '/img/uploads/users/'

const controller = {
    register: (req, res) => {
        res.render('./user/register');
    },
    //accion de registrar un usuario
    registerUser: (req, res) => {
        //TODO Rechazar Usuario registrado MIN 57 del video aprox.
        //let userInDB = userModel.findUserCampo('email',req.body.email);
        //if(userInDB){
        //    return res.render('register'{
        //        errors:{
        //            email:{
        //                msg: 'Ya existe un usuario asociado a ese Email.'
        //            }
        //        },
        //        oldData:req.body   
        //    });
        

        userModel.create(req.body, req.file)

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
        res.render('./user/login');
    },
    //TODO no salen los errores
//    loginUser: (req, res) => {
//        let userToLogin = userModel.findUserCampo('username',req.body.username);
//        if(userToLogin){
//            return res.send(userToLogin)
//        }
//        return res.render('./user/login'),{
//            errors:{
 //               username:{
//                    msg: 'No existe ningun usuario con ese Email.'
//                },
//            },
//        };
    //           let passwordOK = bcryptjs.compareSync(req.body.password,userToLogin.password);
    //        if(passwordOK){
    //          delete.UserToLogin;
    //        req.session.userLogged = userToLogin 
    //          return res.send ('Ok usuario logeado')
    //    }
    //  return res.render('./user/login'),{
    //   errors:{
    //     msg: 'No existe ningun usuario con ese Email.'//

    };
    module.exports = controller;