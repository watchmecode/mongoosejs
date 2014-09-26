var mongoose = require("mongoose");
var CommentStatus = require("./commentStatus");

var CommentSchema = mongoose.Schema({
  date: {type: Date, required: true, default: Date.now},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String},
  content: {type: String, required: true},
  status: {type: Number, required: true, default: CommentStatus.pending}
});

module.exports = CommentSchema;
