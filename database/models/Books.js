module.exports = function (sequelize, dataTypes){
  let alias  = "Books"

  let cols = {
    id:{
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name:{
      type: dataTypes.STRING
    },
  /*  price:{
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
    }*/
  }

  let config = {
    tableName: "products",
    timestamps:false
  }

  let Books = sequelize.define(alias, cols, config);

  Books.associate = function(models) {
    Books.belongsTo(models.Gender, {
      as: "productos",
      through: "product_id",
      foreignKey: "gender_id"
    });

    
    Books.belongsToMany(models.Author, {
      as: "author",
      through: "author_libro", //es una tabla intermedia
      foreignKey: "libros_id",
      otherKey: "author_id",
      timestamp: false
    });

}  

return Books;
}