var ip = require('ip');
var express = require('express');
var app = express();
//var http = require('http').Server(app);
var http = require('http').createServer();
//var io = require('socket.io')(http);

//var server = require('http').createServer()
var url = require('url')
var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({ server: http })
var io = require('socket.io')(wss);
//var express = require('express')
//var app = express()


// Module Imports
var search_module = require('./modules/search.js');
var global_module = require('./modules/global.js');
var callbacks_module = require('./modules/callbacks.js');

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

app.use('/', home_routes);
app.use('/talk', talk_routes);
app.use('/login', login_routes);
app.use('/register', register_routes);
app.use('/logout', logout_routes);
app.use('/friends', friends_routes);
app.use('/profile', profile_routes);

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

// Server Configuration
var peerServer = new require('peer').PeerServer({key: '6sdshp5kg3edbo6r', port: port2})

wss.on('connection', function connection(ws) {
  var location = url.parse(ws.upgradeReq.url, true);
  // you might use location.query.access_token to authenticate or share sessions 
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312) 
  
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
 
  ws.send('something');
});

peerServer.on('connection', _peerConnection);
peerServer.on('disconnect', _peerDisconnect);
io.on('connection',_ioConnection);

http.on('request', app)
http.listen(port1, function(){
console.log('http server running on ' +
            ip.address() + ':' + port1);
});

console.log('peer server running on ' +
            ip.address() + ':' + port2);





