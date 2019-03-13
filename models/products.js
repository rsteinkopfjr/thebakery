var Sequelize = require('sequelize');
var sequelize = require('../config/connection.js');

var Products = sequelize.define("products",{
  product_name: Sequelize.STRING,
  product_description = Sequelize.STRING,
  product_price = Sequelize.INTEGER
});

Products.sync();

module.exports = Products;