// getting-started.js
var mongoose = require('mongoose');

// Types
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = {};

schema.username = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	}
});

schema.email = mongoose.Schema({
	email: String
});


schema.nationality = mongoose.Schema({

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

module.exports.schema = schema;