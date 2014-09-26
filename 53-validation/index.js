var mongoose = require("mongoose");
var User = require("./user");

mongoose.connect("mongodb://localhost/demo_database", function(err){
  if (err) { throw err; }

  var email = "tes ";

  User.findByEmail(email, function(err, user){
    if (err) { throw err; }

    if (user){
      console.log("that user exists!");
      process.exit();
    }

    var user = new User({
      email: email,
      firstName: "Derick",
      lastName: "Bailey",
      password: "super secret"
    });

    user.validate(function(err){
      if (!err) { 
        save(user);
        return; 
      }

      for (var path in err.errors){
        if (err.errors.hasOwnProperty(path)){
          var error = err.errors[path];

          console.log("Error: ", error.message);
        }
      }

      process.exit();
    });

  });

  function save(user){
    user.save(function(err){
      if (err) { throw err; }

      console.log(user);
      process.exit();
    });

  }

});
