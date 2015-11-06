var mongoose = require("mongoose");
var CommentSchema = require("./commentSchema");

var SchemaTypes = mongoose.Schema.Types;

var PostSchema = new mongoose.Schema({
  date: {type: Date, required: true, default: Date.now},
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {
    type: SchemaTypes.ObjectId,
    ref: "user"
  },
  comments: [CommentSchema]
});

PostSchema.static("loadById", function(id, cb){
  Post.findById(id)
    .populate("author")
    .exec(function(err, post){
      if (err) { throw err; }

      var options = {
        path: "author.url",
        model: "url"
      };

      Post.populate(post, options, cb);
    });

});

var Post = mongoose.model("post", PostSchema);
module.exports = Post;
