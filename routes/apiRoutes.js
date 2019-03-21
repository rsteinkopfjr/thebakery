var db = require("../models");

module.exports = function(app){
  // Get all examples
  app.get("/api/products", function(req, res){
    db.Product.findAll({}).then(function(dbProducts){
      res.json(dbProducts);
    });
  });
  // Get all orders
  app.get("/api/orders", function(req, res){
    db.Order.findAll({}).then(function(dbOrders){
      res.json(dbOrders);
    });
  });
  // Get all inquiries
  app.get("/api/inquiries", function(req, res){
    db.Inquiry.findAll({}).then(function(dbInquiries){
      res.json(dbInquiries);
    });
  });

  // Create a new example
  app.post("/api/products", function(req, res){
    db.Product.create(req.body).then(function(dbProducts){
      res.json(dbProducts);
    });
  });

  // Create a new order
  app.post("/api/orders", function(req, res){
    db.Order.create(req.body).then(function(dbOrders){
      res.json(dbOrders);
    });
  });
  // Create a new inquiry
  app.post("/api/inquiries", function(req, res){
    db.Inquiry.create(req.body).then(function(dbInquiries){
      res.json(dbInquiries);
    });
  });

  // Delete an example by id
  app.delete("/api/products/:id", function(req, res){
    db.Product.destroy({ where: { id: req.params.id } }).then(function(
    dbProducts) {
      res.json(dbProducts);
    });
  });

  // Delete an order by id
  app.delete("/api/orders/:id", function(req, res){
    db.Order.destroy({ where: { id: req.params.id } }).then(function (dbOrders
    ) {
      res.json(dbOrders);
    });
  });

  app.put("/api/orders/update/:id", function(req, res){
    db.Order.update({
      completed: true
    },
    { where: { id: req.params.id} }).then(function(dbOrders
    ){
      res.json(dbOrders);
    });
  });
};
