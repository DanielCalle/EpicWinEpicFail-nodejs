var express = require('express'),
    router = express.Router(),
    video = require('./controllers/videoController');

router.get('/videos', video.all);

router.get('/videos/:id', video.byId);

router.post('/videos', video.create);

router.put('/videos/:id', video.update);

router.delete('/videos/:id', video.delete);

module.exports = router;
