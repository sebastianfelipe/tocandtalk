var ip = require('ip');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Middleware Configuration
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var device = require('express-device');
var session = require('cookie-session');

// App Configuration
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));

// Middleware Uses
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'modules')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'secretalk',
  resave: true,
  saveUninitialized: true,
  key: 'session',
  cookie: { secure: true },
}));
app.use(device.capture());
device.enableViewRouting(app, {
  "noPartials": true
});

// Routes
index_routes = require('./routes/index.js');
login_routes = require('./routes/login.js');
register_routes = require('./routes/register.js');
logout_routes = require('./routes/logout.js');

app.use('/', index_routes);
app.use('/login', login_routes);
app.use('/register', register_routes);
app.use('/logout', logout_routes);

// Module Imports
var search_module = require('./modules/search.js');
var global_module = require('./modules/global.js');
var callbacks_module = require('./modules/callbacks.js');

// Function Imports
//var randomSearch = search_module.randomSearch;

// Callbacks Imports
var peerConnection = callbacks_module.peerConnection;
var peerDisconnect = callbacks_module.peerDisconnect;
var ioConnection = callbacks_module.ioConnection;

// Shared Variables Imports
var users = global_module.users;
var availables = global_module.availables;
var limit = global_module.limit;
var port1 = global_module.port1;
var port2 = global_module.port2;


// Server Configuration
var peerServer = new require('peer').PeerServer({key: '6sdshp5kg3edbo6r', port: port2})


peerServer.on('connection', peerConnection);

peerServer.on('disconnect', peerDisconnect);

io.on('connection',ioConnection);

http.listen(port1, function(){
console.log('http server running on ' +
            ip.address() + ':' + port1);
});

console.log('peer server running on ' +
            ip.address() + ':' + port2);