var mongoose = require("mongoose");
var User = require("./user");

mongoose.connect("mongodb://localhost/demo_database", function(err){
  if (err) { throw err; }

  var email = "derick@mutedsolutions.com";
  var password = "super secret";

  User.attemptLogin(email, password, function(err, user){
    if (err) { throw err; }

    if (user){
      console.log("You logged in as", user.fullName);
    } else {
      console.log("Invalid username or password");
    }

    process.exit();
  });

});
