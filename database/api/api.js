var express = require('express');
var app = express();

// Routes
get_routes = require('./get.js');
//save_routes = require('./save.js');
//update_routes = require('./update.js');
//delete_routes = require('./delete.js');

app.use('/api/get', get_routes);
//app.use('/api/save', save_routes);
//app.use('/api/update', update_routes);
//app.use('/api/delete', delete_routes);

module.exports = {};
