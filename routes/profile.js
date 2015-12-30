var router = require('express').Router();
var async = require('async');

var db = require('../database/configuration.js');

var schema = require('../database/schema.js');
var models = require('../database/models.js');

// Module Imports
var authenticate_module = require('../modules/authenticate.js');
var functions_module = require('../modules/functions.js');

// Functions
var authenticate = authenticate_module.authenticate;
var error_adapter = functions_module.error_adapter;

// Shared Variables

router.get('/', authenticate, function (req, res) {
  async.parallel({
      languages: function(callback){
          setTimeout(function(){
              models.Language.find().sort([['name', 1]]).exec(function (err, docs) {
                callback(null, docs);
              })
          }, 200);
      },
      countries: function(callback){
          setTimeout(function(){
              models.Country.find().sort([['name', 1]]).exec(function (err, docs) {
                callback(null, docs);
              })
          }, 200);
      },
      user: function(callback) {
          setTimeout(function(){
              models.User.findOne({_username: req.session.username}, {password: 0}).exec(function (err, doc) {
                callback(null, doc);
              })
          }, 200);
      }
  },
  function(err, results) {
  	 return res.render('profile/index.html', {forceType: "desktop", user: results.user, languages: results.languages, countries: results.countries, req: req.body, errors: ""});
  });
});

router.post('/edit_user_nationality',function (req, res) {
  var errors = "";
  console.log('dentro de');
  async.parallel({
      user: function(callback) {
          setTimeout(function(){
              models.User.findOne({_username: req.session.username}, {password: 0}).exec(function (err, doc) {
                if (doc)
                {
                  doc.nationality = req.body.s_country;
                  doc.save(function (err) {
                    var errors_tmp = error_adapter(models.Username.modelName, err);
                    callback(null, {doc: doc, errors: errors_tmp});
                  });
                }
              })
          }, 200);
      }
  },
  function(err, results) {
    // error handling
    /*
    error_list = [];
    for (var key in results) {
      if (!results[key].errors)
      {
        error_list.push(results[key].errors);
      }
    }
    errors += error_list.join('');
    */
    //errors = results.user.errors;
    console.log(results);
    console.log(results.user.doc);
    console.log(results.user.errors);
    return res.send({user: results.user.doc, req: req.body, errors: errors});
    //return res.render('profile/index.html', {forceType: "desktop", user: results.user.doc, languages: results.languages.docs, countries: results.countries.docs, req: req.body, errors: errors});
  });
});

router.post('/edit_user_description',function (req, res) {
  var errors = "";

  async.parallel({
      user: function(callback) {
          setTimeout(function(){
              models.User.findOne({_username: req.session.username}, {password: 0}).exec(function (err, doc) {
                if (doc)
                {
                  doc.description = req.body.input_edit_desc;
                  doc.save(function (err) {
                    var errors_tmp = error_adapter(models.Username.modelName, err);
                    callback(null, {doc: doc, errors: errors_tmp});
                  });
                }
              })
          }, 200);
      }
  },
  function(err, results) {
    // error handling
    console.log('edit_user_description');
    return res.send({user: results.user.doc, req: req.body, errors: errors});
    //return res.render('profile/index.html', {forceType: "desktop", user: results.user.doc, languages: results.languages.docs, countries: results.countries.docs, req: req.body, errors: errors});
  });
});

router.post('/add_user_interest_language',function (req, res) {
  var errors = "";
  add_interest_language = req.body.s_interest_languages;

  async.parallel({
      user: function(callback) {
          setTimeout(function(){
              models.User.findOne({_username: req.session.username}, {password: 0}).exec(function (err, doc) {
                if (doc)
                {
                  add_interest_language_id = doc.interest_languages.indexOf(add_interest_language);
                  if (add_interest_language_id < 0)
                  {
                    doc.interest_languages.push(add_interest_language);
                  }
                  doc.save(function (err) {
                    var errors_tmp = error_adapter(models.Username.modelName, err);
                    callback(null, {doc: doc, errors: errors_tmp});
                  });
                }
              })
          }, 200);
      }
  },
  function(err, results) {
    // error handling
    console.log('add_user_interest_language');
    return res.send({user: results.user.doc, req: req.body, errors: errors});
    //return res.render('profile/index.html', {forceType: "desktop", user: results.user.doc, languages: results.languages.docs, countries: results.countries.docs, req: req.body, errors: errors});
  });
});

