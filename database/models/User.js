module.exports = function (sequelize, dataTypes){
  let alias  = "Author";

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
      type: dataTypes.STRING
    },
    hashedPassword:{
      type: dataTypes.STRING
    },
    birth:{
      type: dataTypes.STRING
    }
  }

  let config = {
    tableName: "author",
    timestamps:false
  }

  let Author = sequelize.define(alias, cols, config)

  return Author
}