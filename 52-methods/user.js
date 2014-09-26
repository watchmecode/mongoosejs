var mongoose = require("mongoose");
var bcrypt = require('bcrypt');

var SALT_WORK_FACTOR = 10;

var User;

var UserSchema = new mongoose.Schema({
  firstName: {type: String},
  lastName: {type: String},
  username: {type: String},
  email: {type: String},
  password: {type: String}
});

// virtual fields
// --------------

UserSchema.virtual("fullName").get(function(){
  return this.firstName + " " + this.lastName;
});

// filters
// -------

UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// instance methods
// ----------------

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// static methods
// --------------

UserSchema.static("findByEmail", function(email, cb){
  User.findOne({email: email}, cb);
});

UserSchema.static("attemptLogin", function(email, password, cb){
  User.findByEmail(email, function(err, user){
    if (err) { return cb(err); }

    if (!user){
      return cb();
    }

    user.comparePassword(password, function(err, isMatch){
      if (err) { return cb(err); }

      if (isMatch){ 
        return cb(null, user);
      } else {
        return cb();
      }

    });

  });
});

// model
// -----
User = mongoose.model("user", UserSchema);

// exports
// -------
module.exports = User;
