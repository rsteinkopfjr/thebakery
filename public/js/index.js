// Get references to page elements
var $exampleText = $("#example-text");
var $exampleCategory = $("#example-category");
var $exampleDescription = $("#example-description");
var $examplePrice = $("#example-price");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
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
var handleFormSubmit = function(event) {
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

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleCategory.val("");
  $exampleDescription.val("");
  $examplePrice.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
