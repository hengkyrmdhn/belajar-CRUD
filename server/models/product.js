"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "CategoryId",
        as: "category",
      });
    }
  }

  Product.init(
    {
      nama: DataTypes.STRING,
      price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER, // foreign key
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  return Product;
};
