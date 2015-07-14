var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
  category: ObjectId,
  user: ObjectId,
  title: String,
  win: Boolean,
  videoId: String,
  response: String,
  start: Number,
  pause: Number,
  stop: Number,
  active: { type: Boolean, default: true},
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

var model = mongoose.model('video', VideoSchema);

module.exports = model;
