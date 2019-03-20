var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        title: "Homepage",
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });
  app.get("/check-out", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("check-out", {
        title: "check-out",
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });
  app.get("/contact-us", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("contact-us", {
        title: "contact-us",
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });
  app.get("/shop-page", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("shop-page", {
        title: "shop-page",
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });
  app.get("/shopping-cart", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("shopping-cart", {
        title: "shopping-cart",
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
