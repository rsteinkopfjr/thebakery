module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        product: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        timestamp: DataTypes.STRING
    });
    return Order;
  };
  