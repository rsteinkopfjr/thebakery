// Get references to page elements
var $exampleText = $("#example-text");
var $exampleCategory = $("#example-category");
var $exampleDescription = $("#example-description");
var $examplePrice = $("#example-price");
var $submitBtn = $("#submit");
var $completeBtn = $("#completed");
var $exampleList = $("#example-list");
var $orderFirstName = $("#order-first-name");
var $orderLastName = $("#order-last-name");
var $orderEmail = $("#order-email");
var $orderPhone = $("#order-phone");
var $orderPickDate = $("#order-pick-date");
var $orderPickTime = $("#order-pick-time");
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
    $exampleList.empty();
    for (var i = 0; i < data.length; i++) {
      var example = data[i];
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
      $exampleList.append($li);

    };

    // $exampleList.append($li);
  });
};

var refreshOrders = function () {
  API.getOrders().then(function (data) {
    $orderList.empty();
    $completedOrderList.empty();
    for (var i = 0; i < data.length; i++) {
      var order = data[i];
      var fullname = order.firstname + " " + order.lastname;
      var $name = $("<h5>")
        .text("Customer Name: " + fullname);
      var $email = $("<h6>")
        .text("Email Address: " + order.email);
      var $phone = $("<h6>")
        .text("Phone Number: " + order.phone);
      var $pickup = $("<h6>")
        .text("Requested PickUp: " + order.pickupdate + " @ " + order.pickuptime);
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
        .append($name, $email, $phone, $pickup, $product, $quantity, $timestamp);

      var $completeBtn = $("<button>")
        .addClass("btn btn-success float-left complete")
        .text("Completed");

      var $button = $("<button>")
        .addClass("btn btn-danger float-left delete")
        .text("Delete");

      if (order.completed === false) {
        $li.append($completeBtn);
        $orderList.append($li);
      };
      if (order.completed === true) {
        $li.append($button);
        $completedOrderList.append($li);
      }
    };

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
    firstname: $orderFirstName.val().trim(),
    lastname: $orderLastName.val().trim(),
    email: $orderEmail.val().trim(),
    phone: $orderPhone.val().trim(),
    pickupdate: $orderPickDate.val().trim(),
    pickuptime: $orderPickTime.val().trim(),
    product: $orderProduct.val().trim(),
    quantity: $orderQuantity.val().trim(),
    timestamp: timestamp
  };

  if ((order.product === "undefined") || !(order.firstname && order.lastname && order.email && order.product && order.quantity)) {
    alert("You must at least enter your name, email, item and quantity!");
    return;
  }

  API.saveOrder(order).then(function () {
    refreshOrders();
  });
  $orderFirstName.val("");
  $orderLastName.val("");
  $orderEmail.val("");
  $orderPhone.val("");
  $orderPickDate.val("");
  $orderPickTime.val("");
  $orderProduct.val("undefined");
  $orderQuantity.val("");

  alert("Your order has been sent to the baker!");
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
var handleDeleteProductBtn = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

var handleDeleteOrderBtn = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteOrder(idToDelete).then(function () {
    refreshOrders();
  });
};


var handleCompleteBtnClick = function () {
  var idToUpdate = $(this)
    .parent()
    .attr("data-id");

  API.completeOrder(idToUpdate).then(function () {
    refreshOrders();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$placeOrderBtn.on("click", handleOrderFormSubmit);
$orderList.on("click", ".complete", handleCompleteBtnClick);
$exampleList.on("click", ".delete", handleDeleteProductBtn);
$completedOrderList.on("click", ".delete", handleDeleteOrderBtn);
