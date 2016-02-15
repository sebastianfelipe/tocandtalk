
var mongoose = require('mongoose');
var router = require('express').Router();
var async = require('async');
var db = require('./configuration.js');
var schema = require('./schema.js');
var models = require('./models.js');



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
	errorList = [];
	if (err) {
		var errors = err.errors;
		for (var key in errors) {
			var pieces = [key, errors[key].kind]
			error = 'error_' + model_name.toLowerCase();
			for (var piece in pieces) {
				error += '_' + pieces[piece].replace(' ','').replace('userdefined', errors[key].message);
			}
			errorList.push(error);
		}
	}
	errorList.push('');
	return errorList.join(';');
}

/*
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
*/

/*
router.get('/validate/:username/:email', allowCrossDomain, function(req, res) {
	var user = new User({ username: req.params.username, email: req.params.email});
	user.validate(function (err) {
		errors = error_adapter(User.modelName, err);
		res.json({errors: errors});
	})
});
*/

var trySync = function(name) {
	var username = new models.Username({ username: name});
	username.validate(function (err) {
		errors = error_adapter(models.Username.modelName, err);
		return errors;
	});
};


router.get('/push', function(req, res) {
	var country = require('./data/country.json');
	var language = require('./data/language.json');
	models.Country.collection.insert(country, function(err, docs) {
		console.log(err);
		console.log(docs);
	});
	models.Language.collection.insert(language, function(err, docs) {
		console.log(err);
		console.log(docs);
	});
	return res.send('Countries and languages added');
});

router.get('/uval/:username', allowCrossDomain, function(req, res) {
	console.log(req.params.username);
	var username = new models.Username({ username: req.params.username});
	username.validate(function (err) {
		errors = error_adapter(models.Username.modelName, err);
		console.log(errors);
		res.json({errors: errors});
	})
});


router.get('/list', function(req, res) {
	var json = {data: [1,2,3,4,5,6]}
	res.json(json);

});
/*
router.get('/save/:username/:email', function(req, res) {
	var user = new User({ username: req.params.username, email: req.params.email});
	user.save(function (err) {
		errors = error_adapter(User.modelName, err);
		res.json({errors: errors});
	})
});
*/

router.get('/show/:model', function(req, res) {
	if (req.params.model == "usernames") {
		models.Username.find({}, function(err, elements) {
			res.json(elements);
		});
	}
	else if (req.params.model == "emails") {
		models.Email.find({}, function(err, elements) {
			res.json(elements);
		});
	}
	else if (req.params.model == "users") {
		models.User.find({}, function(err, elements) {
			res.json(elements);
		});
	}
	else
	{
		res.json({});
	}
});

router.get('/remove/:model', function(req, res) {
	if (req.params.model == "usernames") {
		models.Username.remove().exec();
	}
	else if (req.params.model == "emails") {
		models.Email.remove().exec();
	}
	else if (req.params.model == "users") {
		models.User.remove().exec();
	}
	else if (req.params.model == "countries") {
		models.Country.remove().exec();
	}
	else if (req.params.model == "languages") {
		models.Language.remove().exec();
	}
	res.send('removed');
});

router.get('/valorate/:username/:value', function (req, res) {
	var username = req.params.username;
	var value = Number(req.params.value);
	var errors = "";
	async.parallel({
	  user: function(callback) {
	      setTimeout(function(){
	          models.User.findOne({_username: username}, {password: 0}).exec(function (err, doc) {
	            if (doc)
	            {
	              if (doc.sum_valoration == null)
	              {
	              	doc.sum_valoration == 0;
	              }
	     	       if (doc.cant_valoration == null)
	              {
	              	doc.cant_valoration == 0;
	              }
	              doc.sum_valoration += value;
	              doc.cant_valoration += 1;
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
		console.log('valorate');
		return res.send({user: results.user.doc, req: req.body, errors: errors});
	});
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
