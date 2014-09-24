var mongoose = require("mongoose");
var User = require("./user");

mongoose.connect("mongodb://localhost/some_database", function(err){
  if (err) { throw err; }
  console.log("connected to mongodb");

  User.login('derickbailey', 'super s3cret', function(err, user){
    if (err) { throw err; }

    if (user){ 
      console.log("you logged in as", user.fullName);
    } else {
      console.log("you FAIL! NO LOGIN FOR YOU!");
    }

    process.exit();
  });

});

function newUser(cb){
  var user = new User({
    firstName: "Derick",
    lastName: "Bailey",
    username: "derickbailey",
    password: "super s3cret",
    email: "derick@example.com"
  });

  user.save(function(err){
    if (err) { return cb(err); }

    console.log(user);
    cb();
  });
}
