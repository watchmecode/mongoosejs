var mongoose = require("mongoose");
var User = require("./user");

mongoose.connect("mongodb://localhost/some_database", function(err){
  if (err) { throw err; }
  console.log("connected to mongodb");

  newUser(function(err){
    if (err) { throw err; }
    process.exit();
  });

});

function newUser(cb){
  var user = new User({
    firstName: "Derick",
    lastName: "Bailey",
    email: "asdf asdf"
  });

  user.validate(function(err){
    if (err){ 
      if (err.name === "ValidationError"){ 
        showValidationErrors(err.errors);
      }
      return cb();
    } 

    user.save(function(err){
      if (err) { return cb(err); }
      console.log(user);
      cb();
    });
  });

}

function showValidationErrors(errors){
  for(var key in errors){
    if (errors.hasOwnProperty(key)){
      var err = errors[key];

      if (err.type === "required") {
        console.log("Validation Error:", err.path, "is required.");
      } else {
        console.log("Validation Error:", err.message);
      }

    }
  }
}
