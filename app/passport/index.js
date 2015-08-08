var mongoose = require('mongoose');
var facebookStrategy  = require('./facebook');
var twitterStrategy   = require('./twitter');
// Exportamos como módulo las funciones de passport, de manera que
// podamos utilizarlas en otras partes de la aplicación.
// De esta manera, mantenemos el código separado en varios archivos
// logrando que sea más manejable.
module.exports = function(passport) {

  // Serializa al usuario para almacenarlo en la sesión
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  // Deserializa el objeto usuario almacenado en la sesión para
  // poder utilizarlo
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  // Configuración del autenticado con Twitter
  passport.use(facebookStrategy);

  // Configuración del autenticado con Facebook
  passport.use(twitterStrategy);

};
