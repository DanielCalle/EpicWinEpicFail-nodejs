var mongoose = require('mongoose');
var User = require('../models/User');
// Estrategia de autenticación con Twitter
var TwitterStrategy = require('passport-twitter').Strategy;
// Fichero de configuración donde se encuentran las API keys
// Este archivo no debe subirse a GitHub ya que contiene datos
// que pueden comprometer la seguridad de la aplicación.
var config = require('../../conf');

module.exports = new TwitterStrategy({
  consumerKey     : config.twitter.key,
  consumerSecret  : config.twitter.secret,
  callbackURL     : '/auth/twitter/callback'
}, function(accessToken, refreshToken, profile, done) {
  // Busca en la base de datos si el usuario ya se autenticó en otro
  // momento y ya está almacenado en ella
  User.findOne({provider_id: profile.id}, function(err, user) {
    if(err) throw(err);
    // Si existe en la Base de Datos, lo devuelve
    if(!err && user !== null) return done(null, user);

    // Si no existe crea un nuevo objecto usuario
    user = new User({
      provider_id  : profile.id,
      provider     : profile.provider,
      name         : profile.displayName,
      photo        : profile.photos[0].value
    });
    //...y lo almacena en la base de datos
    user.save(function(err) {
      if(err) throw err;
      done(null, user);
    });
  });
});
