var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Product.findAll({}).then(function(dbProducts) {
      res.render("index", {
        title: "Taste and See Bakery",
        products: dbProducts
      });
    });
  });
  // Load menu page
  app.get("/menu", function(req, res) {
    db.Product.findAll({}).then(function(dbProducts) {
      res.render("menu", {
        title: "Taste and See - Menu",
        products: dbProducts
      });
    });
  });
  // Load about page
  app.get("/about", function(req, res) {
    db.Product.findAll({}).then(function(dbProducts) {
      res.render("about", {
        title: "Taste and See - About",
        products: dbProducts
      });
    });
  });
  // Load contact page
  app.get("/contact", function(req, res) {
    db.Product.findAll({}).then(function(dbProducts) {
      res.render("contact", {
        title: "Taste and See - Contact Us",
        products: dbProducts
      });
    });
  });
  // Load dashboard page
  app.get("/dashboard", function(req, res) {
    db.Product.findAll({}).then(function(dbProducts) {
      res.render("dashboard", {
        title: "Bakery Dashboard",
        msgDash: "Bakery Dashboard",
        products: dbProducts
      });
    });
  });
  // Load inquires page
  app.get("/inquiries", function(req, res) {
    db.Inquiry.findAll({}).then(function(dbInquiries) {
      res.render("inquiries", {
        title: "Manage - Inquiries",
        msgInq: "Bakery Dashboard",
        inquiries: dbInquiries
      });
    });
  });
  // Load products page
  app.get("/products", function(req, res) {
    db.Product.findAll({}).then(function(dbProducts) {
      res.render("products", {
        title: "Manage - Products",
        msgProd: "Bakery Dashboard",
        products: dbProducts
      });
    });
  });
  // Load orders page
  app.get("/orders", function(req, res) {
    db.Order.findAll({}).then(function(dbOrders) {
      res.render("orders", {
        title: "Manage - Orders",
        msgOrd: "Bakery Dashboard",
        orders: dbOrders
      });
    });
  });
  // Load order form page
  app.get("/orderform", function(req, res) {
    db.Product.findAll({}).then(function(dbProducts, dbOrders) {
      res.render("orderForm", {
        title: "Order Form",
        products: dbProducts,
        orders: dbOrders
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/product/:id", function(req, res) {
    db.Product.findOne({ where: { id: req.params.id } }
    ).then(function(
      dbProducts
      ) {
        res.render("product", {
        product: dbProducts
        });
      });
  });

  // Load order page and pass in an example by id
  app.get("/order/:id", function(req, res) {
    db.Order.findOne({ where: { id: req.params.id } })
      .then(function(dbOrders) {
        res.render("order", {
        order: dbOrders
        });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
