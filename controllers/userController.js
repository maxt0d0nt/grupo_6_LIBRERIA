const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt')

const userFilePath = path.join(__dirname, '../data/user.json');
const userImagesPath = path.join(__dirname, '../public'); // !TODO cambiar a img/upload/user
const products = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

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
    login: (req, res) => {
        res.render('./user/login');
    },
};

module.exports = controller;