const bcrypt = require("bcrypt");
const Author = require("../databaseC/models/Author");
const BCRYPT_SALT_ROUNDS = 12;
const utils = {
    //chequea si pass y repeat pass son iguales
    checkRepeatPassword: (password, passwordRepeat)=>{
            if(password === passwordRepeat && password !== ''){
                return true
            }
        console.log("Los passwords ingresados no coinciden")
        return false
    },
    hashPass: (password) => bcrypt.hashSync(password,BCRYPT_SALT_ROUNDS),

    findOrCreateAuthor: async(author)=>{
        const result = await Author.findOrCreate({
            where: {name: author}
        }).spread((user, created)=>{
            console.log(user.get({
                plain: true
            }))

            return user.get({
                plain: true
            })
        })
        return result

        /*ini---verifica si el Author ya esta en base de datos sino, lo agrega a la DB
        const authorId = await Author.findAll({
            attributes: ['id'],
            where: {name: author}
        }).then(data=>{
            console.log(data?.[0]?.dataValues)
            return data?.[0]?.dataValues
        }).catch(error=>{
            console.log("Error -> ", error)
        })

        let newAuthorObj = null
        console.log("-> authorId IF", !authorId?.id);
        if (!authorId?.id){
            newAuthorObj = await Author.create({name:author})
                .then(data=>{
                    console.log("ID de Autor Creado", data?.dataValues)
                    return data?.dataValues
                }).catch(error=>{
                    console.log("Error -> ", error)
                })
        }
        end---verifica si el Author ya esta en base de datos sino, lo agrega*/
    },

    getLiteratureCatNumber:(categoryString) => {
        let categoryNumber = 1
        switch (categoryString) {
            case "N/A":
                return categoryNumber
            case "policial":
                return categoryNumber = 2
            case "terror":
                return categoryNumber = 3
            case "suspenso":
                return categoryNumber = 4
            case "ciencia":
                return categoryNumber = 5
            case "religion":
                return categoryNumber = 6
            case "cuentos infantiles":
                return categoryNumber = 7
            case "programacion":
                return categoryNumber = 8
            case "salud":
                return categoryNumber = 9
            case "biografia":
                return categoryNumber = 10
            case "novela":
                return categoryNumber = 11
        }
    },

}

module.exports = utils;