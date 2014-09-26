var mongoose = require("mongoose");
var Post = require("./post");

mongoose.connect("mongodb://localhost/some_database", function(err){
  if (err) { throw err; }

  console.log("connected");

  var query = {"author.name": "Derick Bailey"};
  Post.findOne(query, function(err, post){

    post.comments.push({
      firstName: "some",
      lastName: "Jerk",
      email: "jerk.face@example.com",
      status: Post.CommentStatus.flagged,
      content: "I HATE EVERYTHING ABOUT THIS BECAUSE I'M A BIG DUMB TROLL!!!!"
    });

    var comment = post.comments.create({
      firstName: "Amy",
      lastName: "Awesome",
      email: "amy.awesome@example.com",
      status: Post.CommentStatus.approved,
      content: "THIS IS AWESOME!"
    });

    console.log(comment);
    console.log("---");

    post.save(function(err){
      if (err) { throw err; }

      console.log(post);
      process.exit();
    });

  });
});
