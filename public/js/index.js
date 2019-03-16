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
var $orderArea = $("#order-area");

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
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
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

//Adding an item to the shopping cart
var handlePlaceOrder = function (event) {
    event.preventDefault();
    var date = new Date();
    var timestamp = date.toLocaleString();

    var itemValue = {
      name: $orderName.val().trim(),
      email: $orderEmail.val().trim(),
      phone: $orderPhone.val().trim(),
      product: $orderProduct.val().trim(),
      quantity: $orderQuantity.val().trim(),
      timestamp: timestamp
    }
    // console.log(itemValue)

    if (itemValue.product === "undefined" || (!(itemValue.quantity && itemValue.name && itemValue.email && itemValue.phone))) {
      alert("You must fill in all forms!");
      return;
    }
    var $name = $("<h5>")
      .text("Name: " + itemValue.name);
    var $email = $("<h6>")
      .text("Email: " + itemValue.email);
    var $phone = $("<h6>")
      .text("Phone: " + itemValue.phone);
    var $product = $("<h6>")
      .text("Item: " + itemValue.product);
    var $quantity = $("<h6>")
      .text("Quantity: " + itemValue.quantity);
    var $timestamp = $("<h6>")
      .text("Time of Order: " + itemValue.timestamp);
    var $button = $("<button>")
      .addClass("btn btn-danger float-left delete")
      .text("Delete Product");

    var $order = $("<li>");
    $order.addClass("list-group-item");
    $order.append($name, $email, $phone, $product, $quantity, $timestamp);
    $order.append($button);


    $orderArea.append($order);
    $orderName.val("");
    $orderEmail.val("");
    $orderPhone.val("");
    $orderProduct.val("undefined");
    $orderQuantity.val("");
};

var handleCompleteOrder = function () {
  console.log(this);
}
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
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
$placeOrderBtn.on("click", handlePlaceOrder);
