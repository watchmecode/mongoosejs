var mongoose = require("mongoose");
var User = require("./user");
var Post = require("./post");

mongoose.connect("mongodb://localhost/some_database", function(err){
  if (err) { throw err; }
  console.log("connected");

  User.login("derickbailey", "super s3cret", function(err, user){
    if (err) { throw err; }

    Post
      .find({author: user.id})
      .populate("author")
      .exec(function(err, posts){
        if (err) { throw err; }
        
        var post = posts[0];

        console.log(post.author.fullName);
        process.exit();
      });

  });
  

});
