var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Bakery Website",
        examples: dbExamples
      });
    });
  });
  // Load products page
  app.get("/products", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("products", {
        msgProd: "Bakery Dashbord",
        examples: dbExamples
      });
    });
  });
  // Load orders page
  app.get("/orders", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("orders", {
        msgOrd: "Bakery Dashbord",
        examples: dbExamples
      });
    });
  });
  // Load order form page
  app.get("/orderform", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("orderForm", {
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
