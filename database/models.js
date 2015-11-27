var mongoose = require('mongoose');

// Schema Import
var schema = require('./schema.js');

var models = {};
models.Username = mongoose.model('Username', schema.username);
models.Email = mongoose.model('Email', schema.email);
models.Country = mongoose.model('Country', schema.country);
models.Sex = mongoose.model('Sex', schema.sex);
models.Language = mongoose.model('Language', schema.language);
models.User = mongoose.model('User', schema.user);

module.exports = models;

