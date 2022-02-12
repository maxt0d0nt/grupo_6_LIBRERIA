module.exports = function (sequelize, dataTypes){
  let alias  = "User";

  let cols = {
    id:{
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
      type: dataTypes.STRING
    },
    lastName:{
      type: dataTypes.STRING
    },
    email:{
      type: dataTypes.STRING
    },
    userName:{
      type: dataTypes.STRING
    },
    address:{
      type: dataTypes.TEXT
    },
    hashedPassword:{
      type: dataTypes.STRING
    },
    birth:{
      type: dataTypes.DATE
    }
  }

  let config = {
    tableName: "users",
    timestamps:false
  }

  let User = sequelize.define(alias, cols, config)

  return User
}