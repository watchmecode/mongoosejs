var mongoose = require("mongoose");
var User = require("./user");
var Post = require("./post");

mongoose.connect("mongodb://localhost/some_database", function(err){
  if (err) { throw err; }
  console.log("connected");

  var username = "derickbailey";

  User.findByUsername(username, function(err, user){
    if (err) { throw err; }

    user.setStatus(User.Status.active);

    user.save(function(err){
      if (err) { throw err; }

      console.log(user);
      process.exit();
    });
  });
});
