var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var models = require('./models.js').models;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});


var test = new models.Username({
	username: "sebastianfelipesing"
});

/*
test.save(function(err) {
	if (err)
	{
		console.log(err);
	}
});
*/
//console.log(test.errors);

var show = function (err, usernames) {
	if (err) return mongoose.handleError(err);
	console.log(usernames);
}

var remove = function (err, usernames) {
	if (err) return mongoose.handleError(err);
}

//models.Username.remove().exec();
models.Username.find({username: "sebastianfelipesing"}, show);
