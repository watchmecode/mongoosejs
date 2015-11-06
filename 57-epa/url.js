var mongoose = require("mongoose");

var URLSchema = mongoose.Schema({
  title: {type: String},
  location: {type: String}
});

var URLModel = mongoose.model("url", URLSchema);
module.exports = URLModel;
