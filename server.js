// Resources
var http = require('http'),
    express = require('express'),
    app = module.exports = express(),
    conf = require('./conf'),
    router = require('./app/routes'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

require('./app/passport')(passport);

// Conf server
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json('application/json'));
app.use(session({
  secret: conf.server.key,
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

/**
 * Start server if we're not someone else's dependency
 */
 /*

if (!module.parent) {
  mongoose.connect('mongodb://localhost/epicwin', function(err, res) {
      if(err) throw err;
      var server = http.createServer(app.expressServer);
      server.listen(conf.port);
  });
}
*/
if (!module.parent) {
mongoose.connect('mongodb://localhost/epicwin',
  function(err, res) {
    var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
    });

  });

}
