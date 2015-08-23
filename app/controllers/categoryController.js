var moongose = require('mongoose'),
Category = require('../models/Category'),
queryParse = require('../helpers/queryParse');

var controller = {};
controller.all = function(req, res){
  conditions = queryParse(req.query.conditions);
  projection = queryParse(req.query.projection);
  options = queryParse(req.query.options);
  if(conditions === 0 || projection === 0 || options === 0)
    res.status(500).send();
  else
    Category.find(conditions, projection, options, function(err, category) {
      if(err) res.status(500).send(err.message);

      for(var i in category)
        category[i] = category[i].toClient();
      res.status(200).json({
        categories: category
        });
    });
};
controller.byId = function(req, res){
  var id = req.params.id;
  Category.findById(id,function(err, category) {
    if(err) res.status(500).send();

    if(category===undefined || category===null) res.status(404).send();

    res.status(200).json({
        category: category.toClient()
      });
  });
};
controller.create = function(req, res){
  var newCategory = req.body.category;
  if(!newCategory) res.status(400).send();

  Category.create(newCategory)
    .then(function(category) {
      res
        .status(201)
        .json({
          category: category.toClient()
          });
  });
};
controller.update = function(req, res){
  var id = req.params.id;
  var updatedCategory = req.body.category;
  if(!updatedCategory) res.status(400).send();

  Category.update({_id:id}, updatedCategory, function(err, results) {

    if(err)res.status(500).send(err);
      Category.findById(id,function(err,category){
        res.status(200).json({
            category: category.toClient()
          });
      });

  });

};
controller.delete = function(req, res){
  var id = req.params.id;
  var category = Category.findById(id, function(err, category){
    if(category===undefined||category===null) res.status(404).send();

    Category.remove({_id: id}, function(err){
      if(err) res.status(500).send();
      res.status(204).send();
    });
  });
};

module.exports = controller;
