// Get references to page elements
var $exampleText = $("#example-text");
var $exampleCategory = $("#example-category");
var $exampleDescription = $("#example-description");
var $examplePrice = $("#example-price");
var $submitBtn = $("#submit");
var $completeBtn = $("#completed");
var $exampleList = $("#example-list");
var $orderName = $("#order-name");
var $orderEmail = $("#order-email");
var $orderPhone = $("#order-phone");
var $orderProduct = $("#order-product");
var $orderQuantity = $("#order-quantity");
var $placeOrderBtn = $("#placeOrder");
var $addProductBtn = $("#addProduct");
var $orderList = $("#order-list");
var $completedOrderList = $("#completed-order-list");


// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  saveOrder: function (order) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/orders",
      data: JSON.stringify(order)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  getOrders: function () {
    return $.ajax({
      url: "api/orders",
      type: "GET"
    });
  },
  completeOrder: function (id) {
    return $.ajax({
      url: "api/orders/update/" + id,
      type: "PUT"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  },
  deleteOrder: function (id) {
    return $.ajax({
      url: "api/orders/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $name = $("<h5>")
        .text("Name: " + example.text);
      var $category = $("<h6>")
        .text("Category: " + example.category);
      var $description = $("<h6>")
        .text("Description: " + example.description);
      var $price = $("<h6>")
        .text("Price: " + example.price);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($name, $category, $description, $price);

      var $button = $("<button>")
        .addClass("btn btn-danger float-left delete")
        .text("Delete Product");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

var refreshOrders = function () {
  API.getOrders().then(function (data) {
    var $orders = data.map(function (order) {
      var $name = $("<h5>")
        .text("Customer Name: " + order.name);
      var $email = $("<h6>")
        .text("Email Address: " + order.email);
      var $phone = $("<h6>")
        .text("Phone Number: " + order.phone);
      var $product = $("<h6>")
        .text("Item: " + order.product);
      var $quantity = $("<h6>")
        .text("Quantity: " + order.quantity);
      var $timestamp = $("<h6>")
        .text("Time Created: " + order.timestamp);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": order.id
        })
        .append($name, $email, $phone, $product, $quantity, $timestamp);

      var $completeBtn = $("<button>")
        .addClass("btn btn-success float-left complete")
        .text("Completed");

      var $button = $("<button>")
        .addClass("btn btn-danger float-left delete")
        .text("Delete");

      $li.append($completeBtn, $button);

      return $orders;
    });

    $orderList.empty();
    $completedOrderList.empty();
    $orderList.append($orders);
    $completedOrderList.prepend($orders);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    category: $exampleCategory.val().trim(),
    description: $exampleDescription.val().trim(),
    price: $examplePrice.val().trim()
  };

  if (!(example.text && example.price)) {
    alert("You must at least enter a name and price!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleCategory.val("");
  $exampleDescription.val("");
  $examplePrice.val("");
};


// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleOrderFormSubmit = function (event) {
  event.preventDefault();
  var date = new Date();
  var timestamp = date.toLocaleString();

  var order = {
    name: $orderName.val().trim(),
    email: $orderEmail.val().trim(),
    phone: $orderPhone.val().trim(),
    product: $orderProduct.val().trim(),
    quantity: $orderQuantity.val().trim(),
    timestamp: timestamp
  };

  if (!(order.email && order.quantity)) {
    alert("You must at least enter an email and quantity!");
    return;
  }

  API.saveOrder(order).then(function () {
    refreshOrders();
  });

  $orderName.val("");
  $orderEmail.val("");
  $orderPhone.val("");
  $orderProduct.val("undefined");
  $orderQuantity.val("");
};

//Figure out in version 2
// var handleAddProductForm = function (event) {
//   event.preventDefault();
//   console.log(this);
//   var formItem = document.getElementById("product-order-area");
//   var cln = formItem.cloneNode(true);
//   document.getElementById("product-order-area-two").append(cln);
// };

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  console.log(this);
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
  API.deleteOrder(idToDelete).then(function () {
    refreshOrders();
  });
};


var handleCompleteBtnClick = function () {
  var idToUpdate = $(this)
    .parent()
    .attr("data-id");
  console.log(idToUpdate);

  API.completeOrder(idToUpdate).then(function () {
    refreshOrders();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$placeOrderBtn.on("click", handleOrderFormSubmit);
$orderList.on("click", ".complete", handleCompleteBtnClick);
$completedOrderList.on("click", ".complete", handleCompleteBtnClick);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
$orderList.on("click", ".delete", handleDeleteBtnClick);
$completedOrderList.on("click", ".delete", handleDeleteBtnClick);
