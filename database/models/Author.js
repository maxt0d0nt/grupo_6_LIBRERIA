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
    }
  }

  let config = {
    tableName: "author",
    timestamps:false
  }

  let Author = sequelize.define(alias, cols, config)

  Author.associate = function(models){
    Author.hasMany(models.Books, {
      as: "books",
      foreingKey: "author_id"
    })
  }

  return Author
}