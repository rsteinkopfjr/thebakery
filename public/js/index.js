// References to page elements
// Products dashboard page elements
var $productText = $("#product-text");
var $productCategory = $("#product-category");
var $productDescription = $("#product-description");
var $productPrice = $("#product-price");
var $productList = $("#product-list");
var $submitBtn = $("#submit");
// Order form page elements
var $orderFirstName = $("#order-first-name");
var $orderLastName = $("#order-last-name");
var $orderEmail = $("#order-email");
var $orderPhone = $("#order-phone");
var $orderPickDate = $("#order-pick-date");
var $orderPickTime = $("#order-pick-time");
var $orderProduct = $("#order-product");
var $orderQuantity = $("#order-quantity");
var $orderNote = $("#order-note");
var $placeOrderBtn = $("#placeOrder");
// Orders dashboard page elements
var $orderList = $("#order-list");
var $completedOrderList = $("#completed-order-list");
var $completeBtn = $("#completed");
// Contact us page elements
var $inquiryName = $("#inquiry-name");
var $inquiryEmail = $("#inquiry-email");
var $inquiryMessage = $("#inquiry-message");
var $inquirySendBtn = $("#sendInquiry");
// Inquiry dashboard page elements
var $inquiryList = $("#inquiry-list");
var $completedInquiryList = $("#completed-inquiry-list");
var $completeInquiryBtn = $("#completedInquiry");
// Menu page elements
var $menuList = $("#menu-list");


// The API object contains methods for each kind of request we'll make
var API = {
  // Add a product to the database
  saveProduct: function (product) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/products",
      data: JSON.stringify(product)
    });
  },
  // Add an order to the database
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
  // Add an inquiry to the database
  saveInquiry: function (inquiry) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/inquiries",
      data: JSON.stringify(inquiry)
    });
  },
  // Get products from the database
  getProducts: function () {
    return $.ajax({
      url: "api/products",
      type: "GET"
    });
  },
  // Get orders from the database
  getOrders: function () {
    return $.ajax({
      url: "api/orders",
      type: "GET"
    });
  },
  // Get inquiries from the database
  getInquiries: function () {
    return $.ajax({
      url: "api/inquiries",
      type: "GET"
    });
  },
  // Updated orders in the database
  completeOrder: function (id) {
    return $.ajax({
      url: "api/orders/update/" + id,
      type: "PUT"
    });
  },
  // Updated inquiries in the database
  completeInquiry: function (id) {
    return $.ajax({
      url: "api/inquiries/update/" + id,
      type: "PUT"
    });
  },
  // Remove a product from the database
  deleteProduct: function (id) {
    return $.ajax({
      url: "api/products/" + id,
      type: "DELETE"
    });
  },
  // Remove an order from the database
  deleteOrder: function (id) {
    return $.ajax({
      url: "api/orders/" + id,
      type: "DELETE"
    });
  },
  // Remove an inquiry from the database
  deleteInquiry: function (id) {
    return $.ajax({
      url: "api/inquiries/" + id,
      type: "DELETE"
    });
  }
};

// Gets products from the db and repopulates the product dashboard list
var refreshProducts = function () {
  API.getProducts().then(function (data) {
    $productList.empty();
    for (var i = 0; i < data.length; i++) {
      var product = data[i];
      var $name = $("<h5>")
        .text("Name: " + product.text);
      var $category = $("<h6>")
        .text("Category: " + product.category);
      var $description = $("<h6>")
        .text("Description: " + product.description);
      var $price = $("<h6>")
        .text("Price: " + product.price);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": product.id
        })
        .append($name, $category, $description, $price);

      var $button = $("<button>")
        .addClass("btn btn-danger float-left delete")
        .text("Delete Product");

      $li.append($button);
      $productList.append($li);

    };
  });
};

// Gets products from the db and repopulates the menu list
var refreshMenuProducts = function () {
  API.getProducts().then(function (data) {
    $menuList.empty();
    for (var i = 0; i < data.length; i++) {
      var product = data[i];
      var $name = $("<li>")
        .text(product.text);
      var $description = $("<li>")
        .text(product.description);
      var $price = $("<p>")
        .text("$" + product.price + ".00");

      var $ul = $("<ul>")
        .attr({
          class: "menu-item",
          "data-id": product.id,
          style: "list-style-type: none"
        })
        .append($name, $description, $price);

      $menuList.append($ul);

    };
  });
};

// Gets orders from the db and repopulates the order dashboard list
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
      var $orderNote = $("<h6>")
        .text("Notes: " + order.note);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": order.id
        })
        .append($name, $email, $phone, $pickup, $product, $quantity, $timestamp, $orderNote);

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
      };
    };

  });
};

