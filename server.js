var ip = require('ip');
var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http');
var https = require('https');
var io = require('socket.io');
var ExpressPeerServer = require('peer').ExpressPeerServer;

// Module Imports
var search_module = require('./modules/search.js');
var global_module = require('./modules/global.js');
var callbacks_module = require('./modules/callbacks.js');

// Middleware Configuration
var passport = require('passport');
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
//app.use(express.static(path.join(__dirname, 'node_modules')));
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
home_routes = require('./routes/home.js');
talk_routes = require('./routes/talk.js');
login_routes = require('./routes/login.js');
register_routes = require('./routes/register.js');
logout_routes = require('./routes/logout.js');
friends_routes = require('./routes/friends.js');
profile_routes = require('./routes/profile.js');
settings_routes = require('./routes/settings.js');
//auth_routes = require('./routes/auth.js');

app.use(passport.initialize());
app.use(passport.session());
get_routes = require('./database/api/get.js');
save_routes = require('./database/api/save.js');
auth_routes = require('./database/api/auth.js');
update_routes = require('./database/api/update.js');
verify_routes = require('./database/api/verify.js');
delete_routes = require('./database/api/delete.js');
//delete_routes = require('./delete.js');

app.use('/', home_routes);
app.use('/talk', talk_routes);
app.use('/login', login_routes);
app.use('/register', register_routes);
app.use('/logout', logout_routes);
app.use('/friends', friends_routes);
app.use('/profile', profile_routes);
app.use('/settings', settings_routes);
//app.use('/auth', auth_routes);

app.use('/api/get', get_routes);
app.use('/api/save', save_routes);
app.use('/api/auth', auth_routes);
app.use('/api/update', update_routes);
app.use('/api/verify', verify_routes);
app.use('/api/delete', delete_routes);

// Extern Uses
//var api = require('./database/api/api.js');

// -----------------------------------
// Only for development use
var queries = require('./database/queries.js');
app.use('/test', queries);
//app.get('/test', func)
// End of development use
// ------------------------------------

// Function Imports
//var randomSearch = search_module.randomSearch;

// Callbacks Imports
var _peerConnection = callbacks_module._peerConnection;
var _peerDisconnect = callbacks_module._peerDisconnect;
var _ioConnection = callbacks_module._ioConnection;

// Shared Variables Imports
var users = global_module.users;
var availables = global_module.availables;
var limit = global_module.limit;
var port1 = global_module.port1;
var port2 = global_module.port2;
var port3 = global_module.port3;
var port4 = global_module.port4;
var ports = global_module.ports;

// Server Configuration
/*
var credentials = {
                  key: privateKey,
                  cert: certificate,
                  requestCert: false,
                  rejectUnauthorized: false
                  };
*/

/*
var credentials = {
                  key: privateKey,
                  cert: certificate
                  };
*/
// Servers
var servers = {'http': {
                        'web':               http.createServer(app),
                        'io':                new io(),
                        'peer':              http.createServer(app)
                     },
              'https': {
                        'web':        null,//https.createServer(credentials, app),
                        'io':         new io(),
                        'peer':       null
                      }
              };

// HTTP Servers

servers.http.web.listen(ports.http.web, function(){
    console.log('HTTP: WebServer running on ' +
                ip.address() + ':' + ports.http.web);
});


servers.http.io.listen(servers.http.web)
servers.http.io.on('connection',_ioConnection);

servers.http.peer = ExpressPeerServer(servers.http.web, {debug: true});
app.use('/', servers.http.peer);
servers.http.peer.on('connection', _peerConnection);
servers.http.peer.on('disconnect', _peerDisconnect);
