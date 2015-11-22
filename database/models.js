var mongoose = require('mongoose');

// Schema Import
var schema = require('./schema.js').schema;

var models = {};
models.Username = mongoose.model('Username', schema.username);
models.Email = mongoose.model('Email', schema.email);
models.Nationality = mongoose.model('Nationality', schema.nationality);
models.Sex = mongoose.model('Sex', schema.sex);
models.Language = mongoose.model('Language', schema.language);

module.exports.models = models;

