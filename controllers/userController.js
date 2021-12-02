const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt')

const userFilePath = path.join(__dirname, '../data/user.json');
const userImagesPath = path.join(__dirname, '../public'); // !TODO cambiar a img/upload/user
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

const controller = {
// Root - Show all products
    //muestra la vista de registro
    register: (req, res) => {
        res.render('./user/register');
    },
    //accion de registrar un usuario
    registerUser: (req, res) => {
        //ya estan llegando los datos
        console.log(`REQ BODY=>`)
        // datos de formulario
        const {name, lastName, userName, email, birth, address, password, passwordRepeat} = req.body
        console.log({name, lastName, userName, email, birth, address, password, passwordRepeat})

        // encriptando Datos
        const BCRYPT_SALT_ROUNDS = 12;
        if(password === passwordRepeat && password !== ''){
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
                .then(hashedPassword =>{
                    console.log("hasedPassword-> ",hashedPassword)
                })
        }else(
            console.log("Los passwords ingresados no coinciden")
        )

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
};

module.exports = controller;