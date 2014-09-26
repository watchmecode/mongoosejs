var mongoose = require("mongoose");
var CommentSchema = require("./commentSchema");
var CommentStatus = require("./commentStatus");

var Status = {
  draft: 0,
  scheduled: 1,
  published: 2
};

var PostSchema = new mongoose.Schema({
  title: {type: String},
  publishDate: {type: Date, required: true, default: Date.now},
  content: {type: String},
  author: {
    name: {type: String, required: true},
    bio: {type: String}
  },
  comments: [CommentSchema]
});

PostSchema.static("PostStatus", Status);
PostSchema.static("CommentStatus", CommentStatus);

var Post = mongoose.model("blog", PostSchema);
module.exports = Post;
