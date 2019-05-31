var Genre = require("../models/genre");
var async = require("async");

//installed express-validator, wanting only these functions (body, validationResult, santitizeBody)
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

var Book = require("../models/book");

// Display list of all Genre.
exports.genre_list = function(req, res) {
  Genre.find()
    .sort([["name", "ascending"]])
    // .distinct("name")
    .exec(function(err, genre_list) {
      if (err) {
        return next(err);
      }
      //no errors
      // res.send(genre_list);
      res.render("genre_list", {
        title: "Genre List",
        list_genres: genre_list
      });
    });
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res, next) {
  async.parallel(
    {
      genre: function(callback) {
        Genre.findById(req.params.id).exec(callback);
      },

      genre_books: function(callback) {
        Book.find({ genre: req.params.id }).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      if (results.genre == null) {
        // No results.
        var err = new Error("Genre not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render
      res.render("genre_detail", {
        title: "Genre Detail",
        genre: results.genre,
        genre_books: results.genre_books
      });
      // res.send(results);
    }
  );
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
  res.render("genre_form", { title: "Create Genre" });
};

// NOW ARRAY of middleware functions, each element completed in order!!. Empty form from get request, this val/sanit submitted data before exposed to server
exports.genre_create_post = [
  //validate name field is not empty
  body("name", "Genre name requried")
    .isLength({ min: 1 })
    .trim(), //trim to discard any leading or trailing whitespace
  //sanitize (or escape) the name field, removes any dangerous HTML
  sanitizeBody("name").escape(),
  //process data regardless of any errors from validation and sanitation
  (req, res, next) => {
    //get any validation errors from above.  If any errors from above body checks, these are extracted by validationResult, and are stored in a object/array to be checked later.
    const errors = validationResult(req);
    //create a new genre object with validated and sanitized data above.  Here the genre model only has a name field, so we set the 'name' value to the checked and cleaned value from above.
    var genre = new Genre({
      name: req.body.name
    });

    //if const errors is not empty (there are errors)
    if (!errors.isEmpty()) {
      //re-render form with entered values, including error messages
      res.render("genre_form", {
        title: "Create genre",
        genre: genre,
        errors: errors.array()
      });
      return;
    } else {
      //check if genre alrady exists
      Genre.findOne({ name: req.body.name }).exec(function(err, found_genre) {
        if (err) {
          return next(err);
        }
        //if genre found in Genre list (already exists)
        if (found_genre) {
          res.redirect(found_genre.url);
        } else {
          //save genre and redirect to genre detail page
          genre.save(function(err) {
            if (err) {
              return next(err);
            }
            res.redirect(genre.url);
          });
        }
      });
    }
  }
];

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
  res.send("NOT IMPLEMENTED: Genre delete GET");
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
  res.send("NOT IMPLEMENTED: Genre delete POST");
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
  res.send("NOT IMPLEMENTED: Genre update GET");
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
  res.send("NOT IMPLEMENTED: Genre update POST");
};
