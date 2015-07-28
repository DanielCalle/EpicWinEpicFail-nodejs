var moongose = require('mongoose'),
Video = require('../models/Video');

var controller = {};

controller.all = function(req,res){
  Video.find(function(err, videos) {
    if(err) res.send(500, err.message);
    for(var i in videos)
      videos[i] = videos[i].toClient();
    res.status(200).json({
      videos: videos
      });
  });
};

controller.byId = function(req,res){
  var id = req.params.id;
  Video.findById(id,function(err, video) {
    if(err) res.status(500).send();
    if(video===undefined||video===null) res.status(404).send();
    res.status(200).json({
        video: video.toClient()
      });
  });
};

controller.create = function(req, res) {
  // manipulate request
  var newVideo = req.body.video;
  if(!newVideo) res.status(400).send();
  // save to storage
  Video.create(newVideo)
    .then(function(video) {
      // response
      res
        .status(201)
        .json({
          video: video.toClient()
          });
  });
};

controller.update = function (req, res) {
  var id = req.params.id;
  var updatedVideo = req.body.video;
  if(!updatedVideo) res.status(400).send();
  Video.update({_id:id}, updatedVideo, function(err, results) {

    if(err)res.status(500).send(err);
      Video.findById(id,function(err,video){
        res.status(200).json({
            video: video.toClient()
          });
      });

  });

};

controller.delete = function (req, res) {
  var id = req.params.id;
  var video = Video.findById(id, function(err, video){
    if(video===undefined||video===null) res.status(404).send();
    Video.remove({_id: id}, function(err){
      if(err) res.status(500).send();
      res.status(204).send();
    });
  });

};

module.exports = controller;
