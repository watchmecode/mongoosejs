var mongoose = require("mongoose");
var User = require("./user");

mongoose.connect("mongodb://localhost/demo_database", function(err){
  if (err) { throw err; }

  var query = {
    email: /derick/
  };

  User.findOne(query , function(err, user){
    if (err) { throw err; }

    console.log(user);
    process.exit();
  });

});
