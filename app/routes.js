var express = require('express'),
    router = express.Router(),
    video = require('./controllers/videoController'),
    category = require('./controllers/categoryController');

router.get('/videos', video.all);

router.get('/videos/:id', video.byId);

router.post('/videos', video.create);

router.put('/videos/:id', video.update);

router.delete('/videos/:id', video.delete);

router.get('/categories', category.all);

router.get('/categories/:id', category.byId);

router.post('/categories', category.create);

router.put('/categories/:id', category.update);

router.delete('/categories/:id', category.delete);

module.exports = router;