// Gets inquiries from the db and repopulates the inquiry dashboard list
var refreshInquiries = function () {
  API.getInquiries().then(function (data) {
    $inquiryList.empty();
    $completedInquiryList.empty();
    for (var i = 0; i < data.length; i++) {
      var inquiry = data[i];
      var $name = $("<li>")
        .text("Name: " + inquiry.name);
      var $email = $("<li>")
        .text("Email: " + inquiry.email);
      var $createdAt = $("<li>")
        .text("Sent: " + inquiry.createdAt);
      var $message = $("<p>")
        .text("Message: " + inquiry.message);

      var $ul = $("<ul>")
        .attr({
          class: "inquiry-item list-group-item",
          "data-id": inquiry.id,
          style: "list-style-type: none"
        })
        .append($name, $email, $createdAt, $message);

      var $completeBtn = $("<button>")
        .addClass("btn btn-success float-left completeInquiry")
        .text("Completed");
  
      var $button = $("<button>")
        .addClass("btn btn-danger float-left deleteInquiry")
        .text("Delete");
  
      if (inquiry.completed === false) {
        $ul.append($completeBtn);
        $inquiryList.append($ul);
      };
      if (inquiry.completed === true) {
        $ul.append($button);
        $completedInquiryList.append($ul);
      };
    };
  });
};

// Saves the new product to the db and refreshes the product dashboard and menu lists
var handleFormSubmit = function (event) {
  event.preventDefault();

  var product = {
    text: $productText.val().trim(),
    category: $productCategory.val().trim(),
    description: $productDescription.val().trim(),
    price: $productPrice.val().trim()
  };

  if (!(product.text && product.price)) {
    alert("You must at least enter a name and price!");
    return;
  }

  API.saveProduct(product).then(function () {
    refreshProducts();
    refreshMenuProducts();
  });

  $productText.val("");
  $productCategory.val("");
  $productDescription.val("");
  $productPrice.val("");

  alert("The product has been added to the list!");
};

// Saves the new order to the db and refreshes the order dashboard list
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
    timestamp: timestamp,
    note: $orderNote.val().trim()
  };

  if ((order.product === "undefined") || !(order.firstname && order.lastname && order.email && order.product && order.quantity)) {
    alert("You must at least enter your full name, email, item and quantity!");
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
  $orderPickTime.val("undefined");
  $orderProduct.val("undefined");
  $orderQuantity.val("");
  $orderNote.val("");

  alert("Your order has been sent to the baker!");
};

// Saves the new inquiry to the db and refreshes the inquiry dashboard list
var handleInquiryFormSubmit = function (event) {
  event.preventDefault();

  var inquiry = {
    name: $inquiryName.val().trim(),
    email: $inquiryEmail.val().trim(),
    message: $inquiryMessage.val().trim()
  };

  if (!(inquiry.name && inquiry.email && inquiry.message)) {
    alert("You must enter your name, email, and message!");
    return;
  }

  API.saveInquiry(inquiry).then(function () {
    refreshInquiries();
  });
  $inquiryName.val("");
  $inquiryEmail.val("");
  $inquiryMessage.val("");

  alert("Your message has been sent!");
};

// Updates the order in the db and refreshes the order dashboard list
var handleCompleteOrderBtn = function () {
  var idToUpdate = $(this)
    .parent()
    .attr("data-id");

  API.completeOrder(idToUpdate).then(function () {
    refreshOrders();
  });
};

// Updates the inquiry in the db and refreshes the inquiry dashboard list
var handleCompleteInquiryBtn = function () {
  var idToUpdateInquiry = $(this)
    .parent()
    .attr("data-id");

  API.completeInquiry(idToUpdateInquiry).then(function () {
    refreshInquiries();
  });
};

// Removes the product from the db and refreshes the product dashboard and menu list
var handleDeleteProductBtn = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteProduct(idToDelete).then(function () {
    refreshProducts();
    refreshMenuProducts();
  });
};

// Removes the order from the db and refreshes the order dashboard list
var handleDeleteOrderBtn = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteOrder(idToDelete).then(function () {
    refreshOrders();
  });
};

// Removes the inquiry from the db and refreshes the inquiry dashboard list
var handleDeleteInquiryBtn = function () {
  var idToDeleteInquiry = $(this)
    .parent()
    .attr("data-id");

  API.deleteInquiry(idToDeleteInquiry).then(function () {
    refreshInquiries();
  });
};

// Add event listeners to the submit, complete and delete buttons
$submitBtn.on("click", handleFormSubmit);
$placeOrderBtn.on("click", handleOrderFormSubmit);
$inquirySendBtn.on("click", handleInquiryFormSubmit);
$orderList.on("click", ".complete", handleCompleteOrderBtn);
$inquiryList.on("click", ".completeInquiry", handleCompleteInquiryBtn);
$productList.on("click", ".delete", handleDeleteProductBtn);
$completedOrderList.on("click", ".delete", handleDeleteOrderBtn);
$completedInquiryList.on("click", ".deleteInquiry", handleDeleteInquiryBtn);
