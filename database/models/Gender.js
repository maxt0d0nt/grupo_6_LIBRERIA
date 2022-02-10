module.exports = function (sequelize, dataTypes) {
  let alias = "Gender";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    genderName: {
      type: dataTypes.STRING
    },

  }

  let config = {
    tableName: "gender",
    timestamps: false
  }

  let Gender = sequelize.define(alias, cols, config);

  Gender.associate = function (models) {
    Gender.hasMany(models.Books, {
      as: "products",
      foreignKey: "gender_id"
    })



  }
  return Gender
}