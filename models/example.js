module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER
  });
  return Example;
};
