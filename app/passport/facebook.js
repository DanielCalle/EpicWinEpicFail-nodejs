var mongoose = require('mongoose');
var User = require('../models/User');
// Estrategia de autenticación con Facebook
var FacebookStrategy = require('passport-facebook').Strategy;
// Fichero de configuración donde se encuentran las API keys
// Este archivo no debe subirse a GitHub ya que contiene datos
// que pueden comprometer la seguridad de la aplicación.
var config = require('../../conf');


module.exports = new FacebookStrategy({
  clientID      : config.facebook.key,
  clientSecret  : config.facebook.secret,
  callbackURL   : '/auth/facebook/callback',
  profileFields : ['id', 'displayName', /*'provider',*/ 'photos']
}, function(accessToken, refreshToken, profile, done) {
  // El campo 'profileFields' nos permite que los campos que almacenamos
  // se llamen igual tanto para si el usuario se autentica por Twitter o
  // por Facebook, ya que cada proveedor entrega los datos en el JSON con
  // un nombre diferente.
  // Passport esto lo sabe y nos lo pone más sencillo con ese campo
  User.findOne({provider_id: profile.id}, function(err, user) {
    if(err) throw(err);
    if(!err && user !== null) return done(null, user);

    // Al igual que antes, si el usuario ya existe lo devuelve
    // y si no, lo crea y salva en la base de datos
    user = new User({
      provider_id  : profile.id,
      provider     : profile.provider,
      name         : profile.displayName,
      photo        : profile.photos[0].value
    });
    user.save(function(err) {
      if(err) throw err;
      done(null, user);
    });
  });
});
