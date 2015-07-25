var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var VideoSchema = new Schema({
  category: ObjectId,
  user: ObjectId,
  title: String,
  win: Boolean,
  videoId: String,
  start: Number,
  pause: Number,
  stop: Number,
  active: { type: Boolean, default: true},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

var model = mongoose.model('video', VideoSchema);

module.exports = model;
