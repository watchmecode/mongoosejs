var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  firstName: {type: String},
  lastName: {type: String},
  username: {type: String},
  email: {type: String}
});

var User = mongoose.model("user", UserSchema);

module.exports = User;
