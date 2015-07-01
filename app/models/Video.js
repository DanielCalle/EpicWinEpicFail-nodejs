var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
  title: String,
  type: String,
  response: String,
  videoId: String,
  start: Number,
  pause: Number,
  stop: Number
});

var model = mongoose.model('videos', VideoSchema);

module.exports = model;
