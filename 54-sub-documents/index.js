var mongoose = require("mongoose");
var Post = require("./post");

mongoose.connect("mongodb://localhost/some_database", function(err){
  if (err) { throw err; }
  console.log("connected");

  var query = {
    "author.name": "Derick Bailey"
  };

  Post.findOne(query, function(err, post){
    if (err) { throw err; }

    var comments = post.commentsByAuthor("S.");

    console.log(comments);

    process.exit();
  });

});
