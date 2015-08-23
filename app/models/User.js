var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
  name: String,
  email: { type: String, index: { unique: true } },
  password: String,
  provider: String,
  provider_id: {type: String, unique: true},
  photo: String,
  role: { type: String, enum: [ 'user', 'editor', 'admin' ], default:'user' },
  active: { type: Boolean, default:true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.method('toClient', function() {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;

  return obj;
});

var model = mongoose.model('user', UserSchema);

module.exports = model;
