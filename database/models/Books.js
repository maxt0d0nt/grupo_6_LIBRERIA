module.exports = function (sequelize, dataTypes){
  let alias  = "Books"

  let cols = {
    id:{
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
      type: dataTypes.STRING
    },
    price:{
      tpye: dataTypes.FLOAT

    },
    author:{
      tpye: dataTypes.STRING
    },
    literatureCategory:{
      tpye: dataTypes.STRING
    },
    ecomerceCategory:{
      tpye: dataTypes.STRING
    }
  }

  let config = {
    tableName: "product",
    timestamps:false
  }

  let Books = sequelize.define(alias, cols, config)

  return Books
}