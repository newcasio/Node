//separating the (req,res)=>{res.send....} out of where the routes are defined.

//Controller determines what happens where a route is hit.  ie when a route is hit, one of these exports is called/invoked essentially controlling what happens, either calling to the DB or just returning a string (completing request), or pass along to next middleware.

var Book = require("../models/book");
var Author = require("../models/author");
var Genre = require("../models/genre");
var BookInstance = require("../models/bookinstance");

var async = require("async");

//this whole file is imported into catalog.js ( var book_catalog = require ('../controllers/bookController')).
//this file export is called in catalog.js as book_catalog.index

//async.parallel will run all callback functions simultaneously.  Result will be an object as object passed in as first argument.  Second argument is run when all async functions are complete, ie render page passing hardcoded data and data (results object) returned from the callbacks.
exports.index = function(req, res) {
  async.parallel(
    {
      book_count: function(callback) {
        Book.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
      },
      book_instance_count: function(callback) {
        BookInstance.countDocuments({}, callback);
      },
      book_instance_available_count: function(callback) {
        BookInstance.countDocuments({ status: "Available" }, callback);
      },
      author_count: function(callback) {
        Author.countDocuments({}, callback);
      },
      genre_count: function(callback) {
        Genre.countDocuments({}, callback);
      }
    },
    //this is invoked when all the callbacks above are completed.
    function(err, results) {
      //   res.send(results);
      res.render("index", {
        title: "Local Library Home",
        error: err,
        data: results
        //moo: "Dodos"
      });
    }
  );
};

// Display list of all books.  This is bookController.book_list
exports.book_list = function(req, res, next) {
  //find {} (all) books, returning only the title and author
  Book.find({}, "title author")
    // .populate will give full author details instead of just the reference author id, does another query to populate the author details
    .populate("author")
    .exec(function(err, list_books) {
      if (err) {
        return next(err);
      }
      //render 'book_list' template passing this object of data
      res.render("book_list", { title: "Book List", book_list: list_books });
      //   res.send(list_books);
    });
};

// Display detail page for a specific book.
exports.book_detail = function(req, res, next) {
  async.parallel(
    {
      book: function(callback) {
        Book.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(callback);
      },
      book_instance: function(callback) {
        BookInstance.find({ book: req.params.id }).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      if (results.book == null) {
        // No results.
        var err = new Error("Book not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("book_detail", {
        title: "Title",
        book: results.book,
        book_instances: results.book_instance
      });
    }
  );
};

// Display book create form on GET.
exports.book_create_get = function(req, res) {
  res.send("NOT IMPLEMENTED: Book create GET");
};

// Handle book create on POST.
exports.book_create_post = function(req, res) {
  res.send("NOT IMPLEMENTED: Book create POST");
};

// Display book delete form on GET.
exports.book_delete_get = function(req, res) {
  res.send("NOT IMPLEMENTED: Book delete GET");
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
  res.send("NOT IMPLEMENTED: Book delete POST");
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
  res.send("NOT IMPLEMENTED: Book update GET");
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
  res.send("NOT IMPLEMENTED: Book update POST");
};
