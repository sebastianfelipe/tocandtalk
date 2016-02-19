// config/passport.js

// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
// load up the user model
var models = require('../database/models.js');
var User = models.User;

var TwitterStrategy = require('passport-twitter').Strategy;
// Estrategia de autenticación con Facebook
var FacebookStrategy = require('passport-facebook').Strategy;

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// Fichero de configuración donde se encuentran las API keys
// Este archivo no debe subirse a GitHub ya que contiene datos
// que pueden comprometer la seguridad de la aplicación.
var config = require('./config.js');

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
    passport.use('twitter', new TwitterStrategy({
        consumerKey      : config.twitter.key,
        consumerSecret  : config.twitter.secret,
        callbackURL      : '/auth/twitter/callback'
    }, function(accessToken, refreshToken, profile, done) {
        // Busca en la base de datos si el usuario ya se autenticó en otro
        // momento y ya está almacenado en ella
        User.findOne({twitter_id: profile.id}, function(err, user) {
            if(err) throw(err);
            // Si existe en la Base de Datos, lo devuelve
            if(!err && user!= null) return done(null, user);

            // Si no existe crea un nuevo objecto usuario
            var user = new User({
                provider_id : profile.id,
               // provider         : profile.provider,
                name                 : profile.displayName,
                //photo               : profile.photos[0].value
            });
            //...y lo almacena en la base de datos
            user.save(function(err) {
                if(err) throw err;
                done(null, user);
            });
        });
    }));

    // Configuración del autenticado con Facebook
    passport.use('facebook', new FacebookStrategy({
        clientID            : config.facebook.key,
        clientSecret    : config.facebook.secret,
        callbackURL  : '/auth/facebook/callback',
        profileFields : ['id', 'displayName', /*'provider','photos'*/]
    }, function(accessToken, refreshToken, profile, done) {
        // El campo 'profileFields' nos permite que los campos que almacenamos
        // se llamen igual tanto para si el usuario se autentica por Twitter o
        // por Facebook, ya que cada proveedor entrega los datos en el JSON con
        // un nombre diferente.
        // Passport esto lo sabe y nos lo pone más sencillo con ese campo
        User.findOne({facebook_id: profile.id}, function(err, user) {
            if(err) throw(err);
            if(!err && user!= null) return done(null, user);

            // Al igual que antes, si el usuario ya existe lo devuelve
            // y si no, lo crea y salva en la base de datos
            var user = new User({
                facebook_id : profile.id,
                //provider         : profile.provider,
                name                 : profile.displayName,
                //photo               : profile.photos[0].value
            });
            user.save(function(err) {
                if(err) throw err;
                done(null, user);
            });
        });
    }));
    // Configuración del autenticado con Google
    passport.use('google', new GoogleStrategy({
        clientID      : config.google.key,
        clientSecret  : config.google.secret,
        callbackURL      : '/auth/google/callback'
    }, function(accessToken, refreshToken, profile, done) {
        // Busca en la base de datos si el usuario ya se autenticó en otro
        // momento y ya está almacenado en ella
        User.findOne({'google.id': profile.id}, function(err, user) {
            if(err) throw(err);
            // Si existe en la Base de Datos, lo devuelve
            if(!err && user!= null) return done(null, user);

            // Si no existe crea un nuevo objecto usuario
            var user = new User({
                provider_id : profile.id,
               // provider         : profile.provider,
                name: profile.displayName,
                //photo               : profile.photos[0].value
            });
            //...y lo almacena en la base de datos
            user.save(function(err) {
                if(err) throw err;
                done(null, user);
            });
        });
    }));

};