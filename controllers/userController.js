const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt')
const async = require("async");

const userFilePath = path.join(__dirname, '../data/user.json');
const userImagesPath = path.join(__dirname, '../public'); // !TODO cambiar a img/upload/user
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
const imgDir = '/img/uploads/users/'

const controller = {
// Root - Show all products
    //muestra la vista de registro
    register: (req, res) => {
        res.render('./user/register');
    },
    //accion de registrar un usuario
    registerUser: (req, res) => {
        const maxId = Number(users.reduce(function(prev, current) {
            return (prev.id > current.id) ? prev.id : current.id
        }))
        const path =  req.file ? imgDir + req.file.filename : ''
        const newId = (maxId + 1).toString()
        console.log(users)
        console.log(`REQ BODY=>`)
        // datos de formulario
        const {name, lastName, userName, email, birth, address, password, passwordRepeat} = req.body
        console.log({name, lastName, userName, email, birth, address, password, passwordRepeat})

        // encriptando Datos
        const BCRYPT_SALT_ROUNDS = 12;
        let hashedPass = null
        let hashedPassword = null
        if(password === passwordRepeat && password !== ''){
            hashedPassword = bcrypt.hashSync(password,BCRYPT_SALT_ROUNDS)

        }else(
            console.log("Los passwords ingresados no coinciden")
        )

        console.log("-> hashedPass", {hashedPassword});

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const formattedToday = today.toUTCString()



        const newUser = {
            id:newId,
            name,
            lastName,
            userName,
            email,
            birth,
            address,
            img: path,
            hashedPassword,
            registered : formattedToday
        };

        users.push(newUser)
        fs.writeFileSync(userFilePath, JSON.stringify(users, null, ' '));



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