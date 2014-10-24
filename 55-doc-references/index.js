var mongoose = require("mongoose");
var User = require("./user");
var Post = require("./post");
var URL = require("./url");

mongoose.connect("mongodb://localhost/some_database", function(err){
  if (err) { throw err; }
  console.log("connected");

  var urlId = "544a93e63d1d4eb04a605af1";
  var postId= "544a8fe9ba4294004662ec03";

  Post.loadById(postId, function(err, post){
    if (err) { throw err; }

    console.log(post);
    process.exit();
  });
});
