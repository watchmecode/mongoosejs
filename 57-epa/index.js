var mongoose = require("mongoose");
var User = require("./user");
var Post = require("./post");
var URL = require("./url");

var epa = require("epa").getEnvironment();
var mongoConnection = epa.get("mongodb");

console.log("-----------");
console.log(mongoConnection);
console.log(epa.get("shared setting"));
console.log(epa.get("sample"));
console.log("-----------");

mongoose.connect(mongoConnection, function(err){
  if (err) { throw err; }
  console.log("connected");

  var postId= "544a8fe9ba4294004662ec03";

  Post.loadById(postId, function(err, post){
    if (err) { throw err; }

    console.log(post);
    process.exit();
  });
});
