var Sequelize = require('sequelize');
var sequelize = require('../config/connection.js');

var Sylvana = sequelize.define("sylvanas",{
  sylvana_name: Sequelize.STRING,
  sylvana_description = Sequelize.STRING,
  sylvana_price = Sequelize.INTEGER
});

Sylvana.sync();

var Cupcake = sequelize.define("cupcakes",{
  cupcake_name: Sequelize.STRING,
  cupcake_description = Sequelize.STRING,
  cupcake_price = Sequelize.INTEGER
});

Cupcake.sync();

var DessertCup = sequelize.define("dessertCups",{
  dessertcup_name: Sequelize.STRING,
  dessertcup_description = Sequelize.STRING,
  dessertcup_price = Sequelize.INTEGER
});

DessertCup.sync();

var DripCake = sequelize.define("dripCakes",{
  dripcake_name: Sequelize.STRING,
  dripcake_description = Sequelize.STRING,
  dripcake_price = Sequelize.INTEGER
});

DripCake.sync();

module.exports = Sylvana;
module.exports = Cupcake;
module.exports = DessertCup;
module.exports = DripCake;