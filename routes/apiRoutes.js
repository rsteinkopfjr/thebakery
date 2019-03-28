var db = require("../models");

module.exports = function(app) {
  // Gets all products
  app.get("/api/products", function(req, res) {
    db.Product.findAll({}).then(function(dbProducts) {
      res.json(dbProducts);
    });
  });
  // Gets all orders
  app.get("/api/orders", function(req, res) {
    db.Order.findAll({}).then(function(dbOrders) {
      res.json(dbOrders);
    });
  });
  // Gets all inquiries
  app.get("/api/inquiries", function(req, res) {
    db.Inquiry.findAll({}).then(function(dbInquiries) {
      res.json(dbInquiries);
    });
  });
  // Creates a new product
  app.post("/api/products", function(req, res) {
    db.Product.create(req.body).then(function(dbProducts) {
      res.json(dbProducts);
    });
  });
  // Creates a new order
  app.post("/api/orders", function(req, res) {
    db.Order.create(req.body).then(function(dbOrders) {
      res.json(dbOrders);
    });
  });
  // Creates a new inquiry
  app.post("/api/inquiries", function(req, res) {
    db.Inquiry.create(req.body).then(function(dbInquiries) {
      res.json(dbInquiries);
    });
  });
  // Updates an order to completed
  app.put("/api/orders/update/:id", function(req, res) {
    db.Order.update(
    {
      completed: true
    },
    { where: { id: req.params.id } }
    ).then(function(dbOrders
    ) {
      res.json(dbOrders);
    });
  });
  // Updates an inquiry to completed
  app.put("/api/inquiries/update/:id", function(req, res) {
    db.Inquiry.update(
    { 
      completed: true 
    },
    { where: { id: req.params.id } }
    ).then(function(dbInquiries) {
      res.json(dbInquiries);
    });
  });
  // Deletes a product by id
  app.delete("/api/products/:id", function(req, res) {
    db.Product.destroy({ where: { id: req.params.id } }).then(function(
      dbProducts
    ) {
      res.json(dbProducts);
    });
  });
  // Deletes an order by id
  app.delete("/api/orders/:id", function(req, res) {
    db.Order.destroy({ where: { id: req.params.id } }).then(function(
      dbOrders
    ) {
      res.json(dbOrders);
    });
  });
  // Deletes an inquiry by id
  app.delete("/api/inquiries/:id", function(req, res) {
    db.Inquiry.destroy({ where: { id: req.params.id } }).then(function(
      dbInquiries
    ) {
      res.json(dbInquiries);
    });
  });
};
