var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {autoReconnect: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  console.log('The connection with MongoDB was opened');
});

module.exports = db;