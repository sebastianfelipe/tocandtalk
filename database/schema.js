// getting-started.js
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// Types
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = {};

schema.username = mongoose.Schema({
	username: {
		type: String,
		required: true,
		maxlength: 5,
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
		maxlength: 3
	},
	code: {
		type: String,
		required: true,
		unique: true
	}
});

schema.sex = mongoose.Schema({
	sex: [String]
});

schema.language = mongoose.Schema({
	username: ObjectId,
	email: ObjectId,
	nationality: ObjectId,
	native_language: ObjectId,
	spoken_languages: [ObjectId],
	interest_languages: [ObjectId],
	first_name: String,
	last_name: String,
	password: String,
	sex: ObjectId,
	description: String
});

schema.username.plugin(uniqueValidator);
schema.email.plugin(uniqueValidator);
schema.country.plugin(uniqueValidator);
schema.sex.plugin(uniqueValidator);
schema.language.plugin(uniqueValidator);

module.exports.schema = schema;