var moongose = require('mongoose'),
  User = require('../models/User');

var controller = {};

controller.me =  function(req, res) {
  console.log(req.user._id);
  if(!req.user) res.status(401).send();
  else
    User.findById(req.user._id, function(err, user){
      return user.toClient();
    });
};

controller.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

module.exports = controller;
