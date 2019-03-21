module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        pickupdate: DataTypes.STRING,
        pickuptime: DataTypes.STRING,
        product: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        timestamp: DataTypes.STRING,
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        note: DataTypes.TEXT
    });
    return Order;
  };
  