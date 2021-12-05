const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt')
const async = require("async");
const userModel = require("../models/Users")
const userFilePath = path.join(__dirname, '../data/user.json');
const userImagesPath = path.join(__dirname, '../public');
//!TODO cambiar a img/upload/user
const users = userModel.getData();
const imgDir = '/img/uploads/users/'

const controller = {
// Root - Show all products
    //muestra la vista de registro
    register: (req, res) => {
        res.render('./user/register');
    },
    //accion de registrar un usuario
    registerUser: (req, res) => {


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
    loginUser: (req, res) => {
        console.log(req.body)
    },
};

module.exports = controller;