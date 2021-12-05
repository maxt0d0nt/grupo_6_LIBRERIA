const fs = require ('fs');
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

    create: function(userData){
        let allUsers = this.findAll();
        allUsers.push(userData);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers,null,' '));
        return true;

    },

}

module.exports = User; 
console.log(User.creandoID());
