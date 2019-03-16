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
    db.Order.findAll({}).then(function (dbOrders) {
      res.render("orders", {
        msgOrd: "Bakery Dashbord",
        orders: dbOrders
      });
    });
  });
  // Load order form page
  app.get("/orderform", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples, dbOrders) {
      res.render("orderForm", {
        examples: dbExamples,
        orders: dbOrders
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

  // Load order page and pass in an example by id
  app.get("/order/:id", function (req, res) {
    db.Order.findOne({ where: { id: req.params.id } }).then(function (
      dbOrder
    ) {
      res.render("order", {
        order: dbOrder
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