router.post('/add_user_spoken_language',function (req, res) {
  var errors = "";
  add_spoken_language = req.body.s_spoken_languages;
  async.parallel({
      user: function(callback) {
          setTimeout(function(){
              models.User.findOne({_username: req.session.username}, {password: 0}).exec(function (err, doc) {
                if (doc)
                {
                  add_spoken_language_id = doc.spoken_languages.indexOf(add_spoken_language);
                  if ((add_spoken_language_id < 0) && (add_spoken_language != doc.native_language))
                  {
                    doc.spoken_languages.push(add_spoken_language);
                  }
                  doc.save(function (err) {
                    var errors_tmp = error_adapter(models.Username.modelName, err);
                    callback(null, {doc: doc, errors: errors_tmp});
                  });
                }
              })
          }, 200);
      }
  },
  function(err, results) {
    // error handling
    console.log('add_user_spoken_language');
    return res.send({user: results.user.doc, req: req.body, errors: errors});
    //return res.render('profile/index.html', {forceType: "desktop", user: results.user.doc, languages: results.languages.docs, countries: results.countries.docs, req: req.body, errors: errors});
  });
});

router.post('/remove_interest_language',function (req, res) {
  var errors = "";
  remove_interest_language = req.body.remove_interest_language;
  async.parallel({
      user: function(callback) {
          setTimeout(function(){
              models.User.findOne({_username: req.session.username}, {password: 0}).exec(function (err, doc) {
                if (doc)
                {
                  remove_interest_language_id = doc.interest_languages.indexOf(remove_interest_language);
                  if (remove_interest_language_id > -1)
                  {
                    doc.interest_languages.splice(remove_interest_language_id, 1); 
                  }
                  doc.save(function (err) {
                    var errors_tmp = error_adapter(models.Username.modelName, err);
                    callback(null, {doc: doc, errors: errors_tmp});
                  });
                }
              })
          }, 200);
      }
  },
  function(err, results) {
    // error handling
    console.log(results);
    console.log(results.user.doc);
    console.log(results.user.errors);
    return res.send({user: results.user.doc, req: req.body, errors: errors});
    //return res.render('profile/index.html', {forceType: "desktop", user: results.user.doc, languages: results.languages.docs, countries: results.countries.docs, req: req.body, errors: errors});
  });

});

router.post('/remove_spoken_language',function (req, res) {
  var errors = "";
  remove_spoken_language = req.body.remove_spoken_language;
  async.parallel({
      user: function(callback) {
          setTimeout(function(){
              models.User.findOne({_username: req.session.username}, {password: 0}).exec(function (err, doc) {
                if (doc)
                {
                  remove_spoken_language_id = doc.spoken_languages.indexOf(remove_spoken_language);
                  if (remove_spoken_language_id > -1)
                  {
                    doc.spoken_languages.splice(remove_spoken_language_id, 1); 
                  }
                  doc.save(function (err) {
                    var errors_tmp = error_adapter(models.Username.modelName, err);
                    callback(null, {doc: doc, errors: errors_tmp});
                  });
                }
              })
          }, 200);
      }
  },
  function(err, results) {
    // error handling
    console.log(results);
    console.log(results.user.doc);
    console.log(results.user.errors);
    return res.send({user: results.user.doc, req: req.body, errors: errors});
    //return res.render('profile/index.html', {forceType: "desktop", user: results.user.doc, languages: results.languages.docs, countries: results.countries.docs, req: req.body, errors: errors});
  });

});
module.exports = router;