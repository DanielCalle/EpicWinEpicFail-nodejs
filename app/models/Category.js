var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoryScheme = new Scheme({
  title: String,
  description: String
});

var model = mongoose.model('category', CategoryScheme);

module.exports = model;
