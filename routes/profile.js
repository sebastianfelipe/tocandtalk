var router = require('express').Router();
var async = require('async');

var db = require('../database/configuration.js');

var schema = require('../database/schema.js');
var models = require('../database/models.js');

// Module Imports
var authenticate_module = require('../modules/authenticate.js');
var authenticate = authenticate_module.authenticate;

// Shared Variables
var error_adapter = function(model_name, err) {
  error_list = [];
  if (err) {
    var errors = err.errors;
    for (var key in errors) {
      var pieces = [key, errors[key].kind]
      error = 'error_' + model_name.toLowerCase();
      for (var piece in pieces) {
        error += '_' + pieces[piece].replace(' ','').replace('userdefined', errors[key].message);
      }
      error_list.push(error);
    }
  }
  error_list.push('');
  return error_list.join(';');
}

router.get('/', authenticate, function (req, res) {
  async.parallel({
      languages: function(callback){
          setTimeout(function(){
              models.Language.find().sort([['name', 1]]).exec(function (err, docs) {
                callback(err, docs);
              })
          }, 200);
      },
      countries: function(callback){
          setTimeout(function(){
              models.Country.find().sort([['name', 1]]).exec(function (err, docs) {
                callback(err, docs);
              })
          }, 200);
      },
      user: function(callback) {
          setTimeout(function(){
              models.User.findOne({_username: req.session.username}, {password: 0}).exec(function (err, doc) {
                callback(err, doc);
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
  console.log(req.body);

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
    error_list = [];
    for (var key in results) {
      if (!results[key].errors)
      {
        error_list.push(results[key].errors);
      }
    }
    errors += error_list.join('');
    console.log(err);
    console.log(results.user);
    res.redirect('/profile');
    //return res.render('profile/index.html', {forceType: "desktop", user: results.user.doc, languages: results.languages.docs, countries: results.countries.docs, req: req.body, errors: errors});
  });
});

router.post('/edit_user_description',function (req, res) {
  var errors = "";
  console.log(req.body);

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
    error_list = [];
    for (var key in results) {
      if (!results[key].errors)
      {
        error_list.push(results[key].errors);
      }
    }
    errors += error_list.join('');
    console.log(err);
    console.log(results.user);
    res.redirect('/profile');
    //return res.render('profile/index.html', {forceType: "desktop", user: results.user.doc, languages: results.languages.docs, countries: results.countries.docs, req: req.body, errors: errors});
  });
});

router.post('/add_user_interest_language',function (req, res) {
  var errors = "";
  console.log(req.body);

  async.parallel({
      user: function(callback) {
          setTimeout(function(){
              models.User.findOne({_username: req.session.username}, {password: 0}).exec(function (err, doc) {
                if (doc)
                {
                  doc.interest_languages.push(req.body.s_interest_languages);
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
    error_list = [];
    for (var key in results) {
      if (!results[key].errors)
      {
        error_list.push(results[key].errors);
      }
    }
    errors += error_list.join('');
    console.log(err);
    console.log(results.user);
    return res.redirect('/profile');
    //return res.render('profile/index.html', {forceType: "desktop", user: results.user.doc, languages: results.languages.docs, countries: results.countries.docs, req: req.body, errors: errors});
  });
});

router.post('/add_user_spoken_language',function (req, res) {
  var errors = "";
  console.log(req.body);

  async.parallel({
      user: function(callback) {
          setTimeout(function(){
              models.User.findOne({_username: req.session.username}, {password: 0}).exec(function (err, doc) {
                if (doc)
                {
                  doc.spoken_languages.push(req.body.s_spoken_languages);
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
    error_list = [];
    for (var key in results) {
      if (!results[key].errors)
      {
        error_list.push(results[key].errors);
      }
    }
    errors += error_list.join('');
    console.log(err);
    console.log(results.user);
    return res.redirect('/profile');
    //return res.render('profile/index.html', {forceType: "desktop", user: results.user.doc, languages: results.languages.docs, countries: results.countries.docs, req: req.body, errors: errors});
  });
});

router.post('/profile/remove_spoken_language',function (req, res) {
  var errors = "";
  console.log(req.body);

/*
  async.parallel({
      user: function(callback) {
          setTimeout(function(){
              models.User.findOne({_username: req.session.username}, {password: 0}).exec(function (err, doc) {
                if (doc)
                {
                  doc.spoken_languages.push(req.body.s_spoken_languages);
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
    error_list = [];
    for (var key in results) {
      if (!results[key].errors)
      {
        error_list.push(results[key].errors);
      }
    }
    errors += error_list.join('');
    console.log(err);
    console.log(results.user);
    return res.redirect('/profile');
    //return res.render('profile/index.html', {forceType: "desktop", user: results.user.doc, languages: results.languages.docs, countries: results.countries.docs, req: req.body, errors: errors});
  });
*/
});
module.exports = router;