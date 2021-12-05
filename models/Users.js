const fs = require ('fs');
const bcrypt = require('bcrypt')
const User = {
    fileName: './data/user.json',

    getData: function (){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    creandoID: function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser){
        return lastUser.id + 1;
        }
        return 1;
    },

    findAll: function(){
        return this.getData();
    },

    findUserID: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser=> oneUser.id === id);
        return userFound;
    },
    findUserCampo: function(campo,texto){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser=> oneUser[campo] === texto);
        return userFound;
    },

    hassPassword: (password, passwordRepeat) => {
        const BCRYPT_SALT_ROUNDS = 12;
        let hashedPass = null
        let hashedPassword = null
        if(password === passwordRepeat && password !== ''){
            return hashedPassword = bcrypt.hashSync(password,BCRYPT_SALT_ROUNDS)

        }else(
            console.log("Los passwords ingresados no coinciden")
        )
    },

    dateNow: () => {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const formattedToday = today.toUTCString()
        return formattedToday
    },
    checkUserExist: (userData)=> {
        const {username, email} = userData
        // TODO verifica si el usuario o email ya existen en el user.json
    },

    create: function(userData, file){
        // TODO usar checkUserExist para verificar si el usuario o email ya existen en el user.json
        const {password, passwordRepeat, ...rest} = userData
        const imgDir = '/img/uploads/users/'
        const path =  file ? imgDir + file.filename : ''

        let allUsers = this.findAll();

        let newUser={
            id:this.creandoID(),
            img: path,
            registered : this.dateNow(),
            hashedPassword: this.hassPassword(password, passwordRepeat),
            ...rest,
        }
        allUsers.push(newUser);

        fs.writeFileSync(this.fileName, JSON.stringify(allUsers,null,' '));
        return newUser;

    },
    delete: function (id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser=>oneUser.id!==id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers,null,' '));
        return true;
    }

}

module.exports = User; 
console.log(User.creandoID());
