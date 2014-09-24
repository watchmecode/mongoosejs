var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var SALT_WORK_FACTOR = 10;

var User;
var UserStatus = {
  active: 0,
  inactive: 1
};

var UserSchema = mongoose.Schema({
  firstName: {type: String},
  lastName: {type: String},
  username: {type: String, index: {unique: true}},
  email: {type: String},
  password: {type: String},
  status: {type: Number, default: UserStatus.active}
});

UserSchema.pre("save", function(next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.static("findActive", function(cb){
  var query = { status: UserStatus.active }
  return User.find(query, cb);
});

UserSchema.static("findByUsername", function(username, cb){
  var query = {
    username: username
  };
  User.findOne(query, cb);
});

UserSchema.static("login", function(username, password, cb){
  User.findByUsername(username, function(err, user){
    user.comparePassword(password, function(err, isMatch){
      if (err) { return cb(err); }

      if (isMatch){ 
        return cb(null, user); 
      } else {
        return cb(null, null);
      }

    });
  });
});

UserSchema.virtual("fullName").get(function(){
  return this.firstName + " " + this.lastName;
});

UserSchema.method("comparePassword", function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
});

User = mongoose.model("user", UserSchema);
module.exports = User;
