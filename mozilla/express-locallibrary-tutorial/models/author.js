var mongoose = require("mongoose");

//create a new Schema instance using the schema constructor from mongoose
var Schema = mongoose.Schema;
var moment = require("moment");

//define fields of schema
var AuthorSchema = new Schema(
  {
    first_name: { type: String, required: true, max: 100 },
    family_name: { type: String, required: true, max: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date }
  },
  { getters: true }
);

//virtual for author's full name, access by ".name", but not saved to DB
AuthorSchema.virtual("name").get(function() {
  return this.family_name + ", " + this.first_name;
});

//virtual for author's lifespan
AuthorSchema.virtual("lifespan").get(() => {
  return (
    this.date_of_death.getYear() - this.date_of_birth.getYear()
  ).toString();
});

//virtual for author's URL
AuthorSchema.virtual("url").get(() => {
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("birth_formatted").get(function() {
  return moment(this.date_of_birth).format("MMMM Do, YYYY");
});
AuthorSchema.virtual("death").get(function() {
  return moment(this.date_of_death).format("MMMM Do, YYYY");
});

//export the model called Author, which uses AuthorSchema
module.exports = mongoose.model("Author", AuthorSchema);
