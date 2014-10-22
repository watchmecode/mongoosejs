var mongoose = require("mongoose");
var CommentSchema = require("./commentSchema");

var PostSchema = new mongoose.Schema({
  date: {type: Date, required: true, default: Date.now},
  title: {type: String},
  content: {type: String},
  author: { 
    name: {type: String},
    email: {type: String}
  },
  comments: [CommentSchema]
});

PostSchema.method("commentsByAuthor", function(firstName){
  var comments = [];

  this.comments.forEach(function(c){
    if (c.firstName === firstName){
      comments.push(c);
    }
  });

  return comments;
});

var Post = mongoose.model("post", PostSchema);
module.exports = Post;
