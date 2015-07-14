var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserScheme = new Schema({
  name: String,
  email: { type: String, index: { unique: true } },
  password: String,
  role: { type: String, enum: [ 'user', 'editor', 'admin' ], default:'user' },
  active: { type: Boolean, default:true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

var model = moongose.model('user', UserScheme);

module.exports = model;
