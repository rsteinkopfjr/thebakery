module.exports = function(sequelize, DataTypes) {
  var Inquiry = sequelize.define("Inquiry", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.TEXT,
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Inquiry;
};
