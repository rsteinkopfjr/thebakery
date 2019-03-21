module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    text: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER
  });
  return Product;
};
