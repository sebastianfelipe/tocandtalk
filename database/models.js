var mongoose = require('mongoose');

// Schema Import
var schema = require('./schema.js');

var models = {};
models.Username = mongoose.model('Username', schema.username);
models.Email = mongoose.model('Email', schema.email);
models.Password = mongoose.model('Password', schema.password);
models.Country = mongoose.model('Country', schema.country);
models.Language = mongoose.model('Language', schema.language);
models.User = mongoose.model('User', schema.user);

models.Messenger = mongoose.model('Messenger', schema.messenger);
models.Conversation = mongoose.model('Conversation', schema.conversation);
models.Message = mongoose.model('Message', schema.message);
models.Appraisement = mongoose.model('Appraisement', schema.appraisement);
models.Appreciation = mongoose.model('Appreciation', schema.appreciation);

models.tUser = mongoose.model('tUser', schema.tUser);

module.exports = models;

