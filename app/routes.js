var express = require('express'),
    router = express.Router(),
    moongose = require('mongoose'),
    Video = require('./models/Video.js');

router.get('/videos',function(req,res){
  Video.find(function(err, videos) {
    if(err) res.send(500, err.message);
    console.log('GET /videos');
    res.status(200).jsonp(videos);
  });
});

router.get('/videos/:id',function(req,res){
  var id = req.params.id;
  Video.findById(id,function(err, video) {
    if(err) res.status(500);
    res.status(200).jsonp(video);
  });
});

router.post('/videos',function(req, res) {
  // manipulate request
  var newVideo = req.body.video;

  // save to storage
  Video.create(newVideo)
    .then(function(video) {
      // response
      res
        .status(201)
        .json(video.toJSON());
    });
});

module.exports = router;
