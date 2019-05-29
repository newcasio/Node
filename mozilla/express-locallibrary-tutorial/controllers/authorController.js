//require associated model
var Author = require("../models/book");

//show all authors
exports.author_list = (req, res) => {
  res.send("not implemented: AUthor list");
};

//show author with id = ?
exports.author_detail = (req, res) => {
  res.send(`not implemented: author detail ${req.params.id}`);
};

// Display Author create form on GET.
exports.author_create_get = function(req, res) {
  res.send("NOT IMPLEMENTED: Author create GET ya");
};

// Handle Author create on POST.
exports.author_create_post = function(req, res) {
  res.send("NOT IMPLEMENTED: Author create POST");
};

// Display Author delete form on GET.
exports.author_delete_get = function(req, res) {
  res.send("NOT IMPLEMENTED: Author delete GET");
};

// Handle Author delete on POST.
exports.author_delete_post = function(req, res) {
  res.send("NOT IMPLEMENTED: Author delete POST");
};

// Display Author update form on GET.
exports.author_update_get = function(req, res) {
  res.send("NOT IMPLEMENTED: Author update GET");
};

// Handle Author update on POST.
exports.author_update_post = function(req, res) {
  res.send("NOT IMPLEMENTED: Author update POST");
};
