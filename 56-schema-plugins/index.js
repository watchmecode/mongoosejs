var mongoose = require("mongoose");
var User = require("./user");
var Post = require("./post");

mongoose.connect("mongodb://localhost/some_database", function(err){
  if (err) { throw err; }
  console.log("connected");

  User.findByUsername("derickbailey", function(err, user){
    if (err) { throw err; }

    var post = new Post({
      author: user,
      title: "oh, how sweet!",
      content: "Jelly beans ice cream dragée caramels biscuit croissant sesame snaps. Jelly jelly-o bear claw sweet cheesecake wafer tootsie roll jelly-o. Powder marzipan pudding sweet roll. Tootsie roll chocolate cheesecake. Cookie bonbon dragée jelly-o sweet roll cotton candy tart. Candy canes icing cookie ice cream bear claw. Sweet brownie jelly-o sugar plum chupa chups cotton candy. Pudding topping donut pie cheesecake topping danish biscuit apple pie. Candy jelly beans bear claw applicake powder. Bonbon muffin tart toffee sweet roll cheesecake cotton candy. Cookie liquorice icing. Oat cake sugar plum powder liquorice. Tart jelly-o lemon drops bear claw unerdwear.com jelly-o unerdwear.com."
    });

    post.save(function(err){
      if (err) { throw err; }
      console.log(post);
      process.exit();
    });

  });

});
