const User = require('../../databaseC/models/User')
const {DataTypes} = require("sequelize");
const userModel = require("../../models/Users");
const bcrypt = require("bcrypt");
const imgDir = '/img/uploads/users/';

module.exports={
    list:(req,res)=>{
        User
            .findAll()
            .then(user=>{
                return res.status(200).json({
                    total:user.length,
                    Data: user,
                })
            })
    },
    //Muestra un Usuario
    show:(req,res)=>{
        User
            .findByPk(req.params.id)
            .then(user=>{
                return res.status(200).json({
                    Data:user,
                })
            })
    },
    registerUser:(req,res)=>{
        const hassPassword = (password, passwordRepeat) => {
            const BCRYPT_SALT_ROUNDS = 12;
            let hashedPass = null
            let hashedPassword = null
            if(password === passwordRepeat && password !== ''){
                return hashedPassword = bcrypt.hashSync(password,BCRYPT_SALT_ROUNDS)

            }else(
                console.log("Los passwords ingresados no coinciden")
            )
        }

        const userData = req.body
        const file = req.file
        const {password, passwordRepeat, birth, ...rest} = userData
        const path =  file ? imgDir + file.filename : ''

        const newUser={
            img: path,
            birthday: birth  ,
            hashedPassword: hassPassword(password, passwordRepeat),
            ...rest,
        }
        console.log("-> newUser", newUser);

        User.create(newUser).then(user=>{
            res.json(user)
        })
    },
    loginUser: async(req, res) => {
        const userDataObj = await User.findAll({
            where: {
                username: req.body.userName
            }
        }).then(username=>{
            // console.log(username[0])
            return username[0]?.dataValues
        }).catch(error=>{
            console.log("Error login DB find email-> ", error)
        })

        console.log("-> userDataObj", userDataObj);

        let userToLogin = userDataObj?.username
        if(userToLogin){
            let isOkPassword = userModel.cmopareSync(req.body.password, userDataObj?.hashedPassword)
            if(isOkPassword){
                req.session.userLogged = userToLogin
                delete userToLogin.hashedPassword
                return res.redirect('/');
            }

        }

        return res.render('./user/login',{
            errors: {
                email: {
                    msg: 'Usuario o contraseña invalidos!'
                }
            }
        })
    }
}