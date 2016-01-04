// getting-started.js
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var validate = require('mongoose-validate');

// Types
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = {};

schema.username = mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 5,
		unique: true
	}
});

schema.email = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	}
});


schema.country = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true
	},
	code: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true
	}
});

schema.sex = mongoose.Schema({
	sex: [String]
});

schema.language = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true
	},
	code: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true
	}
});

schema.user = mongoose.Schema({
	_username: {
		type: String
	},
	_email: {
		type: String
	},
	nationality: String,
	native_language: String,
	spoken_languages: [String],
	interest_languages: [String],
	first_name: String,
	last_name: String,
	password: String,
	sex: String,
	description: String,
	cant_valoration: Number,
	sum_valoration: Number
});

schema.username.plugin(uniqueValidator, {message: 'unique'});
schema.email.plugin(uniqueValidator, {message: 'unique'});
schema.country.plugin(uniqueValidator, {message: 'unique'});
schema.sex.plugin(uniqueValidator, {message: 'unique'});
schema.language.plugin(uniqueValidator, {message: 'unique'});
schema.user.plugin(uniqueValidator, {message: 'unique'});


module.exports = schema;