var mongoose = require('mongoose');
var assert = require('assert');
var uniqueValidator = require('mongoose-unique-validator');
var validate = require('mongoose-validate');
var router = require('express').Router();

mongoose.connect('mongodb://localhost/test');

var models = require('./models.js').models;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!

});
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

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

// Define your schema as normal. 
var userSchema = mongoose.Schema({
    username: {
    	type: String,
    	required: true,
    	unique: true,
    	lowercase: true,
    	trim: true
    },
    email: {
    	type: String,
    	required: true,
    	unique: true,
    	lowercase: true,
    	trim: true,
    	validate: [validate.email, 'format']
    }
});
 

// Apply the uniqueValidator plugin to userSchema. 
userSchema.plugin(uniqueValidator, { message: 'unique' });

var User = mongoose.model('User', userSchema)

router.get('/validate/:username/:email', allowCrossDomain, function(req, res) {
	var user = new User({ username: req.params.username, email: req.params.email});
	user.validate(function (err) {
		errors = error_adapter(User.modelName, err);
		res.json({errors: errors});
	})
});

router.get('/save/:username/:email', function(req, res) {
	var user = new User({ username: req.params.username, email: req.params.email});
	user.save(function (err) {
		errors = error_adapter(User.modelName, err);
		res.json({errors: errors});
	})
});

router.get('/show', function(req, res) {
	User.find({}, function(err, elements) {
		res.send(elements);
	});
});

router.get('/remove', function(req, res) {
	User.remove().exec();
	res.send('removed');
});

module.exports = router;

/*
var save = function (model_name, res) {
	//console.log(object);
	this.save(function (err) {
		errors = error_adapter(model_name, err);
		console.log(errors);
		res.send({errors: errors});
	});
};

userSchema.methods.saveMod = save;
*/