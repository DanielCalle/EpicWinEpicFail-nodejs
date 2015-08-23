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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

VideoSchema.method('toClient', function() {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;

  return obj;
});

var model = mongoose.model('video', VideoSchema);

module.exports = model;
