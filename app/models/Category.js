var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoryScheme = new Schema({
  title: String,
  description: String
});

CategoryScheme.method('toClient', function() {
    var obj = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;

    return obj;
});

var model = mongoose.model('category', CategoryScheme);

module.exports = model;
