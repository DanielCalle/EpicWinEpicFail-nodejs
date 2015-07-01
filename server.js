// Resources
var http = require('http'),
    express = require('express'),
    app = module.exports = express(),
    conf = require('./conf'),
    router = require('./app/routes'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

// Conf server
app.use(bodyParser.json('application/json'));
app.use(router);

/**
 * Start server if we're not someone else's dependency
 */
if (!module.parent) {
  mongoose.connect('mongodb://localhost/epicwin', function(err, res) {
      if(err) throw err;
      app.listen(conf.port);
  });
}
