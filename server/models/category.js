"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product, {
        foreignKey: "CategoryId",
        as: "products",
      });
    }
  }

  Category.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );

  return Category;
};
