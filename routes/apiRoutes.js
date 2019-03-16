var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });
  // Get all orders
  app.get("/api/orders", function (req, res) {
    db.Order.findAll({}).then(function (dbOrders) {
      res.json(dbOrders);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Create a new order
  app.post("/api/orders", function (req, res) {
    db.Order.create(req.body).then(function (dbOrder) {
      res.json(dbOrder);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });

  // Delete an order by id
  app.delete("/api/orders/:id", function (req, res) {
    db.Order.destroy({ where: { id: req.params.id } }).then(function (
      dbOrder
    ) {
      res.json(dbOrder);
    });
  });
};
