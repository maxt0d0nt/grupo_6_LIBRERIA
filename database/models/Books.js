module.exports = function (sequelize, dataTypes){
  let alias  = "Books"

  let cols = {
    id:{
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
      tpye: dataTypes.STRING
    },
    price:{},
    author:{},
    literatureCategory:{},
    ecomerceCategory:{}
  }

  let config = {
    tableName: "products",
    timestamps:false
  }

  let Books = sequelize.define(alias, cols, config)

  return Books
}