module.exports = function(sequelize, DataTypes) {
    var Inquiry = sequelize.define("Inquiry", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        message: DataTypes.TEXT
    });
    return Inquiry;
  };