const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, '../data/user.json');
const userImagesPath = path.join(__dirname, '../public'); // !TODO cambiar a img/upload/user
const products = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

const controller = {
// Root - Show all products
    register: (req, res) => {
        res.render('register');
    },
    login: (req, res) => {
        res.render('login');
    },
};

module.exports = controller;