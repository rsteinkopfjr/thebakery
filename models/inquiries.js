module.exports = function(sequelize, DataTypes) {
    var Inquiry = sequelize.define("Inquiry", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        note: DataTypes.TEXT
    });
    return Inquiry;
  };