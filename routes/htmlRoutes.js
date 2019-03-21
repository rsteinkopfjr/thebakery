var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Product.findAll({}).then(function (dbProducts) {
      res.render("index", {
        msg: "Bakery Website",
        products: dbProducts
      });
    });
  });
  // Load products page
  app.get("/products", function (req, res) {
    db.Product.findAll({}).then(function (dbProducts) {
      res.render("products", {
        msgProd: "Bakery Dashboard",
        products: dbProducts
      });
    });
  });
  // Load orders page
  app.get("/orders", function (req, res) {
    db.Order.findAll({}).then(function (dbOrders) {
      res.render("orders", {
        msgOrd: "Bakery Dashboard",
        orders: dbOrders
      });
    });
  });
  // Load order form page
  app.get("/orderform", function (req, res) {
    db.Product.findAll({}).then(function (dbProducts, dbOrders) {
      res.render("orderForm", {
        products: dbProducts,
        orders: dbOrders
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/product/:id", function (req, res) {
    db.Product.findOne({ where: { id: req.params.id } }).then(function (
      dbProducts
    ) {
      res.render("product", {
        product: dbProducts
      });
    });
  });

  // Load order page and pass in an example by id
  app.get("/order/:id", function (req, res) {
    db.Order.findOne({ where: { id: req.params.id } }).then(function (
      dbOrders
    ) {
      res.render("order", {
        order: dbOrders
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
