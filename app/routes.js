var express = require('express'),
    router = express.Router(),
    video = require('./controllers/videoController'),
    category = require('./controllers/categoryController'),
    user = require('./controllers/userController'),
    passport = require('passport');

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

router.get('/user/me',user.me);

router.get('/logout', user.logout);

// Ruta para autenticarse con Twitter (enlace de login)
router.get('/auth/twitter', passport.authenticate('twitter'));
// Ruta para autenticarse con Facebook (enlace de login)
router.get('/auth/facebook', passport.authenticate('facebook'));
// Ruta de callback, a la que redirigirá tras autenticarse con Twitter.
// En caso de fallo redirige a otra vista '/login'
router.get('/auth/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/user/me', failureRedirect: '/login' }
));
// Ruta de callback, a la que redirigirá tras autenticarse con Facebook.
// En caso de fallo redirige a otra vista '/login'
router.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/user/me', failureRedirect: '/login' }
));

module.exports = router;
