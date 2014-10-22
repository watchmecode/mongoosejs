var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
  content: {type: String},
  date: {type: Date, default: Date.now},
  firstName: {type: String},
  lastName: {type: String},
  url: {type: String}
});

CommentSchema.virtual("fullName").get(function(){
  return this.firstName + " " + this.lastName;
});

module.exports = CommentSchema;
